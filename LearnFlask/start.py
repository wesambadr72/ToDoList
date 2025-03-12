from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from datetime import datetime
from bson.objectid import ObjectId

app = Flask(__name__)

# connect to frontend
CORS(app)

# connect to database
app.config["MONGO_URI"] = "mongodb://localhost:27017/Learn"
db = PyMongo(app).db

# show all tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = list(db.Tasks.find({}, {"_id": 1, "content": 1, "completed": 1, "date_Created": 1}))
    for task in tasks:
        task["_id"] = str(task["_id"])  # convert ObjectId to string
    return jsonify(tasks)

# add a new task
@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    new_task = {
        "content": data["content"],
        "date_Created": datetime.now(),
        "completed": False
    }
    task_id = db.Tasks.insert_one(new_task).inserted_id
    new_task["_id"] = str(task_id)
    return jsonify(new_task), 201

# update task
@app.route('/tasks/<id>', methods=['PUT'])
def update_task(id):
    data = request.json
    db.Tasks.update_one({"_id": ObjectId(id)}, {"$set": {"content": data["content"]}})
    return jsonify({"message": "Task updated"})

# delete a task
@app.route('/tasks/<id>', methods=['DELETE'])
def delete_task(id):
    db.Tasks.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Task deleted"})

# toggle task completion
@app.route('/tasks/<id>/complete', methods=['PUT'])
def toggle_complete(id):
    task = db.Tasks.find_one({"_id": ObjectId(id)})
    if task:
        new_status = not task["completed"]
        db.Tasks.update_one({"_id": ObjectId(id)}, {"$set": {"completed": new_status}})
        return jsonify({"message": "Task status updated"})
    return jsonify({"error": "Task not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
