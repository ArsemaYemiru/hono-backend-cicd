import { describe, it, expect } from 'vitest'
import app from '../src/index'

describe('Root Endpoint', () => {
    it('should return welcome message', async () => {
        const res = await app.request('/')
        expect(res.status).toBe(200)

        const body = await res.json()
        expect(body).toHaveProperty('message')
        expect(body.message).toContain('Welcome')
    })

    it('should return version information', async () => {
        const res = await app.request('/')
        const body = await res.json()

        expect(body).toHaveProperty('version')
        expect(body.version).toBe('1.0.0')
    })

    it('should list available endpoints', async () => {
        const res = await app.request('/')
        const body = await res.json()

        expect(body).toHaveProperty('endpoints')
        expect(body.endpoints).toHaveProperty('health')
        expect(body.endpoints).toHaveProperty('users')
        expect(body.endpoints).toHaveProperty('user')
        expect(body.endpoints).toHaveProperty('status')
    })
})

describe('Users API Endpoints', () => {
    describe('GET /api/users', () => {
        it('should return all users', async () => {
            const res = await app.request('/api/users')
            expect(res.status).toBe(200)

            const body = await res.json()
            expect(body).toHaveProperty('success')
            expect(body.success).toBe(true)
        })

        it('should return correct user count', async () => {
            const res = await app.request('/api/users')
            const body = await res.json()

            expect(body).toHaveProperty('count')
            expect(body.count).toBe(4)
        })

        it('should return user data array', async () => {
            const res = await app.request('/api/users')
            const body = await res.json()

            expect(body).toHaveProperty('data')
            expect(Array.isArray(body.data)).toBe(true)
            expect(body.data.length).toBe(4)
        })

        it('should return users with correct properties', async () => {
            const res = await app.request('/api/users')
            const body = await res.json()

            const user = body.data[0]
            expect(user).toHaveProperty('id')
            expect(user).toHaveProperty('name')
            expect(user).toHaveProperty('email')
            expect(user).toHaveProperty('role')
        })
    })

    describe('GET /api/users/:id', () => {
        it('should return user by valid ID', async () => {
            const res = await app.request('/api/users/1')
            expect(res.status).toBe(200)

            const body = await res.json()
            expect(body.success).toBe(true)
            expect(body.data).toHaveProperty('id')
            expect(body.data.id).toBe(1)
        })

        it('should return correct user details', async () => {
            const res = await app.request('/api/users/1')
            const body = await res.json()

            expect(body.data.name).toBe('Alice Johnson')
            expect(body.data.email).toBe('alice@example.com')
            expect(body.data.role).toBe('admin')
        })

        it('should return 404 for non-existent user', async () => {
            const res = await app.request('/api/users/999')
            expect(res.status).toBe(404)

            const body = await res.json()
            expect(body.success).toBe(false)
            expect(body).toHaveProperty('error')
            expect(body.error).toBe('User not found')
        })

        it('should return 400 for invalid user ID', async () => {
            const res = await app.request('/api/users/invalid')
            expect(res.status).toBe(400)

            const body = await res.json()
            expect(body.success).toBe(false)
            expect(body.error).toBe('Invalid user ID')
        })

        it('should handle negative IDs', async () => {
            const res = await app.request('/api/users/-1')
            expect(res.status).toBe(404)

            const body = await res.json()
            expect(body.success).toBe(false)
        })

        it('should handle zero as ID', async () => {
            const res = await app.request('/api/users/0')
            expect(res.status).toBe(404)
        })
    })
})

describe('Status Endpoint', () => {
    it('should return application status', async () => {
        const res = await app.request('/api/status')
        expect(res.status).toBe(200)

        const body = await res.json()
        expect(body).toHaveProperty('application')
        expect(body.application).toBe('Hono Backend CI/CD')
    })

    it('should return version information', async () => {
        const res = await app.request('/api/status')
        const body = await res.json()

        expect(body).toHaveProperty('version')
        expect(body.version).toBe('1.0.0')
    })

    it('should return environment information', async () => {
        const res = await app.request('/api/status')
        const body = await res.json()

        expect(body).toHaveProperty('environment')
        expect(body).toHaveProperty('nodeVersion')
        expect(body).toHaveProperty('platform')
    })

    it('should return memory usage information', async () => {
        const res = await app.request('/api/status')
        const body = await res.json()

        expect(body).toHaveProperty('memory')
        expect(body.memory).toHaveProperty('used')
        expect(body.memory).toHaveProperty('total')
        expect(typeof body.memory.used).toBe('number')
        expect(typeof body.memory.total).toBe('number')
    })

    it('should have valid memory values', async () => {
        const res = await app.request('/api/status')
        const body = await res.json()

        expect(body.memory.used).toBeGreaterThan(0)
        expect(body.memory.total).toBeGreaterThan(0)
        expect(body.memory.used).toBeLessThanOrEqual(body.memory.total)
    })
})

describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
        const res = await app.request('/non-existent-route')
        expect(res.status).toBe(404)
    })

    it('should handle malformed requests gracefully', async () => {
        const res = await app.request('/api/users/!@#$%')
        expect(res.status).toBe(400)
    })
})
