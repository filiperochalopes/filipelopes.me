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
supervisorctl
```
