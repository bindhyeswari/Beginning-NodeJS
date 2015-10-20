var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

makeRequest.cache = {
    // key: url, value: body of the response
};

function makeRequest(url, callback) {
    // invoke the callback if the data exists in the cache,
    // else make a request, put data in cache and invoke callback with data
    if (makeRequest.cache[url]) {
        callback(null, makeRequest.cache[url]);
    } else {
        request({
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'
            }
        }, function (err, res, body) {
            if (err) callback(err, null);
            else {
                makeRequest.cache[url] = JSON.parse(body);
                callback(null, makeRequest.cache[url]);
            }
        });
    }
}

router.get('/james', function (req, res) {

    makeRequest('https://api.github.com/search/repositories?q=nodejs', function (err, result) {
        if (err) res.status(500).json(err);
        else res.status(200).json(result);
    });

});

var contacts = [];

router.get('/contacts', function (req, res) {
   res.json(contacts);
});

router.post('/contacts', function (req, res) {
    console.log(req.body);
    contacts.push(req.body);
    res.status(201).json({message: 'Created the object ... '});
});

router.delete('/contacts/:email', function (req, res) {
    console.log(req.params.email);
    contacts.every(function (contact, index) {
        if (contact.email === req.params.email) {
            contacts.splice(index, 1);
            return false;
        }
        return true;
    });
    res.status(200).json({message: 'Successfully deleted ' + req.params.email});
});

module.exports = router;
