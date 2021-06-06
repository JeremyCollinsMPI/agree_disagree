docker build -t agree .
docker run -it --rm -v $PWD:/src --name backer -p 8080:8080 agree python main.py