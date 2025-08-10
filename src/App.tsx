import { useState } from 'react'
import Counter from './components/Counter'
import TodoList from './components/TodoList'
import UserCard from './components/UserCard'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('counter')

  const tabs = [
    { id: 'counter', label: 'Counter', component: <Counter /> },
    { id: 'todos', label: 'Todo List', component: <TodoList /> },
    { id: 'user', label: 'User Card', component: <UserCard /> }
  ]

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Tangent Test</h1>
        <p>A playground for React components</p>
      </header>

      <nav className="tab-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </main>

      <footer className="app-footer">
        <p>Built with React + TypeScript + Vite</p>
      </footer>
    </div>
  )
}

export default App
