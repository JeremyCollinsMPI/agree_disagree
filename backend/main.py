from flask import Flask, request, send_file
from flask_cors import CORS
from pathlib import Path
from werkzeug.utils import secure_filename
import requests
import json
from copy import deepcopy
import os
from copy_node_functions import ExpandAnyCopyNodes, get_data

app = Flask(__name__)

CORS(app)



def add_number_of_open_disputes(context):
  node = context['node']
  if node.get('links', []) == []:
    number_of_open_disputes = 0
    modified_node = {**node, **{'number_of_open_disputes': number_of_open_disputes}}
    return {'result': modified_node, 'number_of_open_disputes': 0, 'open': True}
  else:
    number_of_open_disputes = 0
    open = True
    for i in range(len(node.get('links'))):
      link = node.get('links')[i]
      add_number_of_open_disputes_result = add_number_of_open_disputes({'node': link})
      modified_link = add_number_of_open_disputes_result['result']
      link_open_disputes = add_number_of_open_disputes_result['number_of_open_disputes']
      link_open = add_number_of_open_disputes_result['open']
      if link['link_text'].lower() in ['contradicted by', 'relationship disputed by', 'closes']:
        if link_open:
          open = False
          if not link['link_text'].lower() == 'closes':
              number_of_open_disputes = number_of_open_disputes + 1
      elif link['link_text'].lower() in ['supported by', 'source']:
        number_of_open_disputes = number_of_open_disputes + link_open_disputes
      node['links'][i] = modified_link
    modified_node = {**node, **{'number_of_open_disputes': number_of_open_disputes}}
  return {'result': modified_node, 'number_of_open_disputes': number_of_open_disputes,'open': open}
  
def update_recursively(to_update, id, value, link_text):
  if to_update['id'] == id:
    new_id = id + '_' + str(len(to_update['links']) + 1)
    to_update['links'].append({'id': new_id, "link_text": link_text, "text": value, "links": []})
  else:
    for link in to_update['links']:
      update_recursively(link, id, value, link_text)

def update_page(context):
  page =context['page']
  to_update = get_data({'page': page})['result']
  update_recursively(to_update, context['id'], context['value'], context['relationship'])
  return {'result': to_update}  
  
def delete_node_recursively(context):
  to_update = context['to_update']
  id = context['id']
  mother = context['mother']
  if to_update['id'] == id:
    mother['links'].remove(to_update)
  else:
    for link in to_update['links']:
      delete_node_recursively({'to_update': link, 'id': id, 'mother': to_update})

def edit_node_recursively(context):
  to_update = context['to_update']
  id = context['id']
  mother = context['mother']
  if to_update['id'] == id:
      to_update['text'] = context['new_text']
      to_update['link_text'] = context['relationship']
  else:
    for link in to_update['links']:
      edit_node_recursively({'to_update': link, 'id': id, 'mother': to_update, 'new_text': context['new_text'],
          'relationship': context['relationship']})
  
def delete_node(context):
  page = context['page']
  id = context['id']
  to_update = get_data({'page': page})['result']
  print(to_update)
  delete_node_recursively({'to_update': to_update, 'id': id, 'mother': to_update})
  return {'result': to_update}

def edit_node(context):
  page = context['page']
  id = context['id']
  to_update = get_data({'page': page})['result']
  print(to_update)
  edit_node_recursively(context | {'to_update': to_update, 'id': id, 'mother': to_update})
  return {'result': to_update}

def expand_any_copy_nodes(context):
  data = context['result']
  converter = ExpandAnyCopyNodes(data=data)
  converter.run()
  data = converter.data
  return {'result': data}

@app.route('/update', methods=['POST'])
def run_path():
  content = request.json
  print('****')
  print(content)
  page = request.args.get('page')
  update_page_context = {'page': page, 'id': content['id'], 'value': content['value'], 'relationship': content['relationship']}
  update_page_result = update_page(update_page_context)
  json.dump(update_page_result['result'], open('data/' + page + '.json', 'w'), indent=4)
  return 'fine'

@app.route('/delete', methods=['POST'])
def delete_path():
  content = request.json
  page = request.args.get('page')
  id = request.args.get('id')
  print(page)
  print(id)
  delete_node_context = {'id': id, 'page': page}
  delete_node_result = delete_node(delete_node_context)
  json.dump(delete_node_result['result'], open('data/' + page + '.json', 'w'), indent=4)
  return 'fine'

@app.route('/edit', methods=['POST'])
def edit_path():
  content = request.json
  page = request.args.get('page')
  id = request.args.get('id')
  value = content.get('value')
  relationship = content.get('relationship')
  edit_node_context = {'id': id, 'page': page, 'new_text': value, 'relationship': relationship}
  edit_node_result = edit_node(edit_node_context)
  json.dump(edit_node_result['result'], open('data/' + page + '.json', 'w'), indent=4)
  return 'fine'

@app.route('/get', methods=['GET'])
def get_path():
  page = request.args.get('page')
  get_data_result = get_data({'page': page})
  expand_any_copy_nodes_result = expand_any_copy_nodes(get_data_result)
  result = add_number_of_open_disputes({'node': expand_any_copy_nodes_result['result']})['result']
  if not get_data_result['result'] == None:
    return {'result': result}
  else:
    return {'result': 'Page Not Found'}

@app.route('/pages', methods=['GET'])
def pages_path():
  files = os.listdir('data')
  files = [x for x in files if '.json' in x]
  result = []
  to_exclude = ['norp']
  for file in files:
    page = file.replace('.json', '')
    get_data_result = get_data({'page': page})
    headline = get_data_result['result']['text']
    if not headline in to_exclude:
      result.append({'text': headline, 'page': page})
  return {'result': result}

@app.route('/add_new_page', methods=['POST'])
def add_new_page_path():
  files = os.listdir('data')
  files = [x for x in files if '.json' in x]
  content = request.json
  new_page_input = content.get('new_page_input')
  print(new_page_input)
  to_write = {
   "id":"none",
   "text": new_page_input,
   "links":[]
  }
  filename = new_page_input.replace(' ', '_') + '.json'
  print(filename)
  if not filename in files:
    json.dump(to_write, open('data/' + filename, 'w'))
    print('success')
    return {'result': 'success'}
  else:
    print('fail')
    return {'result': 'failed'}
  


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)


