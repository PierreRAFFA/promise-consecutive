'use strict';

const Command = require('./Command');
const chalk = require('chalk');

/**
 * Manages all the commands to execute
 *
 * @constructor
 */
function PromiseSeries() {

    this._mainDefer = null;
    this._commands = [];
    this._results = [];
    this._resultsAsObject = {};
    this._isResultsObject = false;
}

/**
 * Add a new command to execute.
 *
 * @param method
 * @param ...arguments
 */
PromiseSeries.prototype.add = function(method) {

    var argArray = [].slice.call(arguments);
    argArray.splice(0,1);

    var command = new Command(method, argArray);
    this._commands.push(command);
    return command;
};

/**
 * Starts the execution of the command consecutively
 */
PromiseSeries.prototype.start = function() {
    this._mainDefer = Promise.defer();

    //check if the result will be an array or an object
    this._isResultsObject = this._commands.some(command => {
        return !!command.alias;
    });

    this._executeNextCommand();

    return this._mainDefer.promise;
};

/**
 * Get the next command and execute it
 * @private
 */
PromiseSeries.prototype._executeNextCommand = function() {
    var command = this._commands.shift();

    if (command) {
        return command.exec()
            .then(result => {

                //save result
                if (this._isResultsObject) {
                    if (!command.alias) {
                        console.log(chalk.red(`No Alias was found for the command: ${command.method.name}` ));
                    }
                    this._resultsAsObject[command.alias] = result;
                }else{
                    this._results.push(result);
                }

                //next
                this._executeNextCommand();
            })
            .catch(error => {
                this._mainDefer.reject(error);
            })
    }else{

        //resolve the mainDefer
        if (this._isResultsObject) {
            this._mainDefer.resolve(this._resultsAsObject);
        }else{
            this._mainDefer.resolve(this._results);
        }


    }
};


module.exports = PromiseSeries;