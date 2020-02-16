let OAuth = require('oauth');
let header = {
    "X-Yahoo-App-Id": "your-app-id"
};

let request = new OAuth.OAuth(
    null,
    null,
    'your-consumer-key',
    'your-consumer-secret',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);
request.get(
    'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=sunnyvale,ca&format=json',
    null,
    null,
    function (err, data, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
        }
    }
);

module.exports = request;