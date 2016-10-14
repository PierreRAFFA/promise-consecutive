var PromiseSeries = require('../lib/PromiseSeries');


var p = new PromiseSeries();
p.add(getName).as('name');
p.add(getDescription).as('description');
p.add(getPrice, '$').as('price');
p.add(getLocation, '$');
p.start()
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.log(error);
    });

function getName() {
    console.log('getName');
    return 'Canon eos 70d';
}

function getDescription() {
    console.log('getDescription');
    var defer = Promise.defer();
    setTimeout(() => {
        console.log(`This is a camera`);
        defer.resolve(`This is a camera`);
    }, 1000);

    return defer.promise;
}

function getPrice(currency) {
    console.log('getPrice');
    var defer = Promise.defer();
    setTimeout(() => {
        console.log(`589${currency}`)
        defer.resolve(`589${currency}`);
    }, 1000);

    return defer.promise;
}

function getLocation() {
    console.log('getLocation');
    var defer = Promise.defer();
    setTimeout(() => {
        console.log(`UK`)
        defer.resolve(`UK`);
    }, 1000);

    return defer.promise;
}