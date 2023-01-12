const https = require('https');
 
var options = {
  "method": "GET",
  "hostname": "rest.coinapi.io",
  "path": "/v1/exchanges",
  "headers": {'X-CoinAPI-Key': 'D3093793-EDC9-4F5C-9EB1-A9048001C7F9'}
};
 
var request = https.request(options, function (response) {
  var chunks = [];
  let data = ''
 
  response.on("data", function (chunk) {
    chunks.push(chunk);
    data = data + chunk.toString();
    console.log(data);
  });
 
});
 
request.end();