// CollapsibleButton.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // Import the index.css file

function toCapitalizedWords(str) {
  if (! str){
    return str
  }
  return str
    .split('_')  // Split the string into an array of words by underscore
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize the first letter of each word
    .join(' ');  // Join the array back into a single string with spaces
}

const CollapsibleButton = ({ nodeId, buttonText, relationship }) => {
  const [data, setData] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [currentlyCopying, setCurrentlyCopying] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNodeText, setNewNodeText] = useState('');
  const [selectedRelationship, setSelectedRelationship] = useState('Choose relationship');

  useEffect(() => {
    async function fetchData() {
      if (!data.length) {
        try {
          const response = await axios.get(`http://103.102.44.216:5000/api/getData/${nodeId}`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
    fetchData();
  }, [data.length, nodeId]);

  const handleButtonClick = () => {
    if (!loaded) {
      setLoaded(true);
    }
    setCollapsed(!collapsed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedRelationship === 'Choose relationship') {
      alert('Please select a valid relationship');
      return;
    }

    try {
      console.log( {
        parentNodeId: nodeId,
        text: newNodeText,
        relationship: selectedRelationship,
      })
      const response = await axios.post(`http://103.102.44.216:5000/api/createNode`, {
        parentNodeId: nodeId,
        text: newNodeText,
        relationship: selectedRelationship,
      });
      if (response.data.success) {
        // Refresh the data to include the newly created node
        setData([...data, { id: response.data.nodeId, text: response.data.text, relationship: selectedRelationship }]);
        setNewNodeText(''); // Clear the textarea
        setSelectedRelationship('Choose relationship'); // Reset the dropdown
      }
    } catch (error) {
      console.error('Error creating node:', error);
    }
  };

  const handleDelete = async (nestedNodeId) => {
    try {
      const response = await axios.delete(`http://103.102.44.216:5000/api/deleteNode/${nestedNodeId}`);
      if (response.data.success) {
        // Remove the node from the data state to reflect the deletion
        setData(data.filter((item) => item.id !== nestedNodeId));
      }
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };
  const handleCopy = async (nestedNodeId) => {
    setCurrentlyCopying(nestedNodeId);   
  };
  const capitalisedRelationship = toCapitalizedWords(relationship);
  var copyLink = '';
  if (nodeId == currentlyCopying){
    copyLink = '@id=' + nodeId;
  }
  return (
    <div>
      <button className="collapsible" onClick={handleButtonClick}>
        {capitalisedRelationship !== 'Choose relationship' && <div>[{capitalisedRelationship}]</div>}
        {buttonText}
      </button>
      {loaded && (
        <div className={collapsed ? 'content' : 'visible-content active'}>
          {data.map((item) => (
            <div key={item.id}>
              <CollapsibleButton
                nodeId={item.id}
                buttonText={item.text}
                relationship={item.relationship} // Pass the individual relationship for each nested button
              />
              <button className="deleteButton" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
              <button className="copyButton" onClick={() => handleCopy(item.id)}>
                Copy
              </button>
              {item.id === currentlyCopying ? '@id=' + item.id : ''}
            </div>
          ))}
          {/* Textarea, Dropdown, and Submit button */}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newNodeText">Write here:</label>
              <br></br>
              <textarea
                id="newNodeText"
                rows="7"
                cols="50"
                wrap="soft"
                value={newNodeText}
                onChange={(e) => setNewNodeText(e.target.value)}
              />
            </div>
            <div>
              <select
                name="functions"
                value={selectedRelationship}
                onChange={(e) => setSelectedRelationship(e.target.value)}
              >
                <option value="choose_relationship">Choose relationship</option>
                <option value="supported_by">Supported by</option>
                <option value="contradicted_by">Contradicted by</option>
                <option value="relationship_disputed_by">Relationship disputed by</option>
                <option value="issue">Issue</option>
                <option value="closes">Closes</option>
                <option value="comment">Comment</option>
                <option value="source">Source</option>
                <option value="subtask">Subtask</option>
              </select>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CollapsibleButton;

