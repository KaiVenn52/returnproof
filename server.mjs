import http from 'node:http';
import {readFile} from 'node:fs/promises';
const files={'/':'index.html','/src/app.mjs':'src/app.mjs','/src/domain.mjs':'src/domain.mjs','/src/exports.mjs':'src/exports.mjs','/src/styles.css':'src/styles.css'};
const types={html:'text/html; charset=utf-8',mjs:'text/javascript; charset=utf-8',css:'text/css; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
  const path=new URL(req.url,'http://localhost').pathname;
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  if(path==='/favicon.ico'){res.writeHead(204);res.end();return;}
  if(!files[path]){res.writeHead(404);res.end('Not found');return;}
  try{const body=await readFile(new URL(files[path],import.meta.url));res.writeHead(200,{'Content-Type':types[files[path].split('.').pop()],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"});res.end(req.method==='HEAD'?undefined:body);}catch{res.writeHead(500);res.end('Asset unavailable');}
});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?'ReturnProof could not start: this port is occupied. Leave the other process running and set PORT to an unused port.':error.message);process.exitCode=1;});
server.listen(Number(process.env.PORT||43178),'127.0.0.1',()=>console.log('ReturnProof: http://127.0.0.1:'+(process.env.PORT||43178)));
