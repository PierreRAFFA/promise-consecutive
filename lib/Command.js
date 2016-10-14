'use strict';

/**
 * Stores all information about the command to execute
 * Executes the command (promise or not)
 *
 * @param method
 * @param args
 * @constructor
 */

function Command(method, args) {
    this.method = method;
    this.args = args || [];
    this.alias = null;
    this.isPromise = false;
}   

/**
 * Defines an alias (to get a result as object)
 * Note that no alias may return null as key for the object
 *
 * @param alias
 */
Command.prototype.as = function(alias) {
    this.alias = alias;
};

/**
 * Executes a command
 *  - straight after if no promise
 *  - when the initial command is executed completely.
 *
 * @param command Command
 * @private
 */
Command.prototype.exec = function() {

    var defer = Promise.defer();

    if ( this.method) {
        var returnedValue = this.method.apply(null, this.args);
        this.isPromise = isPromise(returnedValue);
        if (this.isPromise) {

            returnedValue
                .then( (commandResult) => {
                    defer.resolve(commandResult);
                })
                .catch(error => {
                    defer.reject(error);
                });
        }else{
            defer.resolve(returnedValue);
        }
    }else{
        defer.reject('No method to execute');
    }

    return defer.promise;
};

/**
 * Checks if the return value of the command is a Promise
 * @param methodReturn
 * @returns {boolean}
 */
function isPromise(methodReturn) {
    return methodReturn && typeof methodReturn.then === 'function' && typeof methodReturn.catch === 'function';
}

module.exports = Command;