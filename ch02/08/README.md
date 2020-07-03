## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch02](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02) / 08. Mocha : 단위 테스트 도구

### 1. 소개

#### 1-1 단위 테스트 도구(Unit Test Tool)

​	애자일의 eXtreme Programming의 TDD, BDD를 위한 최소 단위 테스트가 소프트웨어 개발에 많이 적용되고 있다. 이를 도와주는 도구들이 거의 모든 언어별로 지원되고 있는데 JavaScript만 하더라도 스무 여가지가 된다. Java 진영에는 JUnit이 대표적인 것 처럼 JavaScript는 JSUnit이라는 도구가 있었다.

​	최초의 JavaScript 단위 테스트 라이브러리 JSUnit은 벌써 개발이 중지되었고 이를 기반으로 2010년  Jasmine이 발표되었는데 2008년에 이미 QUnit이 나와 있었다. 비교적 늦게 발표된 것은 2012년 Node 모듈 테스트를 위해 개발된 Mocha다. 현재  JavaScript 단위 테스트 프레임워크는 QUnit, Mocha, Jasmine  세 가지 정도이다.

​	세 가지 도구가 각각 장점이 있으며 개발자나 팀 또는 프로젝트 기호에 맞게 사용되는 것 같다. 하지만, 경험상 선택의 기준은 있다. 보통, Node 기반 서버 또는 컴파일을 해야하는 JavaScript 애플리케이션이 아닌, 예를 들면 jQuery 기반의 브라우저 DOM조작 애플리케이션을 간단히 작성하고 있다면 세팅하기가 비교적 쉽고 간단한 QUnit를 사용한다. QUnit은 참고로 jQuery 라이브러리 테스트를 위해 개발되어서 jQuery 기반 코드 테스트에 많이 쓰이지만 세 라이브러 중에 인기는 낮은 편이다.

​	이 경우가 아니라면,  Jasmin과 Mocha를 고려한다. 세 테스트 프레임워크가 당연히 비동기 코드 테스트를 지원하지만 Mocha는 Promise를 지원하기 때문에 아무래도 비동기 테스트는 Mocha가 장점이 있다.

​	테스트 도구에서 중요한 것은 assertion 라이브러리가 표현이 풍부하면 여러모로 퍈리하다. Jasmine은 자체적으로 assertion 라이브러리를 내장하고 있지만 Mocha는 chai라는 외부 라이브러리를 사용한다. Mocha는 chai외에도 여러 assertion 라이브러리를 지원하기 때문에 유연하고 확장성이 좋다고 볼 수 있지만 나쁘게 말하면 세팅과 학습에 다소 부담이 있다.

​	최근(2020년 기준)에는 Mocha가 Jasmine을 크게 앞질렀다. 두 프레임워크는 테스트 함수와 문법이 서로 유사하기도 하지만 ES6 사용과 지원이 보편화 되면서 비동기에서 Promise을 지원하는 Mocha가 우선 선택되는 것 같다. 그리고 개발자들에게 학습 부담이 유연함과 확장성을 포기할 정도로 크게 영향을 주는 것 같지 않다.

​	한 가지 집고 넘어 가야 할 것은 여러 테스트 프레임워크에서 굳이 하나를 골라 추천한다면 Mocha이지만 사실, 여러 테스트 프레임워크를 사용해보면 API가 서로 비슷 비슷하다는 것이다. React로 화면을 개발하고 있다면 React에서 지원해주는 Jest기반의 테스트 프레임워크를 쓰는 것이 좋을 것이다. Jest는 페이스북이 React 테스트를 위해 개발한 것이다. jQuery 기반 코드는 QUnit이 좋을 것이며, Node 기반 API 서버 개발에는 Mocha가 좋을 것이다. 

​	따라서 React는 여기서 다루지 않으므로 Jest를 제외한 Mocha, Jasmine, QUnit 등의 여러 테스트 프레임워크의 설정 방법과 기본 테스트 그리고 비동기 코드 테스트 실습으로 각 테스트 프레임워크의 장단점을 비교해 본다.

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

   ​	테스트 케이스는 'Hello World' 는 `describe` 키워드를 사용해서 위의 코드처럼 작성한다. 케이스별로 테스트 콜백 함수를 작성하기 위해서는 `it` 키워드를 사용한다. 지금은 assertion 라이브러리를 외부 라이브러리를 쓰지 않고 node 기본 내장 assert 모듈을 사용하였다.

   ​	주의 할 것은 테스트 케이스가 작성된 js 파일은 mocha에 의해 읽혀져 실행 된다는 것이다. node로 바로 실행 시키면 실행되지 않는다.

5. 테스트 하기

   ```bash
   $ npx mocha test-hello.js
   ```

6. 테스트 결과

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0734.png" style="zoom:60%;" />



#### 2-2. [실습2] assertion 연습(node assert 모듈)

​	보통, mocha를 사용할 때는 외부 assertion 라이브러리를 사용하지만 node에 내장된 assert 모듈로 assertion을 연습한다.

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

3. 코드 작성(hello.js)





#### 2-2. [실습3] hook 함수 





### 3. Jasmine 실습

#### 1-1. [실습] 기본 사용법

========================



### 4. QUnit 실습

#### 1-1. [실습] 기본 사용법

========================