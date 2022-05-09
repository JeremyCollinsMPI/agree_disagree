import json

def get_data(context):
  page = context['page']
  try:
    return {'result': json.load(open('data/' + page + '.json', 'r'))}
  except:
    return {'result': None}

def traverse_page_data(context):
    page_data = context['page_data']
    id = context['id']
    current_id = page_data['id']
    links = page_data['links']
    result = None
    for link in links:
        if link['id'] == id:
            return {'result': link}
        elif link['id'] + '_' in id:
            result = traverse_page_data({'page_data': link, 'id': id})['result']
    return {'result': result}

def find_node(context):
    '''
    structure will be @ + name of the page + '&id=' + id
    the way to find it is to use get_data to return the data for the page name, then traverse it looking for the id
    '''
    node_full_id = context['node_full_id']
    page_name = node_full_id.split('&id=')[0].replace('@', '')
    page_data = get_data({'page': page_name})['result']
    id = node_full_id.split('&id=')[1]
    traverse_page_data_result = traverse_page_data({'page_data': page_data, 'id': id})
    return traverse_page_data_result


class ExpandAnyCopyNodes:
    def __init__(self, data=None):
        self.data = data
    
    def link_is_a_copy_node(self, link):
        if link['text'][0] == '@' and '&id=' in link['text']:
            return True
        else:
            return False
    
    def find_content_for_copy_node(self, link):
        node_full_id = link['text']
        page_name = node_full_id.split('&id=')[0].replace('@', '')
        page_data = get_data({'page': page_name})['result']
        id = node_full_id.split('&id=')[1]
        traverse_page_data_result = traverse_page_data({'page_data': page_data, 'id': id})
        return traverse_page_data_result
    
    def handle_any_additional_copy_node_links(self, link, content):
        links = link['links']
        content['links'] = content['links'] + links
        return content
        
    def update_recursively(self, data_currently_expanding):
        for i in range(len(data_currently_expanding['links'])):
            link = data_currently_expanding['links'][i]
            if self.link_is_a_copy_node(link):
                print(link)
                content = self.find_content_for_copy_node(link)['result']
                content = self.handle_any_additional_copy_node_links(link, content)
                data_currently_expanding['links'][i] = content
            else:
                data_currently_expanding['links'][i] = self.update_recursively(link)
        return data_currently_expanding

    def run(self):
        data_currently_expanding = self.data
        self.data = self.update_recursively(data_currently_expanding)
