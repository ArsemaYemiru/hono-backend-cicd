import { describe, it, expect } from 'vitest'
import app from '../src/index'

describe('Integration Tests', () => {
    describe('Application Workflow', () => {
        it('should complete a full user lookup workflow', async () => {
            // Step 1: Check application is healthy
            const healthRes = await app.request('/health')
            expect(healthRes.status).toBe(200)

            // Step 2: Get all users
            const usersRes = await app.request('/api/users')
            expect(usersRes.status).toBe(200)
            const usersBody = await usersRes.json()
            expect(usersBody.data.length).toBeGreaterThan(0)

            // Step 3: Get specific user
            const userId = (usersBody.data[0] as { id: number }).id
            const userRes = await app.request(`/api/users/${userId}`)
            expect(userRes.status).toBe(200)
            const userBody = await userRes.json()
            expect(userBody.data.id).toBe(userId)
        })

        it('should handle error recovery workflow', async () => {
            // Try to get non-existent user
            const errorRes = await app.request('/api/users/999')
            expect(errorRes.status).toBe(404)

            // Verify system is still healthy
            const healthRes = await app.request('/health')
            expect(healthRes.status).toBe(200)

            // Verify we can still get valid users
            const validRes = await app.request('/api/users/1')
            expect(validRes.status).toBe(200)
        })
    })

    describe('Data Consistency', () => {
        it('should return consistent user data across endpoints', async () => {
            // Get all users
            const allUsersRes = await app.request('/api/users')
            const allUsersBody = await allUsersRes.json()
            const firstUser = allUsersBody.data[0]

            // Get the same user by ID
            const singleUserRes = await app.request(`/api/users/${firstUser.id}`)
            const singleUserBody = await singleUserRes.json()

            // Verify data consistency
            expect(singleUserBody.data).toEqual(firstUser)
        })

        it('should maintain correct user count', async () => {
            const res = await app.request('/api/users')
            const body = await res.json()

            expect(body.count).toBe(body.data.length)
        })
    })

    describe('API Response Format Consistency', () => {
        it('should return JSON for all endpoints', async () => {
            const endpoints = [
                '/',
                '/health',
                '/api/users',
                '/api/users/1',
                '/api/status'
            ]

            for (const endpoint of endpoints) {
                const res = await app.request(endpoint)
                expect(res.headers.get('content-type')).toContain('application/json')
            }
        })

        it('should include success field in API responses', async () => {
            const apiEndpoints = [
                '/api/users',
                '/api/users/1'
            ]

            for (const endpoint of apiEndpoints) {
                const res = await app.request(endpoint)
                const body = await res.json()
                expect(body).toHaveProperty('success')
            }
        })
    })

    describe('Performance Tests', () => {
        it('should handle multiple concurrent requests', async () => {
            const requests = Array(10).fill(null).map(() =>
                app.request('/health')
            )

            const responses = await Promise.all(requests)

            responses.forEach(res => {
                expect(res.status).toBe(200)
            })
        })

        it('should handle mixed endpoint requests', async () => {
            const requests = [
                app.request('/'),
                app.request('/health'),
                app.request('/api/users'),
                app.request('/api/users/1'),
                app.request('/api/status')
            ]

            const responses = await Promise.all(requests)

            responses.forEach(res => {
                expect(res.status).toBe(200)
            })
        })
    })

    describe('User Role Verification', () => {
        it('should have users with different roles', async () => {
            const res = await app.request('/api/users')
            const body = await res.json()

            const roles = body.data.map((user: { role: string }) => user.role)
            const uniqueRoles = [...new Set(roles)]

            expect(uniqueRoles.length).toBeGreaterThan(1)
            expect(uniqueRoles).toContain('admin')
            expect(uniqueRoles).toContain('user')
        })

        it('should find admin user', async () => {
            const res = await app.request('/api/users')
            const body = await res.json()

            const adminUser = body.data.find((user: { role: string, name: string }) => user.role === 'admin')
            expect(adminUser).toBeDefined()
            expect(adminUser?.name).toBe('Alice Johnson')
        })
    })

    describe('Email Validation', () => {
        it('should have valid email format for all users', async () => {
            const res = await app.request('/api/users')
            const body = await res.json()

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            body.data.forEach((user: { email: string }) => {
                expect(user.email).toMatch(emailRegex)
            })
        })
    })
})
