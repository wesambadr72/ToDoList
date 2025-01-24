from flask import Flask

app=Flask(__name__)

@app.route('/')
def home():
    return "Hi i'm Wesam \nWow Great! It's working"

if __name__=='__main__':
     app.run(debug=True)