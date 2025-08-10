import { useState, useEffect } from 'react'
import './UserCard.css'

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
  }
  address: {
    street: string
    city: string
    zipcode: string
  }
}

const UserCard = () => {
  const [users, setUsers] = useState<User[]>([])
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const userData = await response.json()
      setUsers(userData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const nextUser = () => {
    setCurrentUserIndex(prev => (prev + 1) % users.length)
  }

  const prevUser = () => {
    setCurrentUserIndex(prev => (prev - 1 + users.length) % users.length)
  }

  const randomUser = () => {
    const randomIndex = Math.floor(Math.random() * users.length)
    setCurrentUserIndex(randomIndex)
  }

  if (loading) {
    return (
      <div className="user-container">
        <div className="user-card">
          <div className="loading">Loading users... 🔄</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="user-container">
        <div className="user-card">
          <div className="error">
            <p>❌ {error}</p>
            <button onClick={fetchUsers} className="btn btn-primary">
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="user-container">
        <div className="user-card">
          <div className="empty">No users found</div>
        </div>
      </div>
    )
  }

  const currentUser = users[currentUserIndex]

  return (
    <div className="user-container">
      <div className="user-card">
        <h2>👤 User Profile</h2>
        
        <div className="user-avatar">
          <div className="avatar-circle">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>

        <div className="user-info">
          <h3>{currentUser.name}</h3>
          <p className="username">@{currentUser.username}</p>
          
          <div className="user-details">
            <div className="detail-item">
              <span className="label">📧 Email:</span>
              <span className="value">{currentUser.email}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">📱 Phone:</span>
              <span className="value">{currentUser.phone}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">🌐 Website:</span>
              <span className="value">{currentUser.website}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">🏢 Company:</span>
              <span className="value">{currentUser.company.name}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">💡 Motto:</span>
              <span className="value">"{currentUser.company.catchPhrase}"</span>
            </div>
            
            <div className="detail-item">
              <span className="label">📍 Address:</span>
              <span className="value">
                {currentUser.address.street}, {currentUser.address.city} {currentUser.address.zipcode}
              </span>
            </div>
          </div>
        </div>

        <div className="user-controls">
          <button onClick={prevUser} className="btn btn-secondary">
            ← Previous
          </button>
          <button onClick={randomUser} className="btn btn-primary">
            🎲 Random
          </button>
          <button onClick={nextUser} className="btn btn-secondary">
            Next →
          </button>
        </div>

        <div className="user-counter">
          User {currentUserIndex + 1} of {users.length}
        </div>
      </div>
    </div>
  )
}

export default UserCard
