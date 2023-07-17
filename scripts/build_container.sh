# pipenv requirements > requirements.txt
docker build -t terumo-web .

docker tag terumo-web terumoapp/terumo-web:RELEASE-v0.0.1