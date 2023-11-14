// server/index.js
const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors')

const app = express();
const port = 5000;

app.use(cors());

// Parse JSON requests
app.use(express.json());

const driver = neo4j.driver(
  'bolt://103.102.44.216:7687',
  neo4j.auth.basic('neo4j', 'aaaaaaaa1')
);

const session = driver.session();

app.get('/api/getData/:id', async (req, res) => {
  const { id } = req.params;
  console.log('received')
  const session = driver.session();
  try {
    const result = await session.readTransaction(async (tx) => {
      const query = 'MATCH (p:Node {id: $id})-[x]->(o:Node) RETURN o.id, o.text, type(x)';
      const params = { id };
      return await tx.run(query, params);
    });

    const data = result.records.map((record) => ({
      id: record.get('o.id'),
      text: record.get('o.text'),
      relationship: record.get('type(x)')
    }));

    res.json(data);
  } catch (error) {
    console.error('Error executing Neo4j query:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  } finally {
    session.close(); // Always remember to close the session after the query/transaction is done.
  }
});

// Create a new node and link it to the parent node
app.post('/api/createNode', async (req, res) => {
  const { parentNodeId, text, relationship } = req.body; // Include relationship in the request body

  try {

    if (text.startsWith('@id=')) {
      const match = text.match(/^@id=([\w-]+)/);
      if (match && match[1]) {
          const id = match[1];
          console.log(`Found ID: ${id}`);
          const result = await session.writeTransaction((tx) =>
          tx.run(
            'MATCH (o:Node), (p:Node)' +
            'WHERE o.id = $parentNodeId AND p.id = $id ' + 
            'CREATE (o)-[r:' + relationship + ']->(p)' +
            'RETURN p.id, p.text',
            { parentNodeId, id } 
          )
        );
        const data = result.records.map((record) => ({
          id: record.get('p.id'),
          text: record.get('p.text')
        }));
        console.log(data[0])
        res.status(201).json({ success: true , nodeId: data[0].id , text: data[0].text})
        return
      } 
    }
    
    const result = await session.writeTransaction((tx) =>
      tx.run(
        'MATCH (parent:Node {id: $parentNodeId}) ' +
          'CREATE (newNode:Node {id: randomUUID(), text: $text}) ' +
          'MERGE (parent)-[:' + relationship + ']->(newNode) ' +
          'RETURN newNode.id',
        { parentNodeId, text} 
      )
    );

    if (result.records.length === 1) {
      const newNodeId = result.records[0].get('newNode.id');
      res.status(201).json({ success: true, nodeId: newNodeId,
          text: text});
    } else {
      res.status(500).json({ success: false, message: 'Failed to create node' });
    }
  } catch (error) {
    console.error('Error creating node:', error);
    res.status(500).json({ success: false, message: 'Error creating node' });
  }
});

// Delete a node with the given ID
app.delete('/api/deleteNode/:id', async (req, res) => {
  const nodeId = req.params.id;
  try {
    const result = await session.writeTransaction((tx) =>
      tx.run('MATCH (node:Node {id: $nodeId}) DETACH DELETE node RETURN COUNT(node)', { nodeId })
    );

    if (result.records.length === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Node not found' });
    }
  } catch (error) {
    console.error('Error deleting node:', error);
    res.status(500).json({ success: false, message: 'Error deleting node' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});














