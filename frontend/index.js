import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';


class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.ip = "http://103.102.44.216";
    this.state = {
    text_dict: {
      "id": "NONE",
      "text": "NONE",
      "links": [
        ]
      },
    page: "NONE",
    current_text_input: "",
    current_text_input_id: "",
    current_relationship: "",
    current_relationship_id: "",
    editing: {},
    makePoints: false,
    editing_text_dict: {}
    }    
    this.makePoints = this.makePoints.bind(this);
    this.makePointsWithinPoint = this.makePointsWithinPoint.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.makeTextInput = this.makeTextInput.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
    this.updateTextDict = this.updateTextDict.bind(this);
    this.sendData = this.sendData.bind(this);
    this.getUrlId = this.getUrlId.bind(this);
    this.getParameterByName = this.getParameterByName.bind(this);
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkId = this.checkId.bind(this);
    this.handleRelationshipChange = this.handleRelationshipChange.bind(this);
    this.makeDeleteButton = this.makeDeleteButton.bind(this);
    this.makeEditButton = this.makeEditButton.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.sendDeleteData = this.sendDeleteData.bind(this);
    this.sendEditData = this.sendEditData.bind(this);
    this.makeEditingDict = this.makeEditingDict.bind(this);
    this.addToEditingDict = this.addToEditingDict.bind(this);
    this.makeEditingTextDict = this.makeEditingTextDict.bind(this);
    this.addToEditingTextDict = this.addToEditingTextDict.bind(this);
    this.makeEditingTextInput = this.makeEditingTextInput.bind(this);
  }
    
  handleClick(e) {
    const target = e.target;
    var content = target.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }

  makePointsWithinPoint(thing){
    const whatever = thing["links"].map(item => this.makePoint(item));
    const additionalInput = this.makeTextInput(thing["id"]);
    
    return (<div>{whatever}{additionalInput}</div>)
    
  }
  
  addToEditingDict(editingDict, textDict){
    editingDict[textDict['id']] = false;
    console.log("here");
    console.log(textDict['id']);
    console.log(textDict['links']);
    for (var i = 0; i < textDict['links'].length; i++){
      editingDict = this.addToEditingDict(editingDict, textDict['links'][i]);
    }
    return(editingDict)
  }

  addToEditingTextDict(editingTextDict, textDict){
    editingTextDict[textDict['id']] = textDict['text'];
    for (var i = 0; i < textDict['links'].length; i++){
      editingTextDict = this.addToEditingTextDict(editingTextDict, textDict['links'][i]);
    }
    return(editingTextDict)
  }
  
  makeEditingDict(){
    const textDict = this.state.text_dict;
    var editingDict = {};
    editingDict = this.addToEditingDict(editingDict, textDict);
    this.setState({'editing': editingDict});
  }

  makeEditingTextDict(){
    const textDict = this.state.text_dict;
    var editingTextDict = {};
    editingTextDict = this.addToEditingTextDict(editingTextDict, textDict);
    this.setState({'editing_text_dict': editingTextDict});
  }
  
  handleDeleteButtonClick(e){
    const target = e.target;
    const id = target.id;
    this.sendDeleteData(id);
    this.setState({'page': 'NONE'})
  }

  handleEditButtonClick(e){
    const target = e.target;
    const id = target.id;
//     this.sendEditData(id);
    var editingDict = this.state.editing;
    editingDict[id] = true;
    this.setState({'editing': editingDict});
//     this.setState({'page': 'NONE'})
    const defaultText = this.state.editing_text_dict[id];
    this.setState({"current_text_input": defaultText});
    this.setState({"current_text_input_id": id});
    this.setState({'makePoints': true});
    console.log('edit');
    console.log(this.state.editing);
  }
  
  makeDeleteButton(id){
  return(<button id={id} class="deleteButton" onClick={this.handleDeleteButtonClick}>delete</button>)
  }

  makeEditButton(id){
  return(<button id={id} class="editButton" onClick={this.handleEditButtonClick}>edit</button>)
  }
  
  async sendDeleteData(id){
    let data = {'id': id}
    let url = this.ip + ":8080/delete?page=" + this.state.page + "&id=" + id;
       await axios.post(url, data).then((response) => {
  console.log('hello');
  }, (error) => {
  console.log(error);
  });
  }  

  async sendEditData(id){
    let data = {'id': id}
    let url = this.ip + ":8080/edit?page=" + this.state.page + "&id=" + id;
       await axios.post(url, data).then((response) => {
  console.log('hello');
  }, (error) => {
  console.log(error);
  });
  }  

  makePoint(thing) {
    const pointsWithinPoint = this.makePointsWithinPoint(thing)
    const deleteButton = this.makeDeleteButton(thing['id']);
    const editButton = this.makeEditButton(thing['id']);
    if(this.state.editing[thing['id']]==true) {
    console.log('monkeys');
//     return (<div><button type="button" class="collapsible" onClick={this.handleClick}>{'[' + thing['link_text'] + ']'} <br/>{thing['text']}</button>
//            <div class="content">{pointsWithinPoint}</div>{deleteButton}{editButton}</div>)
    const textInput = this.makeEditingTextInput(thing['id']);
    return(textInput)
    } else {
    return (<div><button type="button" class="collapsible" onClick={this.handleClick}>{'[' + thing['link_text'] + ']'} <br/>{thing['text']}</button>
           <div class="content">{pointsWithinPoint}</div>{deleteButton}{editButton}</div>)
    }
  }
  
  updateTextDict(text_dict, numbers, value){
    var string = 'text_dict';
    for (var number in numbers){
      string = string.concat("['links'][").concat(number).concat(']');
    }
    string = string.concat("['links'].push({'id': '***', 'text': '");
    string = string.concat('mate');
    string = string.concat("', 'links': []};");
    text_dict['links'][0]['links'].push({"id": "mark 19", "link_text": "contradicted by", "text": 'mom', 'links': []});
    return (text_dict)
  }

  async sendData(id, value, relationship){
    let data = {'id': id, 'value': value, 'relationship': relationship}
    let url = this.ip + ":8080/update?page=" + this.state.page;
       await axios.post(url, data).then((response) => {
  console.log('hello');
  }, (error) => {
  console.log(error);
  });
  }  
  
  handleChange(event) {
  this.setState({current_text_input: event.target.value});
  this.setState({current_text_input_id: event.target.id});
  }
  
  handleRelationshipChange(event) {
  this.setState({current_relationship: event.target.value});
  this.setState({current_relationship_id: event.target.id})
  }
  
  handleTextSubmit(e){
    const target = e.target;
    const id = target.id;
    const value = this.state.current_text_input;
    const relationship = this.state.current_relationship;
    e.preventDefault();
    var text_dict = this.state.text_dict;
    this.setState({'text_dict': text_dict});
    this.sendData(id, value, relationship);
    this.setState({'page': 'NONE'})
    this.setState({'current_text_input': ''})
  }
  
  checkId(value, id){
      if(id==this.state.current_text_input_id){
      return(value)
      } else{
      return('')
      }
    }  

  
  makeTextInput(id){
    return (<form id={id} autocomplete="off" onSubmit={this.handleTextSubmit}>
  <label>
    Write here:
    <input type="text" id={id} value={this.checkId(this.state.current_text_input, id)} onChange={this.handleChange}/>

  </label>
<select name="functions" id={"relationship_" + id} onChange={this.handleRelationshipChange}>
    <option value="Choose relationship">Choose relationship</option>
    <option value="Supported by">Supported by</option>
    <option value="Contradicted by">Contradicted by</option>
    <option value="Relationship disputed by">Relationship disputed by</option>
    <option value="Issue">Issue</option>
    <option value="Comment">Comment</option>
    <option value="Source">Source</option>
    <option value="Subtask">Subtask</option>
  </select>  

</form>)
  }

  makeEditingTextInput(id){
    return (<form id={id} autocomplete="off" onSubmit={this.handleTextSubmit}>
  <label>
    Edit:
    <input type="text" id={id} value={this.checkId(this.state.current_text_input, id)} onChange={this.handleChange}/>

  </label>
<select name="functions" id={"relationship_" + id} onChange={this.handleRelationshipChange}>
    <option value="Choose relationship">Choose relationship</option>
    <option value="Supported by">Supported by</option>
    <option value="Contradicted by">Contradicted by</option>
    <option value="Relationship disputed by">Relationship disputed by</option>
    <option value="Issue">Issue</option>
    <option value="Comment">Comment</option>
    <option value="Source">Source</option>
    <option value="Subtask">Subtask</option>
  </select>  

</form>)
  }
  
  makePoints() {
    const points = this.state.text_dict["links"].map(thing => this.makePoint(thing));
    const additionalInput = this.makeTextInput(this.state.text_dict["id"]);
    return (<div>{points}{additionalInput}</div>)
  }

  getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  getUrlId() {
    const url = window.location.href;
    const page = this.getParameterByName('page', url);
    return page
  }

  async getData(id) {
  let url = this.ip + ":8080/get?page=" + id;
  await axios.get(url).then(response => {this.setState({"text_dict": response.data['result']})});   
  this.setState({"page": id});
  this.makeEditingDict();
  this.makeEditingTextDict();
  console.log("mte");
  console.log(this.state.editing);
  }

  render() {
    const urlId = this.getUrlId();
    if(this.state.page=="NONE"){
      this.getData(urlId);
    }
    if(this.state.makePoints==true){
      console.log('fuck');
      const points = this.makePoints();
    }
    const points = this.makePoints();
    console.log(this.state.text_dict);
    
    return (   
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
</head>
<body>

<h2>{this.state.text_dict['text']}</h2>
{points}


</body>
</html>
  )
  }
}

ReactDOM.render(<Steps />, document.getElementById("root"));

/*
  1. let's say that you just want to produce the html without the collapsible aspect of it - DONE
  2. try just the header - DONE
  3. have the header and then the rest as a variable called points - DONE
  4. show all the texts as siblings regardless of level - DONE, when ccs is 'block' not 'none'.  changing back to 'none'.
  5. make event listener - DONE
  6. try with several of the statements - DONE
  7. plan how to have a text input that then is replaced by the collapsible - DONE, will use axios and python backend
  8. write python api - DONE
  9. debugging - DONE
  10. put on github  - DONE
  11. work out how to submit text - DONE
  12. storing in json file - DONE
  13. try to make the taiwan one in the interface - NOT DOING
  14. make faster - DONE
  15. clear text input value after submitting - DONE
  16. clean up code - DONE
  17. put on github - DONE
  18. rethink what else needs to be there for it to be useful - DONE
  19. add drop down for relationship - DONE
  20. add text input for username - NOT DOING
  21. think of way that you can mark a statement as 'wrong', 'right' etc. - NOT DOING
  22. show the link text - DONE
  23. put link text in brackets - DONE
  24. update backend to take link text - DONE
  25. capitalise link text 
  26. fix to the options list - DONE
  27. add a delete button by the points - DONE
  28. make one for my current argument with tayo - DONE
  29. make the text box wider
  30. api not storing ids properly yet - DONE
  31. possible bug with deletion
  32. write up example one with tayo
  33. add 'Source' link - DONE
  34. example smartchat one 
  35. make points editable - IN PROGRESS
  36. put the delete button to the far right - DONE
  37. figure out how the ids should work
  38. page crashes when deleting something - DONE
  
12. storing in json file - DONE
1. design - DONE
2. backend - DONE

13. try to make the taiwan one in the interface - NOT DOING
1. make first few in json file - DONE
2. try adding remaining points from whatsapp - DONE

27. add a delete button by the points - DONE
1. plan - DONE
2. add buttons by the points - DONE
3. backend deletion - DONE

27.3 backend deletion - DONE
1. fix issue with ids - DONE

27.3.1 fix issue with ids - DONE
1. work out what the appended ids are supposed to be - DONE

35. make points editable - IN PROGRESS
1. find out how to add a button on the far right - DONE
2. make the button have more space - DONE
3. add two buttons, for delete and edit - DONE
4. plan the backend - DONE
5. write the backend - DONE
6. makeEditingDict - DONE
7. make it be a text box if editing is true - IN PROGRESS
8. handle edit button should set editing to true
9. correction to way edit data is sent

35.1 find out how to add a button on the far right - DONE
1. inspect the css - DONE
2. try inserting a button on the button - DONE
3. try making that button appear on the right - DONE

35.1.3 try making that button appear on the right - DONE
1. try out first css change - DONE

35.2 make the button have more space - DONE
1. try changing css - DONE
2. adjust until it looks right - DONE

35.7  make it be a text box if editing is true - IN PROGRESS
1. try using the makeTextInput function - DONE
2. plan what kind of text box I mean - DONE
3. you want the existing text to be shown by default - DONE
4. you want to show a Finish Editing button - IN PROGRESS
5. you want the existing relationship to be shown by default
6. if possible have a grey background like for the button

38. page crashes when deleting something - DONE
1. try again and see error message - DONE
2. try to make the main button less wide and have delete button outside it - DONE

38.2 try to make the main button less wide and have delete button outside it - DONE
1. try changing the css of main button - DONE
2. put second button outside of it - DONE

notes

27. add a delete button by the points

the idea is that you add a small icon by the points first
make it pressable;
it will then update the backend

27.3.1.1 work out what the appended ids are supposed to be

35. make points editable

35.7.2 plan what kind of text box I mean - IN PROGRESS
you want the existing text to be shown by default
you want to show a Finish Editing button
you want the existing relationship to be shown by default
if possible have a grey background like for the button

*/
