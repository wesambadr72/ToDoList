from flask import Flask , render_template , url_for , request , redirect
from flask_pymongo import PyMongo
from datetime import datetime
from bson.objectid import ObjectId

app=Flask(__name__)
#Create a database connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/Learn"
db=PyMongo(app).db
     
@app.route('/', methods=['POST','GET'])
def index():
    Task_collection = db.Tasks
    if request.method == 'POST':
        task_content = request.form['content']
        new_task ={'content':task_content ,'date_Created':datetime.now(), 'completed':False}

        try:
            Task_collection.insert_one(new_task)
            return redirect('/')
        except:
            return 'Error occurred while inserting task'
    else:
        tasks = Task_collection.find(sort=[('date_Created',-1)])
        return render_template('index.html',tasks = tasks)


@app.route('/delete/<id>')
def delete(id):
    Task_collection = db.Tasks
    try:
        Task_collection.delete_one({'_id':ObjectId(id)})
        return redirect('/')
    except: 
        return 'Error occurred while deleting task'
    
@app.route('/mark_completed/<id>', methods=['POST'])
def mark_completed(id):
    Task_collection = db.Tasks
    task= Task_collection.find_one({'_id': ObjectId(id)})
    new_status = not task.get('completed', False)
    try:
        Task_collection.update_one({'_id': ObjectId(id)}, {'$set':{'completed':new_status}})
        if new_status:
            Task_collection.delete_one({'_id': ObjectId(id)})
        return redirect('/')
    except:
        return 'Error occurred while marking task as completed'

@app.route('/update/<id>' , methods=["POST", "GET"])
def update(id):
    task_collection = db.Tasks
    if request.method == 'POST':
        updated_content = request.form['content']
        # Update the task in the database
        try:
            task_collection.update_one({'_id':ObjectId(id)},{'$set':{'content':updated_content}})
            return redirect('/')
        except:
            return 'Error occurred while updating task'
    else:
        task=task_collection.find_one({'_id':ObjectId(id)})
        return render_template('update.html',task=task)
        


    

if __name__=='__main__':
     app.run(debug=True)