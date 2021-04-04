# filipelopes.me

This is my personal website. Developed and designed by me.

# CMS

The Content Manager System was designed in django. Its exposed on route `/cms`.

# API

# Deploy

For the website deploy it's important to have pyenv and supervisor installed on environment.

- Create a virtualenv with `pyenv virtualenv` with the latest version of python named `filipelopes.me`

```sh
pyenv install 3.9.3
pyenv global 3.9.3
python --version # Python 3.9.3
pyenv virtualenv filipelopes.me
pyenv versions
```

- To update pyenv to install latest python version please checkout this [repo](https://github.com/pyenv/pyenv-update)

```sh
git clone https://github.com/pyenv/pyenv-update.git $(pyenv root)/plugins/pyenv-update
pyenv update
```

- create supervisor.ini for django on folder `/etc/supervisord.d`

```ini
[program:api_filipelopes_me]
command=/root/.pyenv/versions/filipeelore.me/bin/gunicorn wsgi:application --bind=0.0.0.0:5001 --workers=3 --access-logfile=-
directory=/var/www/filipeelore.me/api/django_rest_api
user=root
autostart=true
autorestart=true
stderr_logfile=/var/log/supervisor/api.filipeelore.me.err.log
stdout_logfile=/var/log/supervisor/api.filipeelore.me.out.log
redirect_stderr=True
environment=DJANGO_SETTINGS_MODULE="django_rest_api.settings", LANG="pt_BR.utf8", LC_ALL="pt_BR.UTF-8", LC_LANG="pt_BR.UTF-8"
```

```sh
supervisorctl reread
supervisorctl update
supervisorctl start api_filipelopes_me
supervisorctl status
```

# Known Issues

## Hostgator environment

My website host is a CentOS 9 Hostgator VPS. The default sqlite3 version is to low for the application

```py
import sqlite3
sqlite3.sqlite_version # '3.7.17'
```

```log
raise ImproperlyConfigured('SQLite 3.8.3 or later is required (found %s).' % Database.sqlite_version)
django.core.exceptions.ImproperlyConfigured: SQLite 3.8.3 or later is required (found 3.7.17).
```

So I need to update

```sh
# https://number1.co.za/upgrading-sqlite-on-centos-to-3-8-3-or-later/
cd /opt
wget https://www.sqlite.org/2021/sqlite-autoconf-3350400.tar.gz
cd sqlite-autoconf-3350400
./configure
make
sudo make install
pyenv uninsntall 3.9.3
LD_RUN_PATH=/usr/local/lib PYTHON_CONFIGURE_OPTS="LD_RUN_PATH=/usr/local/lib" pyenv install 3.9.3
```

```py
import sqlite3
sqlite3.sqlite_version # '3.35.4'
```
