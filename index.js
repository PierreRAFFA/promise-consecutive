'use strict';

/**
 *
 * @constructor
 */
function PromiseConsecutive() {

    this._mainDefer = null;
    this._commands = [];
    this._results = [];
}

/**
 * Add a new command to execute.
 *
 * @param method
 * @param ...arguments
 */
PromiseConsecutive.prototype.add = function(method) {

    var argArray = [].slice.call(arguments);
    argArray.splice(0,1);

    this._commands.push( {
        method: method,
        args: argArray,
        isPromise: false,
        returnedValue: null,
    });
};

/**
 * Starts the execution of the command consecutively
 */
PromiseConsecutive.prototype.start = function() {
    this._mainDefer = Promise.defer();

    this._executeNextCommand();

    return this._mainDefer.promise;
};

/**
 * Get the next command and execute it
 * @private
 */
PromiseConsecutive.prototype._executeNextCommand = function() {
    var command = this._commands.shift();

    if (command) {
        return this._executeCommand(command).then(result => {
            this._results.push(result);
            this._executeNextCommand();
        });
    }else{
        this._mainDefer.resolve(this._results);
    }
};

/**
 * Execute the command and execute the next command:
 *  - straight after if no promise
 *  - when the intial command is executed completely.
 *
 * @param command
 * @private
 */
PromiseConsecutive.prototype._executeCommand = function(command) {

    var defer = Promise.defer();

    command.returnedValue = command.method.apply(null, command.args);
    command.isPromise = this.isPromise(command.returnedValue);

    if ( command.isPromise) {
        command.returnedValue
            .then( (commandResult) => {
                defer.resolve(commandResult);
            })
            .catch(() => {
                defer.reject();
            })
    }else{

        defer.resolve(command.returnedValue);
    }

    return defer.promise;
};

/**
 * Call the command and stores the returnedValue and isPromise
 * @param command
 * @private
 */
PromiseConsecutive.prototype._callCommand = function(command) {
    command.returnedValue = command.method.apply(null, command.args);
    command.isPromise = this.isPromise(command.returnedValue);
};

/**
 * Checks if the return value of the command is a Promise
 * @param methodReturn
 * @returns {boolean}
 */
PromiseConsecutive.prototype.isPromise = function(methodReturn) {
    return !!methodReturn && typeof methodReturn === 'object' && 'then' in methodReturn;
};

module.exports = PromiseConsecutive;