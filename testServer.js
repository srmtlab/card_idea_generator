var http = require('http');
var server = http.createServer();
const fs = require('fs');
const path = require('path');

//  ファイル一覧を取得
function printAllFiles(dir) {
  const filenames = fs.readdirSync(dir);
  var cards_list = []
  filenames.forEach((filename) => {
    var cards_json = {}
    const fullPath = path.join(dir, filename);
    const stats = fs.statSync(fullPath);
    if (stats.isFile()) {
      cards_json.url = fullPath
      cards_list.push(cards_json)
    } else if (stats.isDirectory()) {
      printAllFiles(fullPath);
    }
  });
  return cards_list
}

server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type' : 'application/json'});
    const dire = './img';
    console.log(res)
    res.end();
});

server.listen(3000);
