import assert from 'assert';
import { add } from '../src/ex01.js'

const assertStrict = assert.strict;

try {
    assertStrict.equal(add(10, 20), '30');
} catch (error) {
    console.log(error.message);
}