#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import sqlite3
import unicodedata
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
DB_PATH = BASE_DIR / 'api' / 'django_rest_api' / 'db.sqlite3'
OUTPUT_DIR = BASE_DIR / 'frontend' / 'src' / 'data'


def slugify(value: str) -> str:
    value = unicodedata.normalize('NFKD', value)
    value = value.encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^a-zA-Z0-9]+', '-', value).strip('-').lower()
    return value


def prefix_media(path: str | None) -> str | None:
    if not path:
        return None
    if path.startswith('http://') or path.startswith('https://') or path.startswith('/'):
        return path
    return f"/media/{path}"


def fetch_all(conn: sqlite3.Connection, query: str, params: tuple = ()) -> list[dict]:
    conn.row_factory = sqlite3.Row
    return [dict(row) for row in conn.execute(query, params)]


def fetch_table(conn: sqlite3.Connection, table: str) -> list[dict]:
    conn.row_factory = sqlite3.Row
    try:
        return [dict(row) for row in conn.execute(f'SELECT * FROM "{table}"')]
    except sqlite3.Error:
        return []


def main() -> None:
    if not DB_PATH.exists():
        raise SystemExit(f"Database not found: {DB_PATH}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with sqlite3.connect(DB_PATH) as conn:
        posts = fetch_all(
            conn,
            """
            SELECT id, slug, title_pt_br, title_en_us, excerpt_pt_br, excerpt_en_us,
                   content_pt_br, content_en_us, type
            FROM posts_post
            ORDER BY id
            """,
        )

        experiences = fetch_all(
            conn,
            """
            SELECT id, title_pt_br, title_en_us, organization, place,
                   description_pt_br, description_en_us,
                   key_achievement_pt_br, key_achievement_en_us,
                   since, until, relevance_id
            FROM curriculum_experience
            ORDER BY id
            """,
        )

        courses = fetch_all(
            conn,
            """
            SELECT id, name_pt_br, name_en_us, place_pt_br, place_en_us,
                   description_pt_br, description_en_us, since, until, relevance_id
            FROM curriculum_course
            ORDER BY id
            """,
        )

        certificates = fetch_all(
            conn,
            """
            SELECT id, title_pt_br, title_en_us, date, file, course_id, relevance_id
            FROM curriculum_certificate
            ORDER BY id
            """,
        )

        skills = fetch_all(
            conn,
            """
            SELECT id, name_pt_br, name_en_us, description_pt_br, description_en_us,
                   level, icon, category_id, parent_id, relevance_id
            FROM curriculum_skill
            ORDER BY id
            """,
        )

        categories = fetch_all(
            conn,
            """
            SELECT id, name_pt_br, name_en_us
            FROM curriculum_category
            ORDER BY id
            """,
        )

        relevance = fetch_all(
            conn,
            """
            SELECT id, value, description_pt_br, "order"
            FROM curriculum_relevance
            ORDER BY "order"
            """,
        )

        tags = fetch_all(
            conn,
            """
            SELECT id, name, description_pt_br, description_en_us, color_hex, parent_id
            FROM core_tag
            ORDER BY id
            """,
        )

        portfolio_items = fetch_all(
            conn,
            """
            SELECT id, title, description_pt_br, description_en_us, date
            FROM portfolio_item
            ORDER BY id
            """,
        )

        portfolio_item_tags = fetch_all(
            conn,
            """
            SELECT item_id, tag_id
            FROM portfolio_item_tags
            ORDER BY item_id
            """,
        )

        portfolio_item_posts = fetch_all(
            conn,
            """
            SELECT item_id, post_id
            FROM portfolio_item_posts
            ORDER BY item_id
            """,
        )

        # Raw data for every table
        tables = fetch_all(conn, "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
        raw_tables = {row['name']: fetch_table(conn, row['name']) for row in tables}

    categories_map = {category['id']: category for category in categories}

    for skill in skills:
        skill['icon'] = prefix_media(skill.get('icon'))
        category = categories_map.get(skill.get('category_id'))
        skill['category'] = category
        skill['parent'] = skill.get('parent_id')

    for certificate in certificates:
        certificate['file'] = prefix_media(certificate.get('file'))

    tags_map = {tag['id']: tag for tag in tags}
    tags_by_item: dict[int, list[str]] = {}
    for row in portfolio_item_tags:
        tag = tags_map.get(row['tag_id'])
        if not tag:
            continue
        tags_by_item.setdefault(row['item_id'], []).append(tag['name'])

    posts_map = {post['id']: post for post in posts}
    posts_by_item: dict[int, list[dict]] = {}
    for row in portfolio_item_posts:
        post = posts_map.get(row['post_id'])
        if not post:
            continue
        posts_by_item.setdefault(row['item_id'], []).append(post)

    portfolio = []
    used_slugs: set[str] = set()
    for item in portfolio_items:
        title = item.get('title') or f"Item {item['id']}"
        raw_slug = slugify(title) or f"item-{item['id']}"
        slug = raw_slug
        if slug in used_slugs:
            slug = f"{raw_slug}-{item['id']}"
        used_slugs.add(slug)

        tag_list = tags_by_item.get(item['id'], [])
        categories_list = []
        for tag_name in tag_list:
            tag = next((t for t in tags if t['name'] == tag_name), None)
            if tag and tag.get('parent_id'):
                parent = tags_map.get(tag['parent_id'])
                if parent:
                    categories_list.append(parent['name'])
        if not categories_list and tag_list:
            categories_list = [tag_list[0]]

        items = []
        cover_added = False
        for post in posts_by_item.get(item['id'], []):
            if post.get('type') not in ('IMG', 'VID', 'TXT', 'HTML'):
                continue
            src = post.get('content_pt_br') or post.get('content_en_us')
            if not src:
                continue
            src = prefix_media(src)
            if post.get('type') == 'IMG':
                if not cover_added:
                    items.append({'type': 'cover', 'url': src})
                    cover_added = True
                items.append({'type': 'img', 'url': src})
            elif post.get('type') == 'VID':
                if not cover_added:
                    items.append({'type': 'cover', 'url': src})
                    cover_added = True
                items.append({'type': 'video', 'url': src})
            else:
                items.append({'type': 'text', 'url': src})

        portfolio.append({
            'id': item['id'],
            'slug': slug,
            'name_pt_br': title,
            'name_en_us': title,
            'description_pt_br': item.get('description_pt_br') or '',
            'description_en_us': item.get('description_en_us') or '',
            'date': item.get('date'),
            'tags': tag_list,
            'categories': categories_list,
            'items': items,
        })

    curriculum_data = {
        'experiences': experiences,
        'skills': skills,
        'courses': courses,
        'certificates': certificates,
        'categories': categories,
        'relevance': relevance,
    }

    output_files = {
        OUTPUT_DIR / 'posts.json': posts,
        OUTPUT_DIR / 'curriculum.json': curriculum_data,
        OUTPUT_DIR / 'portfolio.json': portfolio,
        OUTPUT_DIR / 'database.json': raw_tables,
    }

    for path, payload in output_files.items():
        with path.open('w', encoding='utf-8') as file:
            json.dump(payload, file, ensure_ascii=False, indent=2)

    print('Data exported to:')
    for path in output_files:
        print(f"- {path.relative_to(BASE_DIR)}")


if __name__ == '__main__':
    main()
