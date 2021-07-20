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
    current_text_input_id: ""
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
  
  makePoint(thing) {
    const pointsWithinPoint = this.makePointsWithinPoint(thing)
    return (<div><button type="button" class="collapsible" onClick={this.handleClick}>{thing['text']}</button>
           <div class="content">{pointsWithinPoint}</div></div>
    )
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

  async sendData(id, value){
    let data = {'id': id, 'value': value}
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
  
  handleTextSubmit(e){
    const target = e.target;
    const id = target.id;
    const value = this.state.current_text_input;
    e.preventDefault();
    var text_dict = this.state.text_dict;
    this.setState({'text_dict': text_dict});
    this.sendData(id, value);
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
  }

  render() {
    const urlId = this.getUrlId();
    if(this.state.page=="NONE"){
      this.getData(urlId);
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
  12. storing in json file
  13. try to make the taiwan one in the interface
  14. make faster - DONE
  15. clear text input value after submitting - DONE
  16. clean up code - IN PROGRESS
  17. put on github
  
*/
