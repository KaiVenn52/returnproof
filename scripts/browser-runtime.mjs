import {createRequire} from 'node:module';
import {homedir} from 'node:os';
import {join} from 'node:path';
const require=createRequire(import.meta.url);
export function loadPlaywright(){
 if(process.env.PLAYWRIGHT_MODULE)return require(process.env.PLAYWRIGHT_MODULE);
 try{return require('playwright');}
 catch{return require(join(homedir(),'.cache','codex-runtimes','codex-primary-runtime','dependencies','node','node_modules','playwright'));}
}
