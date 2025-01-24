from flask import Flask

app=Flask(__name__)

@app.route('/')
def home():
    return "Wow Great! It's working"

if __name__=='__main__':
    app.run(debug=True)