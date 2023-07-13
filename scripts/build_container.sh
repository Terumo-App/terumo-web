# pipenv requirements > requirements.txt
docker build -t terumo-web .

docker tag terumo-web terumoapp/terumo-web:latest