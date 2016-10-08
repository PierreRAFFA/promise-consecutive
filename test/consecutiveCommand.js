var PromiseConsecutive = require('../');


var p = new PromiseConsecutive();
p.add(logMessage, 'world');
p.add(sleep, 1000);
p.add(logMessage, 'again');
p.add(sleep, 2000);
p.add(logMessage, 'again and again');
p.start()
    .then(results => {
        console.log(results);
    });

function logMessage(text) {
    var message = 'hello ' + text;
    console.log(message);
    return message;
}

function sleep(duration) {
    // console.log('m3 called');
    var defer = Promise.defer();
    setTimeout(() => {
        console.log('sleep ' + duration)
        defer.resolve(`I slept for ${duration}ms`);
    }, duration);

    return defer.promise;
}