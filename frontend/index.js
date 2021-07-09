import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
// const queryString = require('query-string');


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
      }
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
//     this.particularPage = this.particularPage.bind(this);

  }
    
//     this.handleInputDropdownChange = this.handleInputDropdownChange.bind(this);
//     this.onFileChange = this.onFileChange.bind(this); 
//     this.handleAdditionalInputChange = this.handleAdditionalInputChange.bind(this);

  handleClick(e) {
    const target = e.target;
    var content = target.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
/*

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
*/
  }

  makePointsWithinPoint(thing){
    const whatever = thing["links"].map(item => this.makePoint(item));
    const additionalInput = this.makeTextInput();
    
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
//     alert(string);
    text_dict['links'][0]['links'].push({"id": "mark 19", "link_text": "contradicted by", "text": 'mom', 'links': []});
    alert('done');
    console.log(text_dict);
    return (text_dict)
  }

  async sendData(){
    let data = {'state': this.state.text_dict}
    let url = this.ip + ":8080/pages";
       await axios.post(url, data).then((response) => {
  console.log(response);
  }, (error) => {
  console.log(error);
  });
  }  

  handleTextSubmit(e){
    const target = e.target;
    const position = target.id;
    const value = target.value;
    console.log(value);
    var text_dict = this.state.text_dict;
//     var current = text_dict;
//     for (var number in position.split('_')){
//       current = current['links'];
//       current = current[parseInt(number)];
//     }
//     current['links'].push({'id': '***', 'text': value, 'links': []});
    var numbers = position.split('_');
//     alert(numbers);
//     text_dict = this.updateTextDict(text_dict, numbers, value);
    text_dict['links'].push({"id": "mark 19", "link_text": "contradicted by", "text": 'mom', 'links': []});

    console.log(text_dict);
    alert('fuck');
    this.setState({'text_dict': text_dict});
    console.log( this.state.text_dict);
    alert('fieh');
    this.sendData();
  }
  
  makeTextInput(){
    return (<form onSubmit={this.handleTextSubmit} id="">
  <label>
    Write here:
    <input type="text" />
  </label>
</form>)
  }
  
  makePoints() {
    const points = this.state.text_dict["links"].map(thing => this.makePoint(thing));
    const additionalInput = this.makeTextInput();
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
  }

//     const search = this.props.location.search; // could be '?foo=bar'
//     const params = new URLSearchParams(search);
//     const foo = params.get('page'); // bar
//     return(foo)
  





// <div class="content"></div>
// </div>    
//   <p>Contradicted by: </p>
// <button type="button" class="collapsible">Mark 9. 
// This assumes a single evolutionary track whereas of course language is a biocultural hybrid.  Yes, it is less likely that many mammals independently evolved tails and much more likely that they now have one because their common ancestor had one. But cultural evolution crucially gives you dual inheritance. Essentially, the (faster evolving) cultural evolutionary track provides ways for innovation & diffusion (and convergence and divergence) in a way that is decoupled in important ways from the biological track (Dennett 1995, Richerson & Boyd 2005). And that is exactly what modelling work shows: strong cultural universals can easily evolve from social learning and cultural transmission and they don't imply nor require strong biological constraints (Thompson et al. 2016).



// </button>
// <div class="content">
// </div>  
// </div>
// <button type="button" class="collapsible">Tayo 4. 
//  </button>
// <div class="content">
// <p>Contradicted by:</p>
// <button type="button" class="collapsible">Mark 11. 


// </button>
// 
// </div>
// 
// <button type="button" class="collapsible">Tayo 5. There could be a phylogenetic precursor of interjections such as 'Huh?' and 'Ah!'</button>
// <div class="content">
//   <p>Supported by:</p>
//  <button type="button" class="collapsible">Tayo 6. Other primates do express surprise and presumably also gasp for air when startled - that's the most likely precursor for "Huh?" as there are interactional contexts which blur the line between repair initiation and expressing ritual disbelief. </button>
// <div class="content">
// </div>
//  <button type="button" class="collapsible">Tayo 7. Perhaps the phylogenetic precursor is even more obvious in the case of long rising-falling "Ah!" Take a look at this baboon displaying surprise at a magic trick flaunting his knowledge of object continuation: https://www.youtube.com/watch?v=dm8Q4fgv8Qo&ab_channel=America%27sFunniestHomeVideos </button>
// <div class="content">
// </div>
//  <button type="button" class="collapsible">Tayo 8. All other great apes have a repertoire of vocalizations and Tomasello (2008) says most of these are believed to be "almost totally genetically fixed". So where are ours? Where did they go? Well, most likely interjections are what you get when you combine genetically fixed vocalizations with voluntary breath control. </button>
// <div class="content">
// </div>
// <p>Contradicted by:</p>
// <button type="button" class="collapsible">Mark 10. Especially when there are multiple universal interactional tools like this, to posit that each of them must have their own mammalian vocalisation precursor is less plausible (more evolutionarily 'expensive') than to posit that they arise from interactional exigencies that all these languages share anyway. </button>
// <div class="content">
// </div>
// 
// </div>
// </div>

//   particularPage(){
// //   let { page } = useParams();
//   let page = 1;
//   alert('moose');
// //   var data = getData(page);
//   if(page=='1'){
//     this.setState({'text_dict': 
//     
//   { "id": "monkey",
//       "text": "fish",
//       "links": []}
// 
//     
//     });
//   }
//   
//   const points = this.makePoints();
//   console.log(this.state.text_dict);
//     return (a   
// <html>
// <head>
// <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
// </head>
// <body>
// 
// <h2>{this.state.text_dict['text']}</h2>
// {points}
// 
// 
// </body>
// </html>
//   )
// 
//   }

  render() {
    const urlId = this.getUrlId();
    this.getData(urlId);
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
  9. debugging - IN PROGRESS
  10. put on github 
*/
