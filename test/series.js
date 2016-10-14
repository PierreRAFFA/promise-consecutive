var PromiseSeries = require('../lib/PromiseSeries');


var p = new PromiseSeries();
p.add(logMessage, 'world');
p.add(sleep, 1000);
p.add(logMessage, 'again');
p.add(sleep, 2000);
p.add(logMessage, 'again and again');
p.start()
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.log(error);
    });

function logMessage(text) {
    var message = 'hello ' + text;
    console.log(message);
    return message;
}

function sleep(duration) {
    // console.log('m3 called');
    var defer = Promise.defer();
    console.log('sleep ' + duration)
    setTimeout(() => {
        defer.resolve(`I slept for ${duration}ms`);
    }, duration);

    return defer.promise;
}