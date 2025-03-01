"use client"

import { useState, useEffect, SetStateAction } from "react"
import { Pencil, Trash2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useTheme } from "next-themes"
import Logo from "@/components/logo"
import Copyright from "@/components/copyright"

const API_URL = "http://127.0.0.1:5000/tasks"

export default function TodoList() {
  const [tasks, setTasks] = useState<{ _id: string; content: string; completed: boolean; date_Created: string }[]>([])
  const [newTask, setNewTask] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
  }, [])

  const addTask = () => {
    if (!newTask.trim()) return
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newTask }),
    })
      .then((res) => res.json())
      .then((task) => {
        setTasks([...tasks, task])
        setNewTask("")
      })
  }

  const deleteTask = (id: string) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() =>
      setTasks(tasks.filter((task) => task._id !== id))
    )
  }

  const startEditing = (id: string) => {
    setEditingId(id)
    const task = tasks.find((t) => t._id === id)
    if (task) setNewTask(task.content)
  }

  const updateTask = () => {
    if (!editingId || !newTask.trim()) return
    fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newTask }),
    }).then(() => {
      setTasks(tasks.map((task) => (task._id === editingId ? { ...task, content: newTask } : task)))
      setEditingId(null)
      setNewTask("")
    })
  }

  const toggleComplete = (id: string) => {
    fetch(`${API_URL}/${id}/complete`, { method: "PUT" }).then(() => {
      setTasks(tasks.map((task) => (task._id === id ? { ...task, completed: !task.completed } : task)))
    })
  }

  return (
    <div className={`min-h-screen flex flex-col items-center pt-12 px-4 ${theme === "dark" ? "gradient-dark" : "gradient-light"}`}>
      <Logo /> {/* Logo component */}
      
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">To-Do List</h1>

      <div className="w-full max-w-md bg-card text-card-foreground rounded-lg shadow-lg p-6">
        {tasks.map((task) => (
          <div key={task._id} className={`flex flex-col bg-background rounded-md p-3 mb-3 transition-all duration-300 ${task.completed ? "opacity-60" : ""}`}>
            <div className="flex items-center gap-3">
              <Checkbox checked={task.completed} onCheckedChange={() => toggleComplete(task._id)} className="h-5 w-5" />
              <span className={`text-lg flex-grow ${task.completed ? "line-through" : ""}`}>{task.content}</span>
              <div className="flex gap-2">
                <Button className="variant-ghost size-icon" onClick={() => startEditing(task._id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button className="variant-ghost size-icon" onClick={() => deleteTask(task._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(task.date_Created).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}{" "}
                {new Date(task.date_Created).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        <div className="mt-4">
          <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Task..." className="mb-3"
            onKeyPress={(e) => e.key === "Enter" && (editingId ? updateTask() : addTask())} />
          <Button onClick={editingId ? updateTask : addTask} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
            {editingId ? "UPDATE" : "DO IT!"}
          </Button>
        </div>
      </div>

      <Copyright /> {/*Copyright component */}
    </div>
  )
}
