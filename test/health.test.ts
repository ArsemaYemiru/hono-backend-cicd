import { describe, it, expect } from 'vitest'
import app from '../src/index'

describe('Health Check Endpoint', () => {
  it('should return status OK', async () => {
    const res = await app.request('/health')
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body).toHaveProperty('status')
    expect(body.status).toBe('OK')
  })

  it('should return timestamp in ISO format', async () => {
    const res = await app.request('/health')
    const body = await res.json()

    expect(body).toHaveProperty('timestamp')
    expect(body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
  })

  it('should return uptime as a number', async () => {
    const res = await app.request('/health')
    const body = await res.json()

    expect(body).toHaveProperty('uptime')
    expect(typeof body.uptime).toBe('number')
    expect(body.uptime).toBeGreaterThanOrEqual(0)
  })

  it('should have correct response headers', async () => {
    const res = await app.request('/health')
    expect(res.headers.get('content-type')).toContain('application/json')
  })

  it('should respond quickly (performance test)', async () => {
    const startTime = Date.now()
    await app.request('/health')
    const endTime = Date.now()

    const responseTime = endTime - startTime
    expect(responseTime).toBeLessThan(100) // Should respond in less than 100ms
  })
})

