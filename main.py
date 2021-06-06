from flask import Flask, render_template

app = Flask(__name__)

@app.route('/tayo1/')
def tayo1_path(name=None):
  return render_template('1.html')

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)


