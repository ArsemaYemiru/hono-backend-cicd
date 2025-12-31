import { describe, it, expect } from 'vitest';
import { Hono } from 'hono';

describe('Health API', () => {
  it('returns status OK', async () => {
    const app = new Hono();
    app.get('/health', (c) => c.json({ status: 'OK' }));

    const res = await app.request('/health');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ status: 'OK' });
  });
});
