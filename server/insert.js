var http = require('http');
var server = http.createServer();
var request = require('request');
const fs = require('fs');
const path = require('path');
const conf = require('./conf');


server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type' : 'application/json'});
    insertTriple("http://lod.test/resource/hoge", "http://lod.test/ontology/hasFuga", "foobar", "http://testgraph.jp");
    console.log("url: "+conf.endpoint.url);
    //console.log(res)
    res.end();
});

server.listen(conf.api.port);


// VirtuosoにRDF tripleをinsert
function insertTriple(subject, predicate, object, graph) {
    subject = wrap(subject);
    predicate = wrap(predicate);
    object = wrap(object);
    var sparql = "insert data into <"+graph+"> {";
    sparql += subject + " " + predicate + " " + object + ".}";
    console.log(sparql);
    var headers = {
	"Content-Type": "application/sparql-query",
	"Accept": "text/html,application/sparql-results+json"
    };
    var options = {
	url: conf.endpoint.url,
	method: 'GET',
	json: true,
	headers: headers,
	auth: {
	    user: conf.endpoint.user,
	    password: conf.endpoint.password
	},
	form: {
	    "default-graph-uri": graph,
	    "query": sparql,
	    "format":"application/sparql-results+json",
	    "timeout": 0,
	    "debug": "on"
	}
    };
    console.log("user: "+options.auth.user);
    console.log("pass: "+ options.auth.password);
    //リクエスト送信
    request(options, function (error, response, body) {
	if (error) {
	    console.log('Error: ' + error.message);
	    return;
	}
	console.log("Status Code (function) : "+response.statusCode);
    });

}

function wrap(token) {
    if (token.startsWith("http")) {
	return "<"+token+">";
    } else if (token.startsWith("\"")) {
	return token;
    } else if (token.match(/^[_\w]+:[_\w]+$/)) {
	return token;
    } else {
	return "\""+token+"\"";
    }
}


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
