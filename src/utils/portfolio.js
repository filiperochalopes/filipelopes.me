export const slugify = value => {
  if (!value || typeof value !== 'string') return '';

  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const withPortfolioSlugs = items => {
  if (!Array.isArray(items)) return [];

  const slugCounts = new Map();

  return items.map((item, index) => {
    if (!item || typeof item !== 'object') return item;

    const baseSlug =
      item.slug ||
      slugify(item.name_en_us) ||
      slugify(item.name_pt_br) ||
      slugify(item.name) ||
      slugify(item.id) ||
      `item-${index + 1}`;

    const count = (slugCounts.get(baseSlug) || 0) + 1;
    slugCounts.set(baseSlug, count);

    const slug = count > 1 ? `${baseSlug}-${count}` : baseSlug;

    return { ...item, slug };
  });
};
