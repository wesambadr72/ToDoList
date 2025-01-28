from flask import Flask , render_template , url_for , request , redirect
from flask_pymongo import PyMongo
from datetime import datetime

app=Flask(__name__)
#Create a database connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/Learn"
db=PyMongo(app).db
     
@app.route('/', methods=['POST','GET'])
def index():
    Task_collection = db.Tasks
    if request.method == 'POST':
        task_content = request.form['content']
        new_task ={'content':task_content ,'date_Created':datetime.now()}

        try:
            Task_collection.insert_one(new_task)
            return redirect('/')
        except:
            return 'Error occurred while inserting task'
    else:
        tasks = Task_collection.find(sort=[('date_Created',-1)])
        return render_template('index.html',tasks = tasks)
        
    
    

if __name__=='__main__':
     app.run(debug=True)