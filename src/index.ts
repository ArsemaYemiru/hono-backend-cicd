import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// Enable CORS for frontend connection
app.use('*', cors());

// Sample user data
interface User {
  id: number
  name: string
  email: string
  role: string
}

const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'moderator' }
]

// Root endpoint
app.get('/', (c) => {
  return c.json({
    message: 'Welcome to Hono Backend CI/CD Project',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/api/users',
      user: '/api/users/:id',
      status: '/api/status'
    }
  })
})

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Get all users
app.get('/api/users', (c) => {
  return c.json({
    success: true,
    count: users.length,
    data: users
  })
})

// Get user by ID
app.get('/api/users/:id', (c) => {
  const id = parseInt(c.req.param('id'))

  if (isNaN(id)) {
    return c.json({
      success: false,
      error: 'Invalid user ID'
    }, 400)
  }

  const user = users.find(u => u.id === id)

  if (!user) {
    return c.json({
      success: false,
      error: 'User not found'
    }, 404)
  }

  return c.json({
    success: true,
    data: user
  })
})

// Application status endpoint
app.get('/api/status', (c) => {
  return c.json({
    application: 'Hono Backend CI/CD',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    platform: process.platform,
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
    }
  })
})

export default app;