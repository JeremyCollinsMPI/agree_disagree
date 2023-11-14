docker run --rm -d --name neo4j -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/aaaaaaaa1 -v $PWD/data:/data neo4j
