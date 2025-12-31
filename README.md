# filipelopes.me

Site estático em Astro + React. O conteúdo vem do SQLite (sem Django) e é exportado para JSON.

## Exportar dados do SQLite

```sh
python3 scripts/export_data.py
```

Gera:
- `frontend/src/data/posts.json`
- `frontend/src/data/curriculum.json`
- `frontend/src/data/portfolio.json`
- `frontend/src/data/database.json`

## Desenvolvimento

```sh
cd frontend
pnpm install
pnpm dev
```

## Docker (dev)

```sh
docker-compose up --build
```

## Build (produção)

```sh
docker-compose -f docker-compose.prod.yml up --build
```

## PDF do currículo

A rota `/pdf/curriculum` gera o PDF via **jsPDF** no navegador.
