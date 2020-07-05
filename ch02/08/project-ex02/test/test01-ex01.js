import assert from 'assert';
import { add } from '../src/ex01.js'

try {
    assert.equal(add(10, 20), '30');
    assert.strictEqual(add(10, 20), '30');
} catch (error) {
    console.log(error.message);
}