## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch02](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02) / 03. Babel : 트랜스컴파일러 도구

### 1. 소개

#### 1-1. 트랜스컴파일러(transcompiler)

1. 트랜스파일러(transplier) 라고도 불리는 트랜스컴파일러는 컴파일러처럼 한 언어로 작성된 코드를 다른언어로 바꾸는 도구이다.
2. 엄밀하게 생각해보면, 컴파일이 더 큰 범주에 속한다고 볼 수 있다. 트랜스컴파일은 "하나의 언어로 작성된 소스 코드를 비슷한 수준의 추상화를 가진 같은 언어로 변환(transform)"이라고 정의하기 때문에 완전히 다른 언어로 변환하는 컴파일과는 엄밀하게 구분된다.
3. 가령, ECMAScript 2015+ 로 작성된 JavaScript 코드를 하위 호환을 위해 ECMAScript 5 수준으로 변환하는 것을 트랜스컴파일이라 볼 수 있다. 
4. ECMAScript의 비표준 스크립트 언어 TypeScript을 ECMAScript2015 의 JavaScript로 변환하는 것도 역시 트랜스컴파일로 볼 수 있는데, 여기에는 관점에 따라 논쟁의 여지가 있다. 보통, 이 것은 컴파일이라 부르는 것 같다. 트랜스컴파일이냐? 컴파일이냐? 구분하는 것은 여기서는 큰 의미가 없다. (프로그래밍 랭기지 수업에서나...)  
5. 널리 사용되는 트랜스컴파일러는 [바벨(Babel)](https://babeljs.io) 과  [트레이서(Traceur Compiler)](https://github.com/google/traceur-compiler) 이다. 이 중 바벨이 뛰어난 확장성으로 다양한 프레임워크와 빌더 도구에 내장되어 있어 널리 사용되고 있다.

#### 1-2. 바벨(Babel)

1. 바벨은 ES5를 ES6으로 바꾸는 트랜스컴파일러로 시작됐다. 지금은 ES6, React, ES2015+ 등의 다양한 변환을 지원하는 범용 트랜스파일러이다. 주요 기능으로는 구문 변환, Polyfil 지원, 소스 코드 변환 등이다.
2. 바벨은 변환을 위해 많은 독립적인 플러그인(plugin)들을 제공한다. 독립적이라는 의미는 각각의 플러그인이 하나의 문법 또는 하나의 구문 변환을 위해 작성되어 있다는 의미다.
3. 플러그인의 상위 개념으로 프리셋(prepset)이 있다. 프리셋은 여러 플러그인들을 한 번에 적용할 수 있도록 플러그인들을 모아 놓은 것이다. 예를 들어, babel-preset-es2015은 ES6 문법에 맞춰 작성된 JavaScript 코드의 하위 호환 변환을 위한 개별적인 문법/구문 플러그인들을 모아놓고 한 번에 ES6으로 작성된 코드를 ES5 코드로 변환하는 프리셋이다.
4. 그런데, 프리셋은 문제가 있다. 실제 실행 환경에 맞는 변환에만 필요한 플러그인들만 모아 놓은 것이 아니라 불필요한 것도 있기 때문에 종종 의도치 않은 변환으로 인해 문제를 발생시켰다. 그렇다고 실제 실행 환경에 맞는 플러그인들 만을 개별적으로 설치하고 개별적 옵션을 적용하려면 그 갯수와 관리 그리고 알아야 할 지식도 만만치 않다.
5. 이를 해결하기 위한 것이 Env 프리셋이다. Env 프리셋은 기본적으로 거의 모든 플러그인을 기본으로 설치한다. 하지만 장점은 실행 환경과 [ES호환성 테이블](https://kangax.github.io/compat-table/es6/)을 활용해 필요한 플러그인들만 선택 설정할 수 있다는 것이다. 
6. 보통, babel-preset-es2015, babel-preset-stage-x 와 같은 년도, 스테이지 기준별 플러그인을 모아놓은 프리셋의 개별 사용은 추천하지 않는다. Env 프리셋을 활용하여 실행 환경과 용도에 맞게 설정하여 변환하는 것을 추천한다.
7. 실습을 통해 단계적으로 이해해 보도록 하자.

### 2. Babel 실습

#### 2-1. Core 라이브러리    

1. 변환 규칙은 바벨 플러그인 안에 있지만 그 규칙을 적용하여 코드 변환을 하는 기본적인 기능은 @babel/core 모듈에 있다. (@는 패키지 스코프로 npm7+ 부터 지원)   

2. 프로젝트별로 사용하는 JavaScript 버젼과 종류가 다를 수 있다. 예를 들어 어떤 프로젝트는 ES6, 어떤 프로젝트는 React등을 기반할 수 있다. 따라서 설치하는 Babel 플러그인과 프리셋이 다양해지고 설정도 제 각각이다. 따라서 바벨은 프로젝트별 지역(local) 설치가 기본이다.   

   ```bash
   $ npm i --save-dev @babel/core
   ```

3. @babel/core 자체는 모듈 라이브러리이기 때문에 사용하기 위해서는 Node API로 코드를 작성해야 한다.

   ```javascript
   const babel = require("@babel/core");
   
   babel.transform("const fn = () => 1;", {
   });
   ```

   + Node API를 사용하는 코드이다. (Via Node API)
   + ES6 코드 "const fn = () => 1;" (화살표 함수, arrow function) 를 옵션 {} (설정하지 않음) 을 적용해 변환한다.
   + 그런데, 대부분의 변환작업은 이런 식으로 코드를 작성해 하지 않을 것이다. 
   + ES6 코드로 작성된 JavaScript 파일을 변환한 타켓 파일로 만들어 내는 CLI 작업을 할 것이다. (Via CLI)
   + 대부분 변환작업은 @babel/core와 @babel/cli를 같이 설치하여 CLI 명령으로 변환작업을 한다.   

#### 2-2. [실습] CLI 도구로 변환 작업 하기

1. 프로젝트 project-ex01 디렉토리를 생성

   ```bash
   $ mkdir project-ex01
   $ cd project-ex01
   ```

2. `npm init -y` 으로 package.json 파일을 생성

   ```bash
   $ npm init -y
   ```

3. 변환 대상(개발 소스 코드) js 파일 저장을 위한 src 디렉토리 생성

   ```bash
   $ mkdir src
   ```

4. 변환 결과물(변환 배포 코드)를 저장을 위한 dist 디렉토리 생성

   ```bash
   $ mkdir dist
   ```

5. @babel/core와 @babel/cli 설치

   ```bash
   $ npm i --save-dev @babel/core @babel/cli 
   ```

6. src/ex01.js 에 간단한 ES6 코드 작성

   ```JavaScript
   'use strict'
   
   // 블록 스코프 변수(ES6)
   const users = [{
       no: 0,
       name: 'kickscar',
       email: 'kickscar@gmail.com'
   }, {
       no: 1,
       name: 'dooly',
       email: 'dooly@gmail.com'
   }];
   
   // 객체 분해(ES6)
   function print({
     no,
     name,
     email}) {
       // 템플릿 문자열(ES6)
       console.log(`${no} : ${name} : ${email}`);
   }
   
   // for..of(ES6)
   for(let user of users){
       print(user);
   }
   ```

7. 변환하기

   ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0080.png)

   + src 디렉토리의 모든 js파일을 dist 디렉토리(`--out-dir` 또는 `-d` 옵션)에 변환하는 명령이다.

   + `babel` 명령 패쓰가 너무 길면, `npx`(npm@5.2+)를 사용해서 간단히 할 수 있다.

     ```bash
     $ npx babel src --out-dir dist 
     ```

8. 결과 확인하기

   ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0082.png)

   + 결과를 보면, 코드가 변환되지 않았다.
   + 변환을 위해서는 변환 플러그인을 설치하고 지정해주어야 한다.
   + 다음 실습에서는 몇가지 플러그인을 사용해서 변환 작업을 한다.

#### 2-3. [실습] 바벨 플러그인을 사용하여 변환 작업 하기

1. 프로젝트 project-ex02 디렉토리를 생성

   ```bash
   $ mkdir project-ex02
   $ cd project-ex02
   ```

2. `npm init -y` 으로 package.json 파일을 생성

   ```bash
   $ npm init -y
   ```

3. 변환 대상(개발 소스 코드) js 파일 저장을 위한 src 디렉토리 생성

   ```bash
   $ mkdir src
   ```

4. 변환 결과물(변환 배포 코드)를 저장을 위한 dist 디렉토리 생성

   ```bash
   $ mkdir dist
   ```

5. @babel/core와 @babel/cli 설치

   ```bash
   $ npm i --save-dev @babel/core @babel/cli 
   ```

6. src/ex01.js 에 간단한 ES6 코드 작성

   ```JavaScript
   'use strict'
   
   // 1)블록 스코프 변수(ES6)
   const users = [{
       no: 0,
       name: 'kickscar',
       email: 'kickscar@gmail.com'
   }, {
       no: 1,
       name: 'dooly',
       email: 'dooly@gmail.com'
   }];
   
   // 2)객체(파라미터) 분해(ES6)
   function print({no, name, email}) {
       // 3)템플릿 문자열(ES6)
       console.log(`${no} : ${name} : ${email}`);
   }
   
   // 4)for..of(ES6)
   for(let user of users){
       print(user);
   }
   ```

7. 블록 스코프 변수 변환 : @babel/plugin-transform-block-scoping 플러그인 

   + 설치

     ```bash
     $ npm i --save-dev @babel/plugin-transform-block-scoping
     ```

   + 변환하기

     ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0084.png)

   + 결과확인

     ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0085.png)

8. 객체(파라미터) 분해 변환 : @babel/plugin-transform-parameters 플러그인

   + 설치

     ```bash
     $ npm i --save-dev @babel/plugin-transform-parameters
     ```

   + 변환하기

     ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0086.png)

   + 결과확인

     ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0087.png)

9. 템플릿 문자열  변환 : @babel/plugin-transform-template-literals 플러그인

   + 설치

     ```bash
     $ npm i --save-dev @babel/plugin-transform-template-literals
     ```

   + 변환하기

     ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0088.png)

   + 결과확인

     ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0089.png)

10. `for..of` 변환 : @babel/plugin-transform-for-of 플러그인

    + 설치

      ```bash
      $ npm i --save-dev @babel/plugin-transform-for-of
      ```

    + 변환하기

      ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0090.png)

    + 결과확인

      ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0091.png)

11. 모두 적용해 보기 : 

    + 변환하기

      ```bash
      $ npx babel src --out-dir dist --plugins @babel/plugin-transform-block-scoping --plugins @babel/plugin-transform-parameters --plugins @babel/plugin-transform-template-literals --plugins @babel/plugin-transform-for-of
      ```

    + 결과확인

      ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0093.png)

12. 트랜스컴파일이 잘되는 것을 확인할 수 있다. 

13. 해당 구문을 트랜스파일을 하기위해서는 해당 플러그인을 개별적으로 알아야 하는 것도 있지만 개별적 설치와 CLI에서 `--plugins` 옵션을 개별적으로 붙혀야 하는 것들이 불편해 보인다. 

14. 바벨의 프리셋은 이런 플러그인들을 모아 놓고 한 번에 적용하기 위한 플러그인들의 모음이다.

15. 프리셋의 종류는 다양하다. ECMAScript 년도별 프리셋, stage(0,1,2,3) 레벨별 프리셋 그리고 React 변환, Typescript 변환 프리셋 등이 있다. 문제는 이런 프리셋에 포함된 플러그인들이 프로젝트의 모든 코드에 일괄적으로 적용되어 변환하는 것이다. 만약, 프로젝트에 적용되지 말아야 할 플러그인이 있다면 문제가 발생할 수 있다.

16. 이런 문제를 해결한 것이 Env 프리셋이다. stage 3 이상 되는 문법의 플러그인들이 설치되며 babel.config.json로 다양하고 스마트한 변환 설정을 할 수 있다.

#### 2-4. [실습]  Env 프리셋을 사용하여 변환 작업 하기

1. 프로젝트 project-ex03 디렉토리를 생성

   ```bash
   $ mkdir project-ex03
   $ cd project-ex03
   ```

2. `npm init -y` 으로 package.json 파일을 생성

   ```bash
   $ npm init -y
   ```

3. 변환 대상(개발 소스 코드) js 파일 저장을 위한 src 디렉토리 생성

   ```bash
   $ mkdir src
   ```

4. 변환 결과물(변환 배포 코드)를 저장을 위한 dist 디렉토리 생성

   ```bash
   $ mkdir dist
   ```

5. @babel/core, @babel/cli 와 @babel/preset-env 설치

   ```bash
   $ npm i --save-dev @babel/core @babel/cli @babel/preset-env
   ```

6. 기본적으로 설치되는 플러그인 목록 확인

   ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0094.png)

7. src/ex01.js 에 간단한 ES6 코드 작성

   ```JavaScript
   'use strict'
   
   // 블록 스코프 변수(ES6)
   const users = [{
       no: 0,
       name: 'kickscar',
       email: 'kickscar@gmail.com'
   }, {
       no: 1,
       name: 'dooly',
       email: 'dooly@gmail.com'
   }];
   
   // 객체(파라미터) 분해(ES6)
   function print({no, name, email}) {
       // 템플릿 문자열(ES6)
       console.log(`${no} : ${name} : ${email}`);
   }
   
   // for..of(ES6)
   for(let user of users){
       print(user);
   }
   ```

8. 기본 설정으로 변환 테스트

   + babel.config.json 작성

     ```json
     {
         "presets": [
             [
                 "@babel/env",
                 {
                     "targets": {
                         "node": "current"
                     }
                 }
             ]
         ]
     }
     ```

     + 바벨 설정 파일은 .babelrc.js 였으나 babel7.x+ 에서는 **babel.config.json**에 JSON 형식으로 설정한다.

     + 설정 속성은 리졸브(resolve)라 불리는 presets, plugins 라는 이름과 배열로 여러 프리셋 및 플러그인들을 설정할 수 있다. presets 으로 예를 들면,

       `"presets": ["@babel/env", "@babel/preset-react", "@babel/preset-typescript"]` 

       이런 식 이다. 배열 요소로 프리셋 이름만 나열하면 각 프리셋 기본설정이 적용된다. 예제처럼 개별 프리셋의 세부 설정을 위해서는  ["프리셋 이름", {옵션} ]  형식을 사용한다. 예를 들면, 

       `"presets":[["@babel/env",{...}],"@babel/preset-react","@babel/preset-typescript"]`

        react, typescript 변환은 기본 설정을 따르고 ES6+ 변환은 {...} 옵션이 적용되는 세부 설정을 하겠다는 뜻이다. 

     + 예제의 설정은 바벨이 실행 될  JavaScript 런타임, Node의 ECMASScript 버젼을 타겟으로 변환하겠다는 뜻이다. [ES호환성 테이블](https://kangax.github.io/compat-table/es6/) 을 참고하면, Node8.x+ 부터는 ES6 표준을 지원하기 때문에 ex01.js의 ES6 코드 대부분은 변환되지 않을 것이다. 확인해 보자.

   + 변환하기

     ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0095.png)

   + 결과확인

     ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0096.png)

9. 플러그인 설정으로 변환하기

   + babel.config.json 작성

     ```json
     {
         "presets": [
             [
                 "@babel/env",
                 {
                     "targets": {
                         "node": "current"
                     }
                 }
             ]
         ],
         "plugins": [
             "@babel/plugin-transform-block-scoping",
             "@babel/plugin-transform-parameters",
             "@babel/plugin-transform-template-literals",
             "@babel/plugin-transform-for-of"
         ]
     }
     ```

     + presets @babel/env의 targets을 기준으로 변환 작업을 하지만  plugins을 설정하면 개별 플러그인들이 적용된 변환을 한다.

     + 플러그인들도 앞의 프리셋과 설정 방법이 같다. 기본설정이 아닌 세부 설정을 위해서는 배열을 통해 할 수 있다. 예를 들어 다음 설정을 보면, plugin-transform-block-scoping 플러그인의 throwIfClosureRequired 옵션은 변환 중에 closure 때문에 let/const로 함수 정의가 필요하다면 변환 예외를 던지겠다는 옵션이다.
     
       ```JSON
       "plugins": [
               [
                   "@babel/plugin-transform-block-scoping",
                   {
                       "throwIfClosureRequired": true
                   }
               ],
               "@babel/plugin-transform-parameters",
               "@babel/plugin-transform-template-literals",
               "@babel/plugin-transform-for-of"
           ] 
       ```
     
     + 플러그인들은 공통 옵션도 있지만 플러그인에 따라 자기만의 옵션이 있기 때문에 문서를 꼼꼼히 살펴 보는 것도 필요하다. 예제의 플러그인 문서들은 다음과 같다.
     
       [@babel/plugin-transform-block-scoping 참고](https://babeljs.io/docs/en/babel-plugin-transform-block-scoping)
     
       [@babel/plugin-transform-parameters 참고](https://babeljs.io/docs/en/babel-plugin-transform-parameters)
     
       [@babel/plugin-transform-template-literals 참고](https://babeljs.io/docs/en/babel-plugin-transform-template-literals)
     
       [@babel/plugin-transform-for-of 참고](https://babeljs.io/docs/en/babel-plugin-transform-for-of)
     
   + 변환하기

     ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0097.png)

   + 결과확인

     ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0098.png)

   

10. 브라우저 목록 설정으로 변환하기

    + 특정 프로젝트의 타겟이 되는 브라우저들과 각 브라우저들의 버젼을 지정하면 플러그인들을 자동으로 선택해서 변환하는 꽤 편리한 기능이며 Env 프리셋에서 주로하는 설정이기도 하다.

    + babel.config.json 작성 

      ```json
      {
          "presets": [
              [
                  "@babel/env",
                  {
                      "targets": {
                          "edge": "80",
                          "firefox": "73",
                          "chrome": "82",
                          "opera": "69",
                          "safari": "13"
                      }
                  }
              ]
          ]
      }
      ```

      + 우선, [ES호환성 테이블](https://kangax.github.io/compat-table/es6/) 를 참고하여 주요 브라우저의 최신버젼으로 설정하였다. 
      + 최신 브라우저들은 ES6를 지원하고 있기 때문에 변환 후, 결과를 보면 ES6 코드로 작성된 ex01.js 코드 대부분이 변환되어 있지 않을 것이다. 

    + 변환 후, 결과 확인 하기

      ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0099.png)

    + IE11를 지원하도록 babel.config.json 수정하고 변환 테스트를 해보자.

      ```json
      {
          "presets": [
              [
                  "@babel/env",
                  {
                      "targets": {
                          "ie": "11",
                          "edge": "80",
                          "firefox": "73",
                          "chrome": "82",
                          "opera": "69",
                          "safari": "13"
                      }
                  }
              ]
          ]
      }
      ```

      + [ES호환성 테이블](https://kangax.github.io/compat-table/es6/)을 참고하면, IE11은 ECMAScript 5까지만 지원한다. (ch01 참고)
      + 따라서, 이 변환 테스트에서는 앞의 플러그인들이 대부분 적용되어 변환되어 있을 것이다.

    + 변환 후, 결과 확인 하기

      ![](http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0100.png)   

