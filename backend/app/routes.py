from flask import Blueprint, jsonify, request

bp = Blueprint('routes', __name__)

# Dummy data for nodes
NODES = {
    1: [
        {"id": 2, "text": "This is a supporting statement.", "upVotes": 12, "downVotes": 3, "parentId": 1},
        {"id": 3, "text": "Another supporting statement.", "upVotes": 8, "downVotes": 2, "parentId": 1},
    ],
    2: [
        {"id": 4, "text": "This supports statement 2.", "upVotes": 5, "downVotes": 1, "parentId": 2},
    ],
}

@bp.route('/api/supporting-statements', methods=['GET'])
def get_supporting_statements():
    node_id = request.args.get('nodeId', type=int)
    if not node_id or node_id not in NODES:
        return jsonify([])  # Return an empty list if no data is found
    return jsonify(NODES[node_id])
