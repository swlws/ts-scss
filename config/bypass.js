const fs = require("fs");
const path = require("path");

const mapPath = path.resolve(__dirname, '../mock/map.cfg');
function getConfig() {
  let str = fs.readFileSync(mapPath, 'utf-8');
  try{
    if(str){
      return JSON.parse(str);
    }

    return null;
  }catch(e){
    console.error(`[Module: Mock] [Function: getConfig] [Error: ${e.toString()}]`)
    return null;
  }
}

function getResponsePath(method, url){
  let cfg = getConfig();
  if(!cfg){
    return null;
  }

  let file = cfg[`${method}-${url}`];
  if(!file){
    return null;
  }

  let dataPath = path.resolve(__dirname, '../mock/', file);

  return fs.readFileSync(dataPath, 'utf-8')
}

module.exports = getResponsePath
