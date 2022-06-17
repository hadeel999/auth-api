'use strict';
const logger = require('../../auth/middleware/logger');

describe('Logger Test', () => {

    let consoleSpy;//this variable to store if jest finds a console logs
    let req = {};
    let res = {};
    let next = jest.fn();

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log');
    });

    test('it is logging something or routes', () => {
        logger(req, res, next);
        expect(consoleSpy).toHaveBeenCalled();
    });
    test('it is calling next', () => {
        expect(next).toHaveBeenCalled();
    });

})