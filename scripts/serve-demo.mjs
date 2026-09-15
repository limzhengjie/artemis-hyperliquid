import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
const port = Number(process.env.DEMO_PORT || 4348)
createServer((request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname
  if (!['/', '/index.html', '/observations.json'].includes(path)) {
    response.writeHead(404)
    response.end('Not found')
    return
  }
  try {
    const filename =
      path === '/observations.json' ? 'observations.json' : 'index.html'
    const data = readFileSync(
      new URL('../demo-dist/' + filename, import.meta.url)
    )
    response.writeHead(200, {
      'Content-Type': filename.endsWith('.json')
        ? 'application/json'
        : 'text/html; charset=utf-8',
      'Cache-Control': 'no-store'
    })
    response.end(data)
  } catch {
    response.writeHead(503)
    response.end('Run npm run demo first')
  }
}).listen(port, '127.0.0.1', () =>
  console.log(`Offline demo: http://127.0.0.1:${port}`)
)
