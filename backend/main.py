from flask import Flask, request, send_file
from flask_cors import CORS
from pathlib import Path
from werkzeug.utils import secure_filename
import requests
import json
from copy import deepcopy

app = Flask(__name__)

CORS(app)

def get_data(context):
  page = context['page']
  try:
    return {'result': json.load(open('data/' + page + '.json', 'r'))}
  except:
    return {'result': None}

def update_recursively(to_update, id, value):
  if to_update['id'] == id:
    to_update['links'].append({'id': '***', "link_text": "misc", "text": value, "links": []})
  else:
    for link in to_update['links']:
      update_recursively(link, id, value)

def update_page(context):
  page =context['page']
  to_update = get_data({'page': page})['result']
  update_recursively(to_update, context['id'], context['value'])
  return {'result': to_update}  

@app.route('/update', methods=['POST'])
def run_path():
  content = request.json
  page = request.args.get('page')
  update_page_context = {'page': page, 'id': content['id'], 'value': content['value']}
  update_page_result = update_page(update_page_context)
  json.dump(update_page_result['result'], open('data/' + page + '.json', 'w'), indent=4)
  return 'fine'

@app.route('/get', methods=['GET'])
def get_path():
  page = request.args.get('page')
  get_data_result = get_data({'page': page})
  if not get_data_result['result'] == None:
    return {'result': get_data_result['result']}
  else:
    return {'result': 'Page Not Found'}

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)


