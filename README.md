```sh
# backup sqlite3
sqlite3 db.sqlite3 .dump > db.bak
# restore sqlite3
mv db.sqlite3 _db.sqlite3
sqlite3 db.sqlite3 < db.bak
```
