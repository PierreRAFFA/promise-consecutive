# Promise Consecutive

This `promise-consecutive` modules allows you to execute multiple methods consecutively.
These methods may be some promises or not.

```javascript
var p = new PromiseConsecutive();  
p.add(logMessage, 'world');  
p.add(sleep, 1000);  
p.add(logMessage, 'again');  
p.add(sleep, 2000);  
p.add(logMessage, 'again and again');  
p.start();  

```
