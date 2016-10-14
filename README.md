# Promise Series Advanced

This `promise-series-advanced` modules allows you to execute a series of methods consecutively, and retrieve the results.  
Each method :  
    - may be a promise or not.  
    - can be called with specific parameters  


##Results as an array  
  
```javascript
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
    var defer = Promise.defer();  
    setTimeout(() => {  
        console.log('sleep ' + duration)  
        defer.resolve(`I slept for ${duration}ms`);  
    }, duration);  
  
    return defer.promise;  
}  
  
```

This will print:  

```javascript
[ 'hello world',  
  'I slept for 1000ms',  
  'hello again',  
  'I slept for 2000ms',  
  'hello again and again' ]  
```



##Results as an object
  
To do so, each method must have an alias:

```javascript
var p = new PromiseSeries();  
p.add(getName).as('name');  
p.add(getDescription).as('description');  
p.add(getPrice, '$').as('price');  
p.add(getLocation).as('location');  
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
        console.log(`589${currency}`);  
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
  
```

This will print:  

```javascript
{ name: 'Canon eos 70d',  
  description: 'This is a camera',  
  price: '589$',  
  location: 'UK' }  
```

