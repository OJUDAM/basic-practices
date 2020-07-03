import assert from 'assert';
import { hello } from './hello.js'

const assertStrict = assert.strict;

describe('Hello World', function () {
    it('hello() test', function () {
        assertStrict.equal(hello(), "Hello World");
    });
});
