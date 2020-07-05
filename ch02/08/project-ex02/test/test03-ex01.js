import assert from 'assert';
import { na } from '../src/ex01.js'

const assertStrict = assert.strict;

try {
    assertStrict.deepEqual(na(), [1, 2, 3], 'deepEqual: fail');
    assertStrict.equal(na(), [1, 2, 3], 'equal: fail');
} catch (error) {
    console.log(error.message);
}