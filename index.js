plan

you have a dictionary like this,

{"text": 'I think this', "links": {"id": {"link_text": "supported by", "text": "because of this", "links": [...]}}}

the text in this case becomes the main header
for every item in links, you print the text within a collapsible.
in this collapsible, you have an id, and onClick = a certain function
the function makes the collapsible display the elements in 


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
      "id": "tayo 1"
      "text": "Main opinion",
      "links": {
        {"id": "tayo 2",
          "link_text": "supported by",
          "text": "First reason",
          "links": {
            "id": "tayo 3",
            "link_text": "supported by",
            "text": "Reason supporting first reason",
            "links": []
            }
          }
        }
      }    
    }




//     this.handleDropdownChange = this.handleDropdownChange.bind(this);
//     this.handleInputDropdownChange = this.handleInputDropdownChange.bind(this);
//     this.onFileChange = this.onFileChange.bind(this); 
//     this.handleAdditionalInputChange = this.handleAdditionalInputChange.bind(this);
  }

  render() {
    return (   
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
</head>
<body>

<h2>Tayo 1. Convergent cultural evolution as a mechanism to account for universal interjections is untenable</h2>
<p>Supported by:</p>
<button type="button" class="collapsible">Tayo 2. Nobody knows how frequent convergent evolution really is, but everybody agrees that it becomes statistically less likely the more independent descendants happen to "chance upon" the same feature. If all languages have "Huh?", assuming homoplasy (convergent evolution) is less parsimonious than assuming homology.
</button>
<div class="content">
  <p>Supported by: </p>
<button type="button" class="collapsible">Tayo 3. If we find more universal interjections, as was predicted in your paper and as I then did, convergent cultural evolution becomes even less likely. Not only statistically, but also because if we hypothesize the interactional environments to exert pressure such that interjections be "short" and "carry distinctive intonation", then why aren't the forms and functions of "Huh?" and "Oh." crossed in some language, as both interjections fulfill these requirements.</button>
<div class="content">
<p>Contradicted by:</p>
<button type="button" class="collapsible">Mark 12. the idea is that oh and huh are unlikely to be 'crossed' precisely because their interactional environments aren't the same. If environments didn't matter, we would indeed expect them to be crossed all the time, which we haven't seen evidence for (so far). As I wrote, "the interactional environment in which these items occur may provide, for each of them, a distinct set of selective pressures–for minimality, salience, contrast, or other adaptive properties–that squeezes them into their most optimal shape​" (Dingemanse 2017).</button>
<div class="content"></div>
</div>    
  <p>Contradicted by: </p>
<button type="button" class="collapsible">Mark 9. This assumes a single evolutionary track whereas of course language is a biocultural hybrid.  Yes, it is less likely that many mammals independently evolved tails and much more likely that they now have one because their common ancestor had one. But cultural evolution crucially gives you dual inheritance. Essentially, the (faster evolving) cultural evolutionary track provides ways for innovation & diffusion (and convergence and divergence) in a way that is decoupled in important ways from the biological track (Dennett 1995, Richerson & Boyd 2005). And that is exactly what modelling work shows: strong cultural universals can easily evolve from social learning and cultural transmission and they don't imply nor require strong biological constraints (Thompson et al. 2016).</button>
<div class="content">
</div>  
</div>
<button type="button" class="collapsible">Tayo 4. The interactional environment doesn't crush an interjection into a "Huh?"-shaped diamond. This is evinced by the fact that most if not all languages use a language-specific form alongside the universal interjection: "What?", "Que?", "Shenme?", "Nani?", etc. </button>
<div class="content">
<p>Contradicted by:</p>
<button type="button" class="collapsible">Mark 11. Your reading of the notion of 'cultural evolution' deviates somewhat from what most people have in mind. It just refers to the socially transmitted nature of lexical items, and it fully embraces the existence of a wide range of constraining and diversifying forces ('natural causes', Enfield 2014). You can take canoes as an example from material culture (Rogers & Ehrlich 2008): a culturally transmitted tool, independently invented a couple times across the globe, convergently shaped by the exigencies of its use (e.g., needing to float, being navigable), with room for cultural diversification (e.g. additional functions, ornaments). This analogy also offer a good answer to your worry about the flowering of question words besides 'huh?' (which, you'll note, all have a much wider array of functions). Of course there are also surf boards, catamarans, container ships, and ferries besides the humble canoe. That doesn't mean that the basic shape of the simplest seafaring vessel is not, in a deep sense, selected by the sea. It is this sense in which we can say that the basic shape of the simplest interactional words may be 'selected' by their interactional environment.</button>

</div>

<button type="button" class="collapsible">Tayo 5. There could be a phylogenetic precursor of interjections such as 'Huh?' and 'Ah!'</button>
<div class="content">
  <p>Supported by:</p>
 <button type="button" class="collapsible">Tayo 6. Other primates do express surprise and presumably also gasp for air when startled - that's the most likely precursor for "Huh?" as there are interactional contexts which blur the line between repair initiation and expressing ritual disbelief. </button>
<div class="content">
</div>
 <button type="button" class="collapsible">Tayo 7. Perhaps the phylogenetic precursor is even more obvious in the case of long rising-falling "Ah!" Take a look at this baboon displaying surprise at a magic trick flaunting his knowledge of object continuation: https://www.youtube.com/watch?v=dm8Q4fgv8Qo&ab_channel=America%27sFunniestHomeVideos </button>
<div class="content">
</div>
 <button type="button" class="collapsible">Tayo 8. All other great apes have a repertoire of vocalizations and Tomasello (2008) says most of these are believed to be "almost totally genetically fixed". So where are ours? Where did they go? Well, most likely interjections are what you get when you combine genetically fixed vocalizations with voluntary breath control. </button>
<div class="content">
</div>
<p>Contradicted by:</p>
<button type="button" class="collapsible">Mark 10. Especially when there are multiple universal interactional tools like this, to posit that each of them must have their own mammalian vocalisation precursor is less plausible (more evolutionarily 'expensive') than to posit that they arise from interactional exigencies that all these languages share anyway. </button>
<div class="content">
</div>

</div>



</body>
</html>
  )
  }
}

ReactDOM.render(<Steps />, document.getElementById("root"));

/*
  first aim; let's say that you just want to produce the html without the collapsible aspect of it
*/
// 
// 
//   addStep() {
//   const currentStepNumber = this.state.currentStepNumber + 1;
//   this.setState({
//     stepNumbers: this.state.stepNumbers.concat(currentStepNumber),
//     currentStepNumber: currentStepNumber,
//     inputs: this.state.inputs.concat({'type': 'undefined'}),
//     additionalInputs: this.state.additionalInputs.concat({'type': 'undefined'})
//   })
//   }
//   
//   handleDropdownChange(e) {
//     const index = e.target.id;
//     const functions = this.state.functions;
//     functions[index] = e.target.value;
//     this.setState({ functions: functions });
//     let url = this.ip + ":8080/wake_up_gcp";
//     axios.get(url);
//   }
// 
//   handleInputDropdownChange(e) {
//     const index = e.target.id;
//     const inputs = this.state.inputs;
//     inputs[index]['name'] = e.target.value;
//     if (inputs[index]['name'] === 'file or directory') {
//       inputs[index]['type'] = 'file or directory'
//     }
//     if (inputs[index]['name'].includes('Output')) {
//       inputs[index]['type'] = 'Output';
//       inputs[index]['index'] = inputs[index]['name'].replace('Output ', '');
//       inputs[index]['index'] = parseInt(inputs[index]['index']) - 1;
//     }    
//     if (inputs[index]['name'] == 'Api input'){
//       inputs[index]['type'] = 'Api input';
//     }
//     this.setState({ inputs: inputs });
//   }
// 
//   onFileChange = event => { 
//       var inputs = this.state.inputs;
//       const index = event.target.id;
//       inputs[index]['file'] = event.target.files[0];
//       this.setState({ 
//       inputs: inputs});     
//     };
// 
//   handleAdditionalInputChange(e) {
//     const index = e.target.id;
//     var additionalInputs = this.state.additionalInputs;
//     const value = e.target.value;
//     additionalInputs[index] = {'type': 'text', 'text': value};
//     this.setState({additionalInputs: additionalInputs});
//   }
// 
// 
//   makeAdditionalInputs(index) {
//   console.log(this.state.functions[index])
//   let example_array = ["Find sentences with string", "Semantic search"];
//   console.log(example_array);
//   console.log(example_array.includes(this.state.functions[index]));
//   if(this.state.functions[index] == "Get sentences from CSV"){
//     return(<div className="l">Column name:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
//   }
//   if(this.state.functions[index] == "Entails"){
//     return(<div className="l">Hypothesis:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange}></input></div>)
//   }  
//   if(this.state.functions[index] == "Get sentences from url"){
//     return(<div className="l">Url:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
//   }  
//   if(this.state.functions[index] == "Ask question"){
//     return(<div className="l">Question:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange}></input></div>)
//   }  
//   if (example_array.includes(this.state.functions[index])){
//     return(<div className="l"><input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
//     } else {
//     return(<div className="k"></div>)
//   }
//   }
//   
//   showFileUploadButton(index) {
//   if (this.state.inputs[index]['type'] == 'file or directory'){
//   return(  <form className = "l">
//   <input type="file" id={index} onChange={this.onFileChange}></input>
//   </form>
//   )  
//   } else {
//   return (<div className="k"></div>)
//   }  
//   }
//   
//   makeInputDropdownMenu(thing) { 
//   return(
//          <div className="f">   <select name="input" id={thing} onChange={this.handleInputDropdownChange}>
//     <option value="Choose input">Choose input</option>
//     <option value="file or directory">Upload file or directory</option>
//     <option value="Output 1">Output 1</option>
//     <option value="Output 2">Output 2</option>
//     <option value="Api input">Api input</option>
//   </select>  
//        </div>      
//        )
//     } 
// 
//   async submitFile(index) {
//   const data = new FormData()
//   data.append('file', this.state.inputs[index]['file'])
//   let id = this.state.id;
//   let step = index;
//   let url = this.ip + ":8080/accept_file?id=" + id + "&step=" + index;
//   await axios.post(url, data);
//     
//   }
// 
//   async submitFiles() {
//     var i;
//     for (i = 0; i < this.state.inputs.length; i++) {
//       if(this.state.inputs[i].type == 'file or directory'){
//         await this.submitFile(i);
//       }
//     }
//   }
//  
//   async submitSteps() {
//     let data = {'state': this.state}
//     let url = this.ip + ":8080/accept_steps?id=" + this.state.id;
//        await axios.post(url, data).then((response) => {
//   console.log(response);
//   }, (error) => {
//   console.log(error);
//   });
//   }
//     
//   async submitRun() {
//   let url = this.ip + ":8080/run?id=" + this.state.id;
//   await axios.get(url).then(response => {this.setState({"r": response.data})}); 
//   }
//   
//   async submit() {
//   this.setState({"in_progress": true});
//   this.setState({"r": {'result': []}});
//   let x = await this.submitSteps();
//   console.log(x);
//   let y = await this.submitFiles();
//   console.log(y);
//   let z = await this.submitRun();
//   this.setState({"in_progress": false});
//   }
//   
//   render() {
//     const stepNumbers = this.state.stepNumbers;  
//     const steps = stepNumbers.map(thing => {
//       const outputName = 'output ' + (thing + 1); 
//       const index = thing;
//       const additionalInputs = this.makeAdditionalInputs(index);
//       const inputDropdownMenu = this.makeInputDropdownMenu(thing);
//       const fileUploadButton = this.showFileUploadButton(index);
//       var x = this.state.inputs[0]['type'];
//       return (
// <div className="h">
//        {inputDropdownMenu}
//        <div className="f">   <select name="functions" id={thing} onChange={this.handleDropdownChange}>
//     <option value="Choose function">Choose function</option>
//     <option value="Get sentences from CSV">Get sentences from CSV</option>
//     <option value="Semantic search">Semantic search</option>
//     <option value="Find relevant sentence">Find relevant sentence</option>
//     <option value="Word document to text file">Word document to text file</option>
//     <option value="Text file to sentences">Text file to sentences</option>
//     <option value="Find sentences with string">Find sentences with string</option>
//     <option value="Entails">Entails</option>
//     <option value="Get sentences from url">Get sentences from url</option>
//     <option value="Ask question">Ask question</option>
//     <option value="Make api link">Make api link</option>
//   </select>  
// 
//          <div className="p">{outputName}</div> 
// </div>
//        {fileUploadButton}
//        {additionalInputs}
// </div>
//       );
//     });
//     console.log(this.state.additionalInputs);
//     const resultList = this.state.r.result;
//     let resultHeader = '';
//     if(resultList.length > 0){
//       resultHeader = 'Result:'
//     }
//     let inProgressHeader = '';
//     if (this.state.in_progress){
//       inProgressHeader = "In progress";
//     }
//     const result = resultList.map(thing => {
//     return (
//     <div>{thing}</div>    
//     );
//     }
//     );
//     return (
// <div>
//     <div>
//      <button onClick={() => this.addStep()}>Add step</button>
//       {steps}
//       <button className="n" onClick={() => this.submit()}>Submit</button>
//       </div>
// <div className="i">
// <p>Click on the "Add step" button to add steps</p>
// </div>
// <p>{inProgressHeader}</p>
// <p>{resultHeader}</p>
// <div className="i">
// <p>{result}</p>
// </div>
// </div>
//     );
//   }
// }
// 
// // ========================================
// 
// ReactDOM.render(<Steps />, document.getElementById("root"));
// 
// 
// 
// 
// ----
// 
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import axios from 'axios';
// 
// class Steps extends React.Component {
//   constructor(props) {
//     super(props);
//     this.ip = "http://103.102.44.216";
//     this.state = {
//      stepNumbers: [0],
//      currentStepNumber: 0,
//      functions: ['undefined'],
//      inputs: [{'type': 'undefined'}],
//      additionalInputs: [{'type': 'undefined'}],
//      r: {'result': []},
//      id: 123,
//      in_progress: false,
//      texts: {""}
//      
//      };
//     this.handleDropdownChange = this.handleDropdownChange.bind(this);
//     this.handleInputDropdownChange = this.handleInputDropdownChange.bind(this);
//     this.onFileChange = this.onFileChange.bind(this); 
//     this.handleAdditionalInputChange = this.handleAdditionalInputChange.bind(this);
//   }
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   addStep() {
//   const currentStepNumber = this.state.currentStepNumber + 1;
//   this.setState({
//     stepNumbers: this.state.stepNumbers.concat(currentStepNumber),
//     currentStepNumber: currentStepNumber,
//     inputs: this.state.inputs.concat({'type': 'undefined'}),
//     additionalInputs: this.state.additionalInputs.concat({'type': 'undefined'})
//   })
//   }
//   
//   handleDropdownChange(e) {
//     const index = e.target.id;
//     const functions = this.state.functions;
//     functions[index] = e.target.value;
//     this.setState({ functions: functions });
//     let url = this.ip + ":8080/wake_up_gcp";
//     axios.get(url);
//   }
// 
//   handleInputDropdownChange(e) {
//     const index = e.target.id;
//     const inputs = this.state.inputs;
//     inputs[index]['name'] = e.target.value;
//     if (inputs[index]['name'] === 'file or directory') {
//       inputs[index]['type'] = 'file or directory'
//     }
//     if (inputs[index]['name'].includes('Output')) {
//       inputs[index]['type'] = 'Output';
//       inputs[index]['index'] = inputs[index]['name'].replace('Output ', '');
//       inputs[index]['index'] = parseInt(inputs[index]['index']) - 1;
//     }    
//     if (inputs[index]['name'] == 'Api input'){
//       inputs[index]['type'] = 'Api input';
//     }
//     this.setState({ inputs: inputs });
//   }
// 
//   onFileChange = event => { 
//       var inputs = this.state.inputs;
//       const index = event.target.id;
//       inputs[index]['file'] = event.target.files[0];
//       this.setState({ 
//       inputs: inputs});     
//     };
// 
//   handleAdditionalInputChange(e) {
//     const index = e.target.id;
//     var additionalInputs = this.state.additionalInputs;
//     const value = e.target.value;
//     additionalInputs[index] = {'type': 'text', 'text': value};
//     this.setState({additionalInputs: additionalInputs});
//   }
// 
// 
//   makeAdditionalInputs(index) {
//   console.log(this.state.functions[index])
//   let example_array = ["Find sentences with string", "Semantic search"];
//   console.log(example_array);
//   console.log(example_array.includes(this.state.functions[index]));
//   if(this.state.functions[index] == "Get sentences from CSV"){
//     return(<div className="l">Column name:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
//   }
//   if(this.state.functions[index] == "Entails"){
//     return(<div className="l">Hypothesis:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange}></input></div>)
//   }  
//   if(this.state.functions[index] == "Get sentences from url"){
//     return(<div className="l">Url:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
//   }  
//   if(this.state.functions[index] == "Ask question"){
//     return(<div className="l">Question:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange}></input></div>)
//   }  
//   if (example_array.includes(this.state.functions[index])){
//     return(<div className="l"><input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
//     } else {
//     return(<div className="k"></div>)
//   }
//   }
//   
//   showFileUploadButton(index) {
//   if (this.state.inputs[index]['type'] == 'file or directory'){
//   return(  <form className = "l">
//   <input type="file" id={index} onChange={this.onFileChange}></input>
//   </form>
//   )  
//   } else {
//   return (<div className="k"></div>)
//   }  
//   }
//   
//   makeInputDropdownMenu(thing) { 
//   return(
//          <div className="f">   <select name="input" id={thing} onChange={this.handleInputDropdownChange}>
//     <option value="Choose input">Choose input</option>
//     <option value="file or directory">Upload file or directory</option>
//     <option value="Output 1">Output 1</option>
//     <option value="Output 2">Output 2</option>
//     <option value="Api input">Api input</option>
//   </select>  
//        </div>      
//        )
//     } 
// 
//   async submitFile(index) {
//   const data = new FormData()
//   data.append('file', this.state.inputs[index]['file'])
//   let id = this.state.id;
//   let step = index;
//   let url = this.ip + ":8080/accept_file?id=" + id + "&step=" + index;
//   await axios.post(url, data);
//     
//   }
// 
//   async submitFiles() {
//     var i;
//     for (i = 0; i < this.state.inputs.length; i++) {
//       if(this.state.inputs[i].type == 'file or directory'){
//         await this.submitFile(i);
//       }
//     }
//   }
//  
//   async submitSteps() {
//     let data = {'state': this.state}
//     let url = this.ip + ":8080/accept_steps?id=" + this.state.id;
//        await axios.post(url, data).then((response) => {
//   console.log(response);
//   }, (error) => {
//   console.log(error);
//   });
//   }
//     
//   async submitRun() {
//   let url = this.ip + ":8080/run?id=" + this.state.id;
//   await axios.get(url).then(response => {this.setState({"r": response.data})}); 
//   }
//   
//   async submit() {
//   this.setState({"in_progress": true});
//   this.setState({"r": {'result': []}});
//   let x = await this.submitSteps();
//   console.log(x);
//   let y = await this.submitFiles();
//   console.log(y);
//   let z = await this.submitRun();
//   this.setState({"in_progress": false});
//   }
//   
// 
// 
// // use this as a template
//   render() {
//   
//   so you want to 
//   
//   
//   
//   
//   
//     const stepNumbers = this.state.stepNumbers;  
//     const steps = stepNumbers.map(thing => {
//       const outputName = 'output ' + (thing + 1); 
//       const index = thing;
//       const additionalInputs = this.makeAdditionalInputs(index);
//       const inputDropdownMenu = this.makeInputDropdownMenu(thing);
//       const fileUploadButton = this.showFileUploadButton(index);
//       var x = this.state.inputs[0]['type'];
//       return (
// <div className="h">
//        {inputDropdownMenu}
//        <div className="f">   <select name="functions" id={thing} onChange={this.handleDropdownChange}>
//     <option value="Choose function">Choose function</option>
//     <option value="Get sentences from CSV">Get sentences from CSV</option>
//     <option value="Semantic search">Semantic search</option>
//     <option value="Find relevant sentence">Find relevant sentence</option>
//     <option value="Word document to text file">Word document to text file</option>
//     <option value="Text file to sentences">Text file to sentences</option>
//     <option value="Find sentences with string">Find sentences with string</option>
//     <option value="Entails">Entails</option>
//     <option value="Get sentences from url">Get sentences from url</option>
//     <option value="Ask question">Ask question</option>
//     <option value="Make api link">Make api link</option>
//   </select>  
// 
//          <div className="p">{outputName}</div> 
// </div>
//        {fileUploadButton}
//        {additionalInputs}
// </div>
//       );
//     });
//     console.log(this.state.additionalInputs);
//     const resultList = this.state.r.result;
//     let resultHeader = '';
//     if(resultList.length > 0){
//       resultHeader = 'Result:'
//     }
//     let inProgressHeader = '';
//     if (this.state.in_progress){
//       inProgressHeader = "In progress";
//     }
//     const result = resultList.map(thing => {
//     return (
//     <div>{thing}</div>    
//     );
//     }
//     );
//     return (
// <div>
//     <div>
//      <button onClick={() => this.addStep()}>Add step</button>
//       {steps}
//       <button className="n" onClick={() => this.submit()}>Submit</button>
//       </div>
// <div className="i">
// <p>Click on the "Add step" button to add steps</p>
// </div>
// <p>{inProgressHeader}</p>
// <p>{resultHeader}</p>
// <div className="i">
// <p>{result}</p>
// </div>
// </div>
//     );
// 
// 
// 
// 
// 
// 
//   render() {
//   
//   
//   
//   
//   
//   
//   return (
// 
// // USE THIS PAGE TO BUILD IT
// // https://reactjs.org/docs/forms.html
// 
// <html>
// <head>
// <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
// </head>
// <body>
// 
// <h2>Tayo 1. Convergent cultural evolution as a mechanism to account for universal interjections is untenable</h2>
// <p>Supported by:</p>
// <button type="button" class="collapsible">Tayo 2. Nobody knows how frequent convergent evolution really is, but everybody agrees that it becomes statistically less likely the more independent descendants happen to "chance upon" the same feature. If all languages have "Huh?", assuming homoplasy (convergent evolution) is less parsimonious than assuming homology.
// </button>
// <div class="content">
//   <p>Supported by: </p>
// <button type="button" class="collapsible">Tayo 3. If we find more universal interjections, as was predicted in your paper and as I then did, convergent cultural evolution becomes even less likely. Not only statistically, but also because if we hypothesize the interactional environments to exert pressure such that interjections be "short" and "carry distinctive intonation", then why aren't the forms and functions of "Huh?" and "Oh." crossed in some language, as both interjections fulfill these requirements.</button>
// <div class="content">
// <p>Contradicted by:</p>
// <button type="button" class="collapsible">Mark 12. the idea is that oh and huh are unlikely to be 'crossed' precisely because their interactional environments aren't the same. If environments didn't matter, we would indeed expect them to be crossed all the time, which we haven't seen evidence for (so far). As I wrote, "the interactional environment in which these items occur may provide, for each of them, a distinct set of selective pressures–for minimality, salience, contrast, or other adaptive properties–that squeezes them into their most optimal shape​" (Dingemanse 2017).</button>
// <div class="content"></div>
// </div>    
//   <p>Contradicted by: </p>
// <button type="button" class="collapsible">Mark 9. This assumes a single evolutionary track whereas of course language is a biocultural hybrid.  Yes, it is less likely that many mammals independently evolved tails and much more likely that they now have one because their common ancestor had one. But cultural evolution crucially gives you dual inheritance. Essentially, the (faster evolving) cultural evolutionary track provides ways for innovation & diffusion (and convergence and divergence) in a way that is decoupled in important ways from the biological track (Dennett 1995, Richerson & Boyd 2005). And that is exactly what modelling work shows: strong cultural universals can easily evolve from social learning and cultural transmission and they don't imply nor require strong biological constraints (Thompson et al. 2016).</button>
// <div class="content">
// </div>  
// </div>
// <button type="button" class="collapsible">Tayo 4. The interactional environment doesn't crush an interjection into a "Huh?"-shaped diamond. This is evinced by the fact that most if not all languages use a language-specific form alongside the universal interjection: "What?", "Que?", "Shenme?", "Nani?", etc. </button>
// <div class="content">
// <p>Contradicted by:</p>
// <button type="button" class="collapsible">Mark 11. Your reading of the notion of 'cultural evolution' deviates somewhat from what most people have in mind. It just refers to the socially transmitted nature of lexical items, and it fully embraces the existence of a wide range of constraining and diversifying forces ('natural causes', Enfield 2014). You can take canoes as an example from material culture (Rogers & Ehrlich 2008): a culturally transmitted tool, independently invented a couple times across the globe, convergently shaped by the exigencies of its use (e.g., needing to float, being navigable), with room for cultural diversification (e.g. additional functions, ornaments). This analogy also offer a good answer to your worry about the flowering of question words besides 'huh?' (which, you'll note, all have a much wider array of functions). Of course there are also surf boards, catamarans, container ships, and ferries besides the humble canoe. That doesn't mean that the basic shape of the simplest seafaring vessel is not, in a deep sense, selected by the sea. It is this sense in which we can say that the basic shape of the simplest interactional words may be 'selected' by their interactional environment.</button>
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
// 
// 
// 
// </body>
// </html>
// 
// 
// 
// 
//     )
//   }
// }
// 
// 
// 
// // ========================================
// 
// ReactDOM.render(<Steps />, document.getElementById("root"));
// 
// 
// 
// 
// 
// 
// <script>
// var coll = document.getElementsByClassName("collapsible");
// var i;
// 
// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   });
// }
// </script>
// 
// 
