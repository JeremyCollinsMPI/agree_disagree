docker build -t agree_backend .
docker run -it --rm -v $PWD:/src --name agree_backend -p 8080:8080 agree_backend python main.py