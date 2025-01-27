from flask import Flask , render_template , url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE-URI'] = 'sqlite:///test.db'
db=SQLAlchemy(app)

class ToDo(db.Model):
    id = db.column(db.Integer, primary_key=True)
    content=db.column(db.string(150), nullable=False)
    date_Created=db.column(db.DateTime, default=datetime.now())

    def __repr__(self):
        return '<Task %r>' % self.id
     
@app.route('/')
def index():
    return render_template('index.html')

if __name__=='__main__':
     app.run(debug=True)