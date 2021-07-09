from flask import Flask, request, send_file
from flask_cors import CORS
from pathlib import Path
from werkzeug.utils import secure_filename
import requests

app = Flask(__name__)

CORS(app)

fake_db = {'cultural_evolution':

{
      "id": "tayo 1",
      "text": "Convergent cultural evolution as a mechanism to account for universal interjections is untenable",
      "links": [{
        "id": "tayo 2",
        "link_text": "supported by",
        "text": "Nobody knows how frequent convergent evolution really is, but everybody agrees that it becomes statistically less likely the more independent descendants happen to 'chance upon' the same feature. If all languages have 'Huh?', assuming homoplasy  or convergent evolution or is less parsimonious than assuming homology.",
        "links": [{
          "id": "tayo 3",
          "link_text": "supported by",
          "text": "If we find more universal interjections, as was predicted in your paper and as I then did, convergent cultural evolution becomes even less likely. Not only statistically, but also because if we hypothesize the interactional environments to exert pressure such that interjections be 'short' and 'carry distinctive intonation', then why aren't the forms and functions of 'Huh?' and 'Oh.' crossed in some language, as both interjections fulfill these requirements.",
          "links": [{'id': "mark 12", 'link text': 'contradicted by' , 'text': "the idea is that oh and huh are unlikely to be 'crossed' precisely because their interactional environments aren't the same. If environments didn't matter, we would indeed expect them to be crossed all the time, which we haven't seen evidence for (so far). As I wrote, 'the interactional environment in which these items occur may provide, for each of them, a distinct set of selective pressures–for minimality, salience, contrast, or other adaptive properties–that squeezes them into their most optimal shape​ (Dingemanse 2017).", 'links': []}]
          },
          {"id": "mark 9", "link_text": "contradicted by", "text": "This assumes a single evolutionary track whereas of course language is a biocultural hybrid.  Yes, it is less likely that many mammals independently evolved tails and much more likely that they now have one because their common ancestor had one. But cultural evolution crucially gives you dual inheritance. Essentially, the (faster evolving) cultural evolutionary track provides ways for innovation & diffusion (and convergence and divergence) in a way that is decoupled in important ways from the biological track (Dennett 1995, Richerson & Boyd 2005). And that is exactly what modelling work shows: strong cultural universals can easily evolve from social learning and cultural transmission and they don't imply nor require strong biological constraints (Thompson et al. 2016).", "links": []}       
          ],
        },
        {
        "id": "tayo 4",
        "link_text": "supported by",
        "text": "The interactional environment doesn't crush an interjection into a 'Huh?'-shaped diamond. This is evinced by the fact that most if not all languages use a language-specific form alongside the universal interjection: 'What?', 'Que?', 'Shenme?', 'Nani?', etc.",
        "links": [
        {"links": [], "id": "mark 11", "link_text": "contradicted by", "text": "Your reading of the notion of 'cultural evolution' deviates somewhat from what most people have in mind. It just refers to the socially transmitted nature of lexical items, and it fully embraces the existence of a wide range of constraining and diversifying forces ('natural causes', Enfield 2014). You can take canoes as an example from material culture (Rogers & Ehrlich 2008): a culturally transmitted tool, independently invented a couple times across the globe, convergently shaped by the exigencies of its use (e.g., needing to float, being navigable), with room for cultural diversification (e.g. additional functions, ornaments). This analogy also offer a good answer to your worry about the flowering of question words besides 'huh?' (which, you'll note, all have a much wider array of functions). Of course there are also surf boards, catamarans, container ships, and ferries besides the humble canoe. That doesn't mean that the basic shape of the simplest seafaring vessel is not, in a deep sense, selected by the sea. It is this sense in which we can say that the basic shape of the simplest interactional words may be 'selected' by their interactional environment."}     
        ]
        }
        ]
      }

}

@app.route('/update', methods=['POST'])
def run_path():
  content = request.json
  return 'fine'

@app.route('/get', methods=['GET'])
def get_path():
  page = request.args.get('page')
  response = fake_db[page]
  print(response)
  return {'result': response}


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)


