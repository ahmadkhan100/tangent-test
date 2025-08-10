import { useState } from 'react'
import './TodoList.css'

interface Todo {
  id: number
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React Hooks', completed: true, priority: 'high' },
    { id: 2, text: 'Build a todo app', completed: false, priority: 'medium' },
    { id: 3, text: 'Master TypeScript', completed: false, priority: 'high' },
  ])
  const [newTodo, setNewTodo] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        priority
      }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  }

  return (
    <div className="todo-container">
      <div className="todo-card">
        <h2>📝 Todo List</h2>
        
        <div className="todo-stats">
          <span>Total: {stats.total}</span>
          <span>Active: {stats.active}</span>
          <span>Completed: {stats.completed}</span>
        </div>

        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={addTodo} className="btn btn-primary">Add</button>
        </div>

        <div className="todo-filters">
          {(['all', 'active', 'completed'] as const).map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`filter-btn ${filter === filterType ? 'active' : ''}`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        <div className="todo-list">
          {filteredTodos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <span className={`priority priority-${todo.priority}`}>
                {todo.priority}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-btn"
              >
                ✕
              </button>
            </div>
          ))}
          {filteredTodos.length === 0 && (
            <div className="empty-state">
              {filter === 'all' ? 'No todos yet!' : `No ${filter} todos!`}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoList
