import assert from 'assert';
import { add, na, X  } from '../src/ex01.js'

const assertStrict = assert.strict;

describe('Module ex01 Test', function () {

    it('add 함수 test1', function () {
        assertStrict.equal(add(10, 20), 30);
    });

    it('add 함수 test2', function () {
        assertStrict.equal(add(10, 20), '30');
    });

    it('na 함수 test1', function () {
        assertStrict.deepEqual(na(), [1, 2, 3], 'deepEqual: fail');
    });

    it('na 함수 test2', function () {
        assertStrict.equal(na(), [1, 2, 3], 'equal: fail');
    });

    it('X 객체 test1', function () {
        const a = new X();
        const c = a;
        assertStrict.equal(a, c,'a === c : fail');
    });

    it('X 객체 test2', function () {
        const a = new X();
        const b = new X();
        assertStrict.equal(a, b,'a === b : fail');
    });

    it('X 객체 test3', function () {
        const a = new X();
        const c = a;
        assertStrict.deepEqual(a, c, 'deepEqual: fail');
    });

    it('X 객체 test4', function () {
        const a = new X();
        const b = new X();
        assertStrict.deepEqual(a, b, 'deepEqual: fail');
    });

    it('X 객체 test5', function () {
        const a = new X();
        const b = new X();
        b.bar = 'foo';
        assertStrict.deepEqual(a, b, 'deepEqual: fail');
    });
});