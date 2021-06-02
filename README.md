### Realizando dump de banco de dados

```sh
# backup sqlite3
sqlite3 db.sqlite3 .dump > dump.sql
# restore sqlite3
mv db.sqlite3 _db.sqlite3
sqlite3 db.sqlite3 < dump.sql
```

### Inicializando migrações

```sh
docker exec -it filipelopesme_backend bash -c "cd /usr/src/app/django_rest_api && python manage.py makemigrations"
docker exec -it filipelopesme_backend bash -c "cd /usr/src/app/django_rest_api && python manage.py migrate"
```

### Coletando arquivos estáticos

Necessário para capturar arquivos para criar pdf

```sh
docker exec -it filipelopesme_backend bash -c "cd /usr/src/app/django_rest_api && python manage.py collectstatic"
```
