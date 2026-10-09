import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.argv.includes('--dist') ? 'dist' : '.');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.otf':'font/otf','.gif':'image/gif','.pdf':'application/pdf','.mp3':'audio/mpeg','.ogg':'audio/ogg'};
const server = http.createServer(async (req,res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.includes('..')) { res.writeHead(403).end(); return; }
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    if (!process.argv.includes('--dist') && !extname(pathname)) file = resolve(root,'index.html');
    else if (!process.argv.includes('--dist') && !['.js','.css','.html'].includes(extname(pathname))) file = resolve(root,'public','.' + pathname);
    try { if ((await stat(file)).isDirectory()) file = resolve(file,'index.html'); }
    catch { if (!extname(pathname)) file = resolve(root,'index.html'); else throw new Error('Not found'); }
    res.writeHead(200, {'Content-Type':types[extname(file)] || 'application/octet-stream','Cache-Control':'no-cache'});
    res.end(await readFile(file));
  } catch { res.writeHead(404).end('Not found'); }
});
server.listen(Number(process.env.PORT || 5173), '127.0.0.1', () => console.log('Portfolio ready at http://localhost:' + (process.env.PORT || 5173)));
