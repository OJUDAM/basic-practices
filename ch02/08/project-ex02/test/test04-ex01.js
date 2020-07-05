import assert from 'assert';
import { X } from '../src/ex01.js'

const assertStrict = assert.strict;

try {
    const a = new X();
    const c = a;
    const b = new X();

    assertStrict.equal(a, c,'a === c : fail');
    // assertStrict.equal(a, b,'a === b : fail');
    assertStrict.deepEqual(a, c, 'deepEqual1: fail');
    assertStrict.deepEqual(a, b, 'deepEqual2: fail');

    b.bar = 'foo';
    assertStrict.deepEqual(a, b, 'deepEqual3: fail');

} catch (error) {
    console.log(error.message);
}