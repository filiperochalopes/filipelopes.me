```sh
# backup sqlite3
sqlite3 db.sqlite3 .dump > dump.sql
# restore sqlite3
mv db.sqlite3 _db.sqlite3
sqlite3 db.sqlite3 < dump.sql
```
