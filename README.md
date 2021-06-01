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
docker exec -it filipelopesme_backend bash -c "cd /usr/src/app/app && python manage.py makemigrations"
docker exec -it filipelopesme_backend bash -c "cd /usr/src/app/app && python manage.py migrate"
```
