const fs = require("fs");
const path = require("path");

function readFile(method, url) {
  url = url.split("?")[0];
  url = url.replace(/\//g, "-");

  let filePath = path.resolve(
    __dirname,
    "../mock/",
    `${method.toLowerCase()}${url}.json`
  );

  if (!fs.existsSync(filePath)) return null;

  return fs.readFileSync(filePath, "utf-8");
}

module.exports = readFile;
