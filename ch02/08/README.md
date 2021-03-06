## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch02](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02) / 08. Mocha : 단위 테스트 도구

### 1. 소개

#### 1-1 단위 테스트 도구(Unit Test Tool)

​	애자일의 eXtreme Programming의 TDD, BDD를 위한 최소 단위 테스트가 소프트웨어 개발에 많이 적용되고 있다. 이를 도와주는 도구들이 거의 모든 언어별로 지원되고 있고  JavaScript만 하더라도 스무 여가지가 된다. Java 진영에는 JUnit이 대표적인 것 처럼 JavaScript는 JSUnit이라는 도구가 있었다.

​	최초의 JavaScript 단위 테스트 라이브러리 JSUnit은 벌써 개발이 중지되었고 이를 기반으로 2010년  Jasmine이 발표되었다. 그전에 이미 2008년쯤에 jQuery DOM 조작 라이브러리가 인기를 끌면서 QUnit이 jQuery 기반 코드 테스트에 많이 활용되고 있었다. 비교적 늦게 발표된 것은 2012년 Node 모듈 테스트를 위해 개발된 Mocha다. 지금은 인기가 있는  JavaScript 단위 테스트 프레임워크는 QUnit, Mocha, Jasmine 세 가지 정도로 정리할 수 있다.

​	세 가지 도구가 각각 장점이 있으며 개발자 또는 팀 그리고 프로젝트 기호에 맞게 사용되고 있는 것 같다. 하지만, 경험상 선택의 기준은 있다. 보통, Node 기반 서버 개발이나 컴파일을 해야하는 JavaScript 애플리케이션 개발이 아닌 경우 앞에서도 언급했지만 jQuery 기반의 브라우저 DOM조작 애플리케이션을 간단히 작성에는 세팅하기가 비교적 쉽고 간단한 QUnit를 사용한다.

​	QUnit은  jQuery 라이브러리 테스트를 위해 jQuery 개발자 John Resig에 의해 개발되어서 jQuery 기반 코드 테스트에 많이 쓰인다. 하지만 최근의 많은  JavaScript 프론트엔드 애플리케이션들은 느린 브라우저의 직접적인 DOM 조작보다는 라이브러리(React, Vue, Angular)가 지원하는 API를 활용한 가상 DOM을 효율적으로 조작하는 프로그램밍 방식이 대중화 되면서 세 라이브러 중에 인기가 많이 떨어져 있는 상태로 보면 된다.

​	Node 기반 서버 개발이나 그리고 방금 언급한 형태의 JavaScript 애플리케이션 개발에는 Jasmine과 Mocha를 고려하는 편이다. 세 테스트 프레임워크가 당연히 비동기 코드 테스트를 지원하지만 QUnit과 Mocha는 Promise를 지원하기 때문에 아무래도 비동기 테스트에는 Mocha를 우선 선택하게 된다.

​	테스트 도구에서 assertion 표현이 풍부하면 여러모로 장점이 많다. Jasmine은 자체적으로 assertion 라이브러리를 내장하고 있지만 Mocha는 chai라는 외부 라이브러리를 사용한다. Mocha는 chai 외에도 다 수의 외부 assertion 라이브러리를 지원하기 때문에 유연하고 확장성이 좋다고 볼 수 있다. 하지만 나쁘게 말하면 세팅과 학습에 다소 부담이 있다.

​	최근(2020년 기준)에는 Mocha가 Jasmine의 인기를 크게 앞질렀다. 두 프레임워크는 테스트 함수와 문법이 서로 유사하기도 하지만 ES6 사용과 지원이 보편화 되면서 비동기에서 Promise을 지원하는 Mocha가 우선 선택되는 것 같다. 그리고 개발자들에게 학습 부담이 유연함과 확장성을 포기할 만큼의 영향을 주지는 못한다.

​	정리하자! 여러 테스트 프레임워크에서 굳이 하나를 골라 추천한다면 개인적으로는 Mocha 이지만 사실, 여러 테스트 프레임워크를 사용해보면 API 사용에 있어서 유사성이 많고 Test Runner로는 모두 [Karma](https://github.com/karma-runner/karma) 를 사용하고 있다.  따라서 크게 고민없이 셋 중에 어떤 것이라도 골라 사용한다면 다른 테스트 도구로 전환하는 데 큰 어려움이 없다. React로 화면을 개발하고 있다면 React에서 지원해주는 Jest기반의 테스트 프레임워크를 쓰는 것이 좋다. Jest는 페이스북이 React 라이브러리 개발 시, 테스트를 위해 개발되었다. jQuery 기반 코드는 QUnit이 좋을 것이며, Node 기반 개발에서는 Mocha와 Jasmine을 선택 할 수 있는데, BDD 개발 방식의 표준 테스팅 [RSpec](http://www.betterspecs.org/ko/)에 맞는 테스트 코드를 작성하고 싶으면 Jasmine 이고 Promise 기반의 비동기 코드 테스트를 쉽게 할 생각이면 단연 Mocha 다.   

​	실습에서는 범용 테스트 프레임워크 QUnit, Mocha, Jasmine 중 인기가 가장 높은 Mocha를 이용한 테스트 실습을 해본다.

 

### 2. Mocha 실습

#### 2-1. Mocha 설치

-g (전역) 또는 -D(프로젝트 로컬) 로 설치한다.

```bash
$ npm i -D mocha
$ npx mocha --version
8.0.1 
```

#### 2-2. [실습1] 기본 테스트 코드 구조

1. project-ex01 프로젝트 디렉토리 생성 및 프로젝트 프로파일 생성

   ```bash
   $ mkdir project-ex01
   $ cd project-ex01
   $ npm init -y
   ```

2. ES6 모듈 지원을 위한 package.json 파일 수정

   ```json
   {
   .
   .
     "type": "module",
   .
   .
   }
   ```

3. 테스트 대상 함수 작성(hello.js)

   ```javascript
   export const hello = () => {
       return 'Hello World';
   }
   ```

4. 테스트 케이스 작성(test-hello.js)

   ```javascript
   import assert from 'assert';
   import { hello } from './hello.js'
   
   describe('Hello World', function () {
       it('hello() test', function () {
           assert.strictEqual(hello(), "Hello World");
       });
   });
   ```

   ​	테스트 케이스 'Hello World' 는 `describe` 키워드를 사용해서 위의 코드처럼 작성한다. 케이스별로 테스트 콜백 함수를 작성하기 위해서는 `it` 키워드를 사용한다. assertion 라이브러리는 외부 라이브러리를 쓰지 않고 node 기본 내장 assert 모듈을 사용한다.

   ​	주의 할 것은 테스트 케이스가 작성된 js 파일은 mocha에 의해 읽혀져 실행 된다는 것이다. node로 바로 실행 시키면 당연히 오류가 발생한다.

5. 테스트 하기

   ```bash
   $ npx mocha test-hello.js
   ```

6. 테스트 결과

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0734.png" style="zoom:60%;" />



#### 2-2. [실습2] assertion 연습(node assert 모듈)

​	보통, Mocha를 사용할 때는 외부 assertion 라이브러리를 사용하지만, 기초적인 assertion 연습을 위해 node에 내장된 assert 모듈을 사용해 보자.

1. project-ex02 프로젝트 세팅

   ```bash
   $ mkdir project-ex01
   $ cd project-ex01
   $ npm init -y
   $ npm i -D mocha
   ```

2. ES6 모듈 지원을 위한 package.json 파일 수정

   ```json
   {
   .
   .
     "type": "module",
   .
   .
   }
   ```

3. 코드 작성(ex01.js)

   ```javascript
   export const add = (x, y) => x + y;
   export const na = () => [1, 2, 3];
   export const X = function(){};
   ```

4. 테스트 코드(test01-ex01.js)

   ```javascript
   import assert from 'assert';
   import { add } from '../src/ex01.js'
   
   try {
       assert.equal(add(10, 20), '30');
       assert.strictEqual(add(10, 20), '30');
   } catch (error) {
       console.log(error.message);
   }
   ```

   ​	Mocha를 사용한 테스트 코드가 아니고 assert 모듈만을 사용해서 테스트 코드를 작성하였다.  try-catch 구문을 사용해서 테스트 코드를 작성할 수 있지만 실습1의 Mocha의 테스트 케이스가 try-catch를 랩핑하고 있음을 대략 짐작할 수 있다.

   ​	node assert 모듈로 assertion을 할 때는 Legacy Mode와 Strict Mode를 구분해야 한다. Strict Mode로 테스트가 이루어져야 하는 것이 당연해 보인다. 왜냐하면 문제가 발생할 수 있는 코드가 Legacy 모드 테스트 에서는 assert되지 않을 가능성이 있기 때문이다.

   ​	예제에서 보면 strictEqual은 30 === '30', equal은 30 == '30' 비교를 하는 것을 알 수 있다. 기본 타입에서는 타입과 값의 동일성을 비교하고 객체에서는 동일성을 비교한다. 기본 타입의 동일성 비교를 한다면 Strict Mode 테스트가 혼동을 피할 수 있다. 그래서 다음 4개의 Legacy Mode의 assert 함수들은 deprecated 되어 있다. 참고로 객체에서는 strictEqual은 두 객체의 동일성 비교를 한다. 객체의 구조 비교 즉, 동질성은 strictDeepEqual을 사용한다.

   1. equal(deprecated) -> strictEqual
    2. notEqual(deprecated)  -> notStrictEqual
    3. deepEqual(deprecated)  -> strictDeepEqual
    4. notDeepEqual(deprecated)  -> notStrictDeepEqual

   strict prefix가 붙은 함수를 쓰는 것이 귀챦거나 안전하게 strict를 보장받는 방법으로 다음 코드를 참고한다.(test02-ex01.js)

   ```javascript
   import assert from 'assert';
   import { add } from '../src/ex01.js'
   
   const assertStrict = assert.strict;
   
   try {
       assertStrict.equal(add(10, 20), '30');
   } catch (error) {
       console.log(error.message);
   }
   ```

   ​	assert.strict.equal은 assert.strictEqual의 alias 이다. 따라서 이 예제에서도  error가 던져 질 것이다.

5. 테스트 코드(test03-ex01.js) : deepEqual vs equal

   ```javascript
   import assert from 'assert';
   import { na } from '../src/ex01.js'
   
   const assertStrict = assert.strict;
   
   try {
       assertStrict.deepEqual(na(), [1, 2, 3], 'deepEqual: fail');
       assertStrict.equal(na(), [1, 2, 3], 'equal: fail');
   } catch (error) {
       console.log(error.message);
   }
   ```

   ​	결과를 보면, eqaul이 실패한다. 즉, 두 배열 객체가 다른 객체 이기 때문이다. 하지만 deepEqual은 성공한다. 두 배열 객체의 내용을 비교하기 때문이다. 다음 테스트 예제도 살펴보자(test04-ex01.js)

   ```javascript
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
   ```

   ​	결과를 보면, a === b 두 객체의 동일성 비교하는 equal만 실패한다. bar 프로퍼티 추가된 구조가 다른 b와 a의 deepEqual 결과가 실패한다.

   ​	그리고 위의 assert 만 사용한 테스트 코드는 실패하면 예외가 발생하여 다음 코드가 실행되지 않는 문제점으로 주석을 활용해야 한다. 따라서 테스트 하기가 조금 불편하다. mocha와 같은 테스트 프레임워크를 사용하게 되면 테스트 케이스의 테스트 함수들을 병렬로 실행해 이 문제를 해결할 수 있다. 지금 까지의 모든 테스트 코드를 test05-ex01.js 에서는 mocha 테스트 케이스로 변경하였다.

   ```javascript
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
   ```

   ​	테스트 케이스 실행과 테스트 결과이다. 다음 부터는 mocha 테스트 케이스를 활용하기로 한다.

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0735.png" style="zoom:60%;" />

6. ifError()

7. throw()

8. async 지원

   

#### 2-2. [실습3] hook 함수 





