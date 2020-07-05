import assert from 'assert';
import { hello } from './hello.js'

describe('Hello World', function () {
    it('hello() test', function () {
        assert.strictEqual(hello(), "Hello World2");
    });
});
