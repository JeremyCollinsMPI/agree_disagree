# docker build -t backer_frontend .
docker run -it --rm  -v $PWD:/moose -p 6000:3000 backer_frontend /bin/bash /moose/entrypoint.sh