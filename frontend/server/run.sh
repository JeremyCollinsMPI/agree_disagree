docker build -t agree_frontend_express .
docker run -d --rm --name agree_frontend_express -p 5000:5000 -v $PWD:/src agree_frontend_express bash entrypoint.sh 
