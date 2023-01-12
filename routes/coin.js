const express = require('express');
const router = express.Router();
const https = require('https');


//test
router.get('/TEST', (req, res) => {
    res.send("Main route")
})

router.get('/env', (req, res) => {
    res.send(process.env.COINAPI_KEY)
})

// METADATA

router.get("/exchanges", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": "/v1/exchanges",
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
       
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/exchanges/icons/:size", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": "/v1/exchanges/icons/"+req.params.size,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
       
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/icons", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": "/v1/assets/icons/32",
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/symbols", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": "/v1/symbols",
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/assets", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": "/v1/assets",
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

// EXCHANGE RATES
router.get("/exchangerate/:from/:to", (req, res) => {
    
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": "/v1/exchangerate/"+req.params.from+"/"+req.params.to,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
	
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/exchangerate/:from", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": "/v1/exchangerate/"+req.params.from,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/exchangerate/history/periods", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": "/v1/exchangerate/history/periods",
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/exchangerate/:from/:to/history", (req, res) => {
    
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": "/v1/exchangerate/"+req.params.from+"/"+req.params.to+`/history?period_id=${req.query.period_id}&time_start=${req.query.time_start}&time_end=${req.query.time_end}`,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
	
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

// OHLCV
router.get("/ohlcv/periods", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": "/v1/ohlcv/periods",
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/ohlcv/:symbol_id/latest", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/ohlcv/${req.params.symbol_id}/latest?period_id=${req.query.period_id}&limit=${req.query.limit}`,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/ohlcv/:symbol_id/history", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/ohlcv/${req.params.symbol_id}/history?period_id=${req.query.period_id}&limit=${req.query.limit}&time_start=${req.query.time_start}&time_end=${req.query.time_end}`,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

// ORDER BOOK

router.get("/orderbooks/:symbol_id/current", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/orderbooks/${req.params.symbol_id}/current`,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/orderbooks/:symbol_id/latest", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/orderbooks/${req.params.symbol_id}/latest?limit=${req.query.limit}`,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/orderbooks/:symbol_id/history", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/orderbooks/${req.params.symbol_id}/history?period_id=${req.query.period_id}&limit=${req.query.limit}&time_start=${req.query.time_start}&time_end=${req.query.time_end}`,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

// ORDER BOOK L3
router.get("/orderbooks3/:symbol_id/current", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/orderbooks3/${req.params.symbol_id}/current`,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

// QUOTES
router.get("/quotes/:symbol_id/current", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/quotes/${req.params.symbol_id}/current`,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/quotes/:symbol_id/latest", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/quotes/${req.params.symbol_id}/latest?limit=${req.query.limit}`,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/quotes/:symbol_id/history", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/quotes/${req.params.symbol_id}/history?period_id=${req.query.period_id}&limit=${req.query.limit}&time_start=${req.query.time_start}&time_end=${req.query.time_end}`,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

// TRADES

router.get("/trades/:symbol_id/current", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/quotes/${req.params.symbol_id}/current`, //emang pake quotes
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/trades/:symbol_id/latest", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/trades/${req.params.symbol_id}/latest?limit=${req.query.limit}`,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})

router.get("/trades/:symbol_id/history", (req, res) => {
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/trades/${req.params.symbol_id}/history?period_id=${req.query.period_id}&limit=${req.query.limit}&time_start=${req.query.time_start}&time_end=${req.query.time_end}`,
        "headers": {'X-CoinAPI-Key': process.env.COINAPI_KEY}
      };
		
    var request = https.request(options, function (response) {
        var chunks = [];
        let data = ''
    
        response.on("data", function (chunk) {
        chunks.push(chunk);
        data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.send(body)
        });
    });
    
    request.end();
})



module.exports = router