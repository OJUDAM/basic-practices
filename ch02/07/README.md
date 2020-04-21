## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch02](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02) / 07. Webpack : 모듈 번들러

### 1. 소개

#### 1-1 [웹팩](https://webpack.js.org/)이란?

1. 번들링(Bundling) 이란?

   - 번들의 사전적 의미는 `묶음` 이라는 뜻이다.
   - 원래 번들링이라는 용어는 두 개 이상의 다른 제품을 하나의 번들 상품으로 묶어 단일 가격으로 판매하는 상술을 가리키는 경제용어다.
   - JavaScript 애플리케이션 빌드에서 말하는 번들링은 두 개 이상의 다른 모듈을 하나의 번들 패키지로 묶는 것을 의미하며 웹팩은 번들링을 하는 모듈 번들러 도구이다.   

2. 웹 애플리케이션의 모듈

   - 클라이언트 애플리케이션들이 갈수록 복잡해지기 때문에 모듈화 개발이 필요하다. 그런데 모듈의 필요성이 처음 시작된 계기는 서버사이드 애플리케이션 개발을 위해 JavaScript의 범용화 노력으로 시작되었다. 당시는 JavaScript에는 모듈 기능이 없었기 때문에 외부 라이브러리([ch01/ 03. CommonJS와 AMD](https://github.com/kickscar-javascript/basic-practices/tree/master/ch01/03))에 의존 하였지만 ES6부터는 JavaScript 자체적으로 모듈 지원을 하기 때문에 현재는 별도의 외부 라이브러리는 필요 없다.
   -  JavaScript 모듈은 주로 클래스, 함수, 객체, 상수 등을 모아놓고 외부 애플리케이션들에서 공통으로 사용하는 라이브러리들을 의미한다. 그리고 규모가 있는 애플리케이션 개발에서는 개발 중인  JaveScript 코드들을 분리해서 모듈화 하고 의존관계를 부여하고 관리한다.

3. 번들링과 빌드 

   - 개발 중에 분리하여 개발한 모듈들은 최종적으로 하나로 합치는 번들링의 필요성은 있지만 필수는 아니다.
   - 서버사이드 개발(Node 기반)에서는 기본적으로 모듈 기능을 제공하기 때문에 애플리케이션 빌드와 배포에 따로 번들링을 할 필요가 없다.
   - 반면, 브라우저에서 동작하는 클라이언트 애플리케이션은 빌드 과정에 번들링을 하여야 한다. 거의 필수라 보면 된다. 서버사이드와 마찬가지로 최근에 브라우저들도 모듈 기능을 지원하기 시작 했지만 수십 개에서 수백 개의 다양한 애셋(HTML, JavaScript, CSS, Image, Font) 모듈들을 브라우저에서 개별적으로 import하는 것은 상식적으로도 상당히 비효율적이다. 따라서 하나의 번들로 묶어 브라우저에 전달하는 것이 할 수만 있다면 베스트인 것은 어렵지 않게 이해할 수 있다. 
   - [ch02. 개발도구와 개발환경 구성](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02) 에서도 다루었지만 애플리케이션의 빌드에는 번들링뿐만 아니라 린팅, 테스트, 트랜스컴파일, 압축/난독화, 문서화 등의 태스크가 필요하며 그리고 자동화를 위한 태스크 자동화 도구도 필요하다.
   - 빌드 태스크들 중에 번들링 태스크가 있는 것인 지, 번들링에 다양한 빌드 태스크가 포함 되어 있는 것인지 그 구분이 쫌 모호하고 관점에 따라 다를 수 있다. 개인적으로는 전자가 맞는 것 같지만, 번들링 도구라는 타이틀로 등장한 웹팩이 번들링뿐만 아니라 앞의 빌드 도구들의 태스크 실행 및 자동화도 하기 때문에 구분에 대한 모호함이 생긴 것 같다.
   - 구분이 중요한 것 같지는 않다. 중요한 것은 웹팩이라는 도구가 다양한 애셋 모듈에 대한 린팅, 테스트, 트랜스컴파일, 압축/난독화, 문서화 작업 등의 개별적 빌드 태스크들을 실행하고 최종적으로 하나의 번들로 묶어 패키징 한다는 것이다. 

4. 웹팩이 하는 작업

   + **모듈 관리**

     기본적으로 프로젝트 구조를 모듈 단위로 분석한다.

   + **번들링**

     JavaScript 모듈뿐만 아니라 다양한 애셋(HTML, CSS, Image, Font)들을 번들로 묶고 패키징한다.

   + **빌드 태스크 자동화**

     그런트나 걸프와 같은 태스크 자동화 도구(또는 빌드 도구)의 장점을 대체한다. 즉, 빌드 도구의 태스크 자동 실행 기능을 웹팩에서는 로더라는 형태로 대체하여 실행한다.

#### 1-2. 그런트 또는 걸프와의 차이점

1. 결론부터 말하면, 최종 번들로 묶인 결과물만 보면 사실 별 차이는 없다. 따라서 빌드와 번들링은 같은 용어라 여겨도 문제는 없다. 단지, 도구가 어떤 것에 중점과 장점을 가지고 있는가에 따라 다른 타이틀(태스크 자동화 도구인가? 번들링 도구인가? 이런...)이 앞에 붙는 것 같다.
2. [ch02/06. 태스크 자동화 도구](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/06) 에서 설명 했지만 그런트는 태스크 자동화 도구라 하고 걸프는 빌드 도구라 하는데 도구를 사용하는 목적과 결과는 별반 차이가 없다. 차이점은 설정, 과정, 그리고 내부 구현 등에서 차이가 있을 뿐이다.
3. 쉽게 생각해 볼 수 있는 그런트 또는 걸프와 웹팩의 차이점은 그런트와 걸프는 주 대상이 서버사이드 애플리케이션의 JavaScript 모듈에 대한 빌드와 배포이다. 웹팩은 클라이언트 애플리케이션의 JavaScript 뿐만 아니라 HTML, CSS, Image, Font 등의 다양한 애셋 모듈에 대한 빌드와 패키징이다. 
4. 하지만 오해하지 말아야 할 것은 반드시 이렇다는 것은 아니다. 그런트와 걸프로도 클라이언트 애플리케이션 빌드와 번들링이 가능하며 최근에는 웹팩으로도 서버 애플리케이션 빌드를 많이 하고 있는 추세다. 차이점을 설명하기 위한 구분일 뿐이다. 하지만 구분에 맞게 각각의 도구들의 장점을 이해하고 사용한다면 효율적으로 원하는 작업을 할 수 있을 것이다.
5. 그런트 또는 걸프 같은 빌드 도구와의 중요한 웹팩의 차이점이자 핵심 기능이라 할 수 있는 것은 빌드 과정에서 찾아 볼 수 있다.  웹팩의 방식이 쫌 더 직관적이고 빠르다 볼 수 있다. 그리고 웹팩이 널리 알려진 이유이기도 하기 때문에 약간의 이해가 필요하다.
   - ...
   - ... 그림으로 설명
   - ...
6. 추가 설명

### 2. 웹팩 실습

#### 1-1. [실습] 시작하기 : Hello World

1. 프로젝트 project-ex01 디렉토리 생성

   ```bash
   $ mkdir project-ex01
   $ cd project-ex01
   ```

2. `npm init -y` 으로 package.json 파일 생성

   ```bash
   $ npm init -y
   ```

3. 웹팩 코어와 웹팩 CLI 도구 설치

   ```bash
   $ npm i -D webpack webpack-cli
   $ npx webpack -v
   ```

4. 프로젝트 구조 및 소스코드 작성

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0718.png" style="zoom:50%;" />

   - public 디렉토리에 애플리케이션의 화면에 해당하는 index.html이 존재한다.

   - JavaScript로 작성할 애플리케이션 소스 코드는 src 디렉토리에 App.js와 index.js 이다.

   - webpack을 통해 두 소스 파일이 public/bundle.js 파일로 번들링 되어 묶일 것이다.

   - 디렉토리 생성

     ```bash
     $ mkdir src
     $ mkdir public
     ```

   - public/index.html 작성

     ```html
     <!DOCTYPE html>
     <head>
         <meta charset='utf-8'>
         <title>ch03/07. Webpack : 번들링 도구</title>
     </head>
     <body>
         <div id='root'></div>
         <script src='bundle.js'></script>
     </body>
     ```

     - 실습 애플리케이션 화면에 해당하는 html 파일이다.
     - 번들 파일 bundle.js를 불러온다.
     - 애플리케이션은 `id`가 'root'인 `div` 엘리멘트에 'Hello World' 가 포함된 `h1` 엘리멘트를 동적으로 추가 할 것이다.

   - src/App.js 작성

     ```javascript
     export default function(){
         const app = document.createElement('h1');
         app.textContent = 'Hello World';
         return app;
     }
     ```

     - ES6 모듈 지원으로 작성된 JavaScript 모듈로 간단한 함수 하나를 외부로 export 한다.
     - 함수는 `DOM`에 텍스트 콘텐츠가 'Hello World' 인 `h1` 엘리멘트 객체를 생성하고 반환한다.
     
- src/index.js 작성
  
  ```javascript
     import App from './App';
     document
         .getElementById('root')
         .appendChild(App());
  ```
  
  - 애플리케이션의 시작(**엔트리**, **Entry**) 이다.
     - App라는 이름으로 import한 함수가 반환하는 엘리먼트 객체를  `id` 가 'root'인 `div` 엘리멘트의 자식 엘리멘트로 추가한다.

5. 첫 번째 빌드

   - 빌드를 위한 명령은 `webpack` 이다. 최종 결과물인 번들 파일의 이름과 생성 디렉	토리를 지정하기 위해 `-o` 옵션을 사용했다.

     <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0719.png" />

   - 주목할 것은 빌드 대상 파일을 하나하나 열거하거나 대상파일이 있는 디렉토리를 지정하지 않았다는 것이다. 

   - 애플리케이션의 **엔트리 포인트(Entry Point)**가 되는 소스 파일(index.js)만 지정했다. 이는 웹팩이 엔트리가 되는 index.js를 시작으로 전체 애플리케이션의 모듈 의존성 분석을 통해 의존성 파일을 자동으로 찾아 묶어주기 때문이다. 

   - warning의 내용은 프로파일링을 하지 않았기 때문이다. 실무 프로젝트에서는 프로파일링이 필요하다. 뒤의 예제에서는 실무 빌드를 위한 mode 설정을 통해 프로파일링을 할 것이기 때문에 지금은 신경 쓰지 않아도 된다. 

   - 결과를 보면 public 디렉토리에 번들링 된 budle.js가 생성된 것을 확인할 수 있다.

6. 결과확인

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0707.png" />



#### 1-2. [실습] webpack.config.js 및 npm 스크립팅

1. project-ex02 프로젝트 생성

   - 프로젝트 project-ex02 디렉토리 생성

     ```bash
     $ mkdir project-ex02
     $ cd project-ex02
     ```

   - package.json 파일 생성

     ```bash
     $ npm init -y
     ```

   - 웹팩 코어및 웹팩 CLI 도구 설치

     ```bash
     $ npm i -D webpack webpack-cli
     ```
     
- 애플리케이션 기능과 내용은 project-ex01과 같으므로 project-ex01의 public, src 디렉토리 복사한다.
  
2. webpack.config.js

   - 웹팩은 다양한 옵션들을 제공하여 웹팩 로더와 플러그인을 이용한 변환을 할 수 있게 한다. 하지만 CLI에서 `webpack` 명령어와 모든 옵션 조합으로 웹팩을 실행하는 것은 작업하기가 불편하고 오류가 생길 가능성도 높다.

   - 보통은 빌드와 관련된 모든 옵션 정보를 설정할 수 있는 설정 파일  webpack.config.js을 작성하여 별도의 옵션지정 없이 `webpack` 만을 실행한다.([웹팩 설정 문서 참고](https://webpack.js.org/configuration/))

   - webpack.config.js 작성

     ```javascript
     const path = require('path');
     
     module.exports = {
         entry: path.resolve('src/index.js'),
         output: {
             path: path.resolve('public'),
             filename: 'bundle.js'
         }    
     }
     ```

     - 프로젝트 project-ex02 디렉토리 바로 아래에 있어야 한다.
     - 빌드를 위해 가장 기본적인 최소 구성을 하였다.
     - project-ex01를 빌드하기 위해 주었던 옵션과 비교하면 내용은 바로 이해될 것이다.
     - Node의 `path` 모듈의 `resolve` 함수를 사용하여 전체 경로를 만들었다. ([Node api 문서 : path.resolve 참고](https://nodejs.org/api/path.html#path_path_resolve_paths))
     - webpack.config.js 에서는 아직 es6 module 지원 문법을 사용할 수 없다. 

   - 빌드와 결과 확인하기

     별도의 옵션이 없는 `npx webpack` 명령으로 빌드가 가능한 것을 확인할 수 있다.

     <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0720.png" />

3. npm 스크립팅 : "start"

   - 사실, npx라는 도구가 있어서 웹팩 로컬 설치 시, `wbpack` 명령 실행이 불편하지는 않다.

   - 아래 처럼 npx를 사용하지 않고 바로  `webpack`  을 실행하려면 조금 불편해 보인다.

     ```bash
     $ node_modules/.bin/webpack 
     ```

   - 개선 할 수 있는 방법은 npm 스크립팅을 사용하는 것이다. 

   - 스크립트 파일, 또는 코드를 작성하고 npm으로 실행할 수 있다. 즉, npm을 태스크 러너로 사용하는 것이다.

   - package.json 파일 안에 `scripts` 섹션을 다음과 같이 수정 한다.

     ```json
     {
       "name": "project-ex02",
       "version": "1.0.0",
       "description": "",
       "main": "index.js",
       "scripts": {
         "start": "node_modules/.bin/webpack"
       },
       "keywords": [],
       "author": "",
       "license": "ISC",
       "devDependencies": {
         "webpack": "^4.42.1",
         "webpack-cli": "^3.3.11"
       },
       "dependencies": {}
     }
     ```

   - `npm start` 명령으로 빌드를 해보자.

     <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0721.png" />

4. npm 스크립팅 : "build"

   - 빌드 작업이기 때문에 기왕이면 명령어 이름이 build면 더 좋을 것 같다.

   - start, test 와 같은 스크립트 이름은 npm으로 바로 실행할 수 있는 특수한 이름이고 다른 이름은 `npm run {스크립트이름}` 형식을 사용해야 한다.

   - 스크립트 이름을 `buid`로 수정하고 `npm run build`로 다시 빌드 해보자.

     <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0722.png" />



#### 1-3. [실습] 웹팩 개발 서버

1. 웹팩 개발 서버

   - 로컬 개발을 위해 옵션으로 제공되는 내장 서버이다. 
   - 간단한 node express 애플리케이션이 실행되며 웹팩 구성에 따라 애셋을 빌드 한 후 **메모리**에 저장하고 소스 파일을 변경하면 자동으로 다시 빌드한 후 브라우저를 다시 고친다. 

2. project-ex03 프로젝트 생성

   - 프로젝트 project-ex03 디렉토리 생성

     ```bash
     $ mkdir project-ex03
     $ cd project-ex03
     ```

   - package.json 파일 생성

     ```bash
     $ npm init -y
     ```

   - 웹팩 코어및 웹팩 CLI 도구 설치

     ```bash
     $ npm i -D webpack webpack-cli
     ```
     
- 애플리케이션 기능과 내용은 앞의 project-ex02와 같으므로 project-ex02의 public, src 디렉토리 복사한다.
  
- project-ex02의 webapck.config.js 도 복사한다.
  
3. 웹팩 개발 서버 설치

   ```bash
   $ npm i -D webpack-dev-server
   ```

4. 웹팩 개발 서버 설정

   - webpack.config.js 구성 파일의 별도 `devServer` 섹션으로 설정한다.

   - 주요 설정 항목

     | 설정항목           | 설명                                                         |
     | ------------------ | ------------------------------------------------------------ |
     | contentBase        | 기본적으로 웹팩 개발서버는 프로젝트 루트에 있는 파일을 서비스한다. 다른 디렉토리의 파일을 서비스 하려면 이 항목으로 특정 콘텐츠 기반(content base)을 설정한다. |
     | host               | 서버가 실행되는 host 이름이다. 보통은 어떤 host에서 실행할 수 있도록 '0.0.0.0' 를 지정한다. |
     | port               | 서버가 서비스할 포트를 지정한다.(8080 기본)                  |
     | inline             | inline mode를 enable(true 기본) 한다. inline mode는 live reloading을 위해 번들에 스크립트를 추가 시킨다. liveReload 옵션이 enable(true 기본)되어 있어야 한다. |
     | liveReload         | live reloading/refreshing 기능을 enable(true 기본) 한다. hot 옵션이 disable(false 기본) 되어 있어야 하며 watchContentBase 옵션이 enable(true 기본) 되어 있어야 한다. |
     | hot                | Hot Module Replacement 라는 기능을 enable(false 기본) 한다. HMR은 웹팩을 널리 알려지게 한 핫(hot)한 기능 중에 하나다. 이 기능을 위해서는 플러그인 설치등 작업이 따로 필요하기 때문에 뒤에 자세히 실습을 한다. |
     | compress           | 서비스하는 모든 콘텐츠를 gzip 압축을 한다.                   |
     | color              | 서버가 콘솔에 출력하는 내용에 칼라링을 한다. 기본은 true이고 CLI Only(웹팩 서버 실행 명령어에 옵션 `--color` 로 적용) 이다. |
     | hisotryApiFallback | HTML5 history API를 지원하는 SPA(Single Page Application) 개발에 유용한 옵션이다.  애셋과 매핑되지 않은 모든 요청을 `/` 로 라우팅 시킨다. |
     | progress           | 애플리케이션 빌드 단계중에 콘솔에 진행 표시줄을 표시한다. CLI Only 이다. |

   - 위의 옵션을 적용한 devServer 섹션을 추가한 webpack.config.js 이다.

     color와 progress 옵션은 CLI에서 적용해야 하는 CLI Only 옵션이기 때문에 webpack.config.js에 설정하면 오류가 발생한다. 이 옵션의 적용은 뒤에서 실습해 본다.

     ```javascript
     const path = require('path');
     
     module.exports = {
         entry: path.resolve('src/index.js'),
         output: {
             path: path.resolve('public'),
             filename: 'bundle.js'
         },
         devServer: {
             contentBase: path.resolve('public'),
             host: '0.0.0.0',
             port: 9999,
             inline: true,
             liveReload: true,
             hot: false,
             compress: true,
             historyApiFallback: true
         }    
     }
     ```

5. 웹팩 개발 서버 실행

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0723.png" />

   - public 디렉토리에 budle.js가 번들링되지 않아도 애플리케이션이 실행되는 것을 확인 할 수 있다. 메모리에 빌드해서 실행하기 때문이다.

   - 간단히 애플리케이션의 코드를 수정하고 이 것이 바로 서버에서 실행 중인 애플케이션에 반영되는 live reloading 을 테스트 해보자.

     - App.js 모듈 수정

       ```javascript
       export default function(){
           const app = document.createElement('h1');
           app.textContent = 'Hello Webpack'
       
           return app;
       }
       ```

     - 콘솔과 브라우저에서 확인

       <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0710.png" />

       <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0713.png"/>

6. npm 스크립팅 적용

   - 다음과 같은 npm 스크립트를 적용해서 서버를 실행해 보자.

     ```json
     {
       "name": "project-ex03",
       "version": "1.0.0",
       "description": "",
       "main": "index.js",
       "scripts": {
         "start": "node_modules/.bin/webpack-dev-server --color=false --progress"
       },
       "keywords": [],
       "author": "",
       "license": "ISC",
       "devDependencies": {
         "webpack": "^4.42.1",
         "webpack-cli": "^3.3.11",
         "webpack-dev-server": "^3.10.3"
       }
     }
     ```

   - 서버 실행

     <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0724.png" />

     - CLI 옵션 `--progress`을 통해 서버 시작 시, 콘솔에 진행 표시줄이 잠깐 표시된 것을 확인할 수 있다.

     - CLI 옵션 `--color=false` 을 통해서 콘솔 출력의 컬러링을 disable 했다.

       

#### 1-4. [실습] 간단한 웹팩 로더 작성

1. 웹팩 로더

   - 번들링 작업 전에 린팅, 테스팅, 트랜스컴파일링, 압축/난독화, 문서화 등의 태스크 작업들을 해야 할 필요성이 있다.
   - 이와 같은 번들링 전의 전처리성 작업을 하는 개별적 도구들을 웹팩은 로더라는 이름으로 지원한다.
   - ch02. 개발도구와 개발환경 구성의 01~06 에서 개별적 도구들을 독립적으로 설치하고 설정과 사용 방법등을 알아 보았다. 이 도구들의 대부분은 웹팩의 번들링 전처리 지원을 위해 별도의 로더들을 대부분 지원하고 있다.
   - 번들로 묶기 전에 필요한 전처리가 있으면 그 전처리를 하는 도구의 웹팩 로더 설치하고 설정해야 한다. 그리고 빌드를 하면 웹팩은 그 로더를 실행하고 로더는 정해진 전처리를 한다. 그 후, 그 결과물들을 번들로 묶는 작업을 하게 된다.
   - 실습에서는 텍스트 파일의 전처리를 하는 text-loader를 직접 작성해 본다. 그리고 로더 설정을 하고 빌드 후 번들에 전처리 결과가 어떻게 적용되어 있는 지 확인해 볼 것이다.

2. 웹팩 로더 설정

   - webpack.config.js 의 `modules` 섹션에서 로더들을 설정한다.
   - 로더의 설정은 크게 두 부분으로 나누어 볼 수 있다.
     - 번들링 전처리로 사용하는 로더들을 지정하는 설정
     - 로더들의 개별적 기능과 관련된 설정
     - 로더의 기능과 관련된 개별적 설정은 `modules` 섹션의 웹팩 로더를 지정하는 설정과 함께 할 수 있다. 하지만 이 방법은  webpack.config.js 가 복잡해지고 방대 해지는 문제점이 있다. 따라서 외부에 로더별로 개별적으로 설정하는 방법이 일반적이다.

3. project-ex04 생성

   - 프로젝트 project-ex04 디렉토리 생성

     ```bash
     $ mkdir project-ex04
     $ cd project-ex04
     ```

   - package.json 파일 생성

     ```bash
     $ npm init -y
     ```

   - 웹팩 코어, 웹팩 CLI 도구 및  웹팩 개발 서버 설치

     ```bash
     $ npm i -D webpack webpack-cli webpack-dev-server
     ```

   - 애플리케이션 기능과 내용은 앞의 project-ex03 과 같으므로 project-ex03의 public, src 디렉토리 복사한다.

   - project-ex03의 webapck.config.js 도 복사한다.

   - package.json의 "scripts" 내용을 수정한다.

     ```javascript
     "scripts": {
         "start": "node_modules/.bin/webpack-dev-server --progress",
       	"build": "node_modules/.bin/webpack"
     }
     ```

     - start : 로더 전처리 결과를 브라우저 화면에서 확인하기 위해 개발 서버 실행 스크립트 이다.
     - build: 로더 전처리 결과를 bundle.js 번들 파일에서 JavaScript 코드로 확인하기 위한 빌드 스크립트 이다. 

   - 개발 서버 실행 또는 빌드를 해보고 프로젝트에 문제가 없는지 확인 해보자.

4. 로더 작성 : text-loader.js

   ```javascript
   module.exports = function(source) {
       console.log('text-loader preprocessing...:' + source);
       return `module.exports = { text: '${ source }'}`;
   }
   ```

   - 로더의 코드는 비교적 간단하다. 전처리를 하는 함수를 하나 export 하는 것이 전부다.
   - 전처리 대상이 되는 파일의 내용을 source 로 전달 받아서 전처리를 한 다음 export구문의 문자열을 반환하면 된다. 반환하는 문자열은 JavaScript 코드여야 한다. 
   - text-loader는 hello.txt 안의 내용을 source로 받아 간단한 객체의 text 속성의 값으로 세팅한 후 그 객체를 export 하는 문자열을 반환한다. 

5. 애플리케이션 수정 : App.js

   ```javascript
   var content = require('./hello.txt');
   
   export default function(){
       const app = document.createElement('h1');
       app.textContent = content.text;
   
       return app;
   }
   ```

   - 애플리케이션의 엔트리 포인트는 index.js 이다.  웹팩은 index.js를 시작으로 의존성 트리를 빌드하고 해당 파일의 전처리 로더에 전처리를 맡긴다. 의존성 트리를 만들 수 있는 명령은 다음과 같다.
     - import
     - require
     - url
   - index.js 를 보면 App.js를 import한다. 따라서 App.js는 의존성 트리에 추가되고 전처리 대상이 된다.
   - App.js를 보면 hello.txt를 require로 로딩하기 때문에 hello.txt도 의존성 트리에 추가되고 전처리 대상이 된다.
   - 그런데 사실, 아직 전처리를 위한 로더를 설정하지 않았기 때문에 아직 전처리 대상은 없다.
   - 웹팩이 엔트리 포인트 index.js를 시작으로 의존성 트리를 빌드하고 전처리 대상을 탐색 한다는 것을 언급한 것이고 만일, 해당 파일에 대한 전처리 로더가 설정되어 있다면 전처리가 이루어 졌을 것이다.
   - 그러면 확장자 txt 파일의 전처리를 위한 text-loader를 설정해 보자.  

6. text 파일 추가 : hello.txt

   ```text
   Hello World
   ```

   - "Hello World" 문자열이 브라우저 화면에 출력 될 것이다.

7. text-loader 로더 설정 : webpack.config.js

   ```javascript
   module.exports = {
   	.
   	.
       module: {
           rules: [{
           	test: /\.txt$/,
           	loader: path.resolve('src/text-loader.js')
           }]
       },
   	.
   	.
   ```

   - `module` 섹션에서 로더 설정을 한다.

   - `rules` 속성에 로더 설정 객체를 배열 요소로 설정하면 된다.
   - 확장자 txt 파일에 대한 전처리 로더로 위에서 작성한 text.loader를 설정하였다.

8. 빌드하기

   - `npm run build` 로 빌드를 한다.

     <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0726.png" />

   - text-loader의 전처리 내용 : bundle.js 에서 발췌

     ```javascript
     function(e,t){
     	e.exports={text:"Hello World"}
     }
     ```

     - 난독화가 되어있기 때문에 전체 코드의 분석을 위해서는 시간이 다소 걸리지만 대략, text-loader에 작성한 처리대로  hello.txt의 내용이 코드화 된 것을 확인할 수 있다.
     - 브라우저에서 애플리케이션이 잘 동작하는 지 확인해보자. 

9. 개발 서버 실행

   - `npm start` 명령으로 개발 서버를 실행하고 브라우저로 접근해 보자

     <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0714.png" />

   - hello.txt 의 내용을 수정하면 다시 번들링 하는 것을 콘솔에서 확인 할 수 있다. 브라우저에서 변경 내용을 확인해 보자.

     <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0727.png" />

     

#### 1-5. [실습] 바벨 로더를 사용한 React 애플리케이션 번들링

1. project-ex05 생성

   - 프로젝트 project-ex05 디렉토리 생성

     ```bash
     $ mkdir project-ex05
     $ cd project-ex05
     ```

   - package.json 파일 생성

     ```bash
     $ npm init -y
     ```

   - 웹팩 코어, 웹팩 CLI 도구 및  웹팩 개발 서버 설치

     ```bash
     $ npm i -D webpack webpack-cli webpack-dev-server
     ```

   - 애플리케이션 기능과 내용은 앞의 project-ex04 과 같으므로 project-ex04의 public, src 디렉토리 복사한다.

   - project-ex04의 webapck.config.js 도 복사한다.

   - package.json의 "scripts" 내용을 수정한다.

     ```javascript
     "scripts": {
         "start": "node_modules/.bin/webpack-dev-server --progress",
       	"build": "node_modules/.bin/webpack"
     }
     ```

   - 개발 서버 실행 또는 빌드를 해보고 프로젝트에 문제가 없는지 확인 해보자.

2. React 리팩토링

   - 지금까지의 실습에 사용하였던 애플리케이션을 React(JSX, ES6) 코드로 리팩토링 할 것이다.

   - react, react-dom 패키지 설치

     ```
     npm i -D react react-dom
     ```

   - 리팩토링 : App.js

     ```jsx
     import React, { Component } from 'react';
     import content from './hello.txt';
     
     function App() {
         return (
             <h1>{ content.text }</h1>
         );
     }
     
     export default App;
     ```

     - 이전 실습 예제의 App.js와 완전 동일한 React 함수를 작성하였고 React Component를 반환한다.
     - 이전 실습에서 작성한 text-loader로 hello.txt 변환 작업을 해야한다. 코드를 보면 hello.txt안의 text를 이용하는 코드가 있다.
     - ES6과 JSX로 작성된 코드 이며 JSX 코드와 React에 대한 내용은 [react-practices](https://github.com/kickscar/react-practices) 참고 한다.

   - 리팩토링: index.js

     ```JSX
     import React from 'react';
     import ReactDOM from 'react-dom';
     import App from './App';
     
     ReactDOM.render(
         <React.StrictMode>
           <App />
         </React.StrictMode>,
         document.getElementById('root')
     );
     ```

3. 바벨 로더 적용

   - 바벨에 대한 개념 그리고 설정 및 사용 방법 등을 알고 있으면 바벨 로더 적용은 비교적 쉽다. ([ch02 / 03. Babel : 트랜스컴파일러 도구](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/03) 참고)

   - 바벨 로더 설치

     ```
     npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react
     ```

     - 코드 변환 기본 기능을 위해 @babel/core 을 설치한다.
     - 바벨을 독립 도구로 사용하지 않고 웹팩 로더로 사용할 것이기 때문에 babel-cli 대신, babel-loader를 설치한다. (babel-loader는 @babel 패키지 스코프가 적용되지 않는다.)
     - ES6 트랜스파일링을 위해 @babel/preset-env 프리셋을 설치한다.
     - JSX 트랜스파일링을 위해 @babel/preset-react 프리셋을 설치한다.

   - 바벨 로더 설정 : webpack.config.js

     ```JavaScript
     	.
     	.
     	.
         module: {
             rules: [{
                 test: /\.txt$/,
                 loader: path.resolve('src/text-loader.js')
             },{
                 test: /\.js$/,
                 exclude: /node_modules/,
                 loader: 'babel-loader'
             }]
         },
     	.
     	.
     	.
     ```

     - 이전 실습에서 작성하였던 text-loader 설정을 그대로 유지하였다.  
     - 바벨 로더 설정을 보면, React 코드가 작성된 js 파일을 대상으로 하였다. 그리고 패키지가 설치된 node_modules의 js 파일들은 제외하였다.
     - text-loader와는 다르게 babel-loader는 npm 패키지로 설치 되었기 때문에 소스 파일의 경로가 필요없고 이름만 설정해 주면 된다.

   - 바벨 설정 : babel.config.json

     ```json
     {
         "presets": [["@babel/env", {
             "targets": {
                 "ie": "11",
                 "edge": "80",
                 "firefox": "73",
                 "chrome": "82",
                 "opera": "69",
                 "safari": "13"
             }
         }], "@babel/preset-react"]
     }
     ```

     - 외부에 설정한 바벨 설정 내용이다. 이를 제대로 이해하기 위해서는 바벨에 대한 경험이 있어야 한다.  ([ch02 / 03. Babel : 트랜스컴파일러 도구](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/03) 참고)
     - 보통, 바벨 설정에서는 변환 규칙을 위해 프리셋과 플러그인 설정을 하게 된다.
     - ES6 변환을 위한 @babel/env 프리셋과 React 변환을 위해 @babel/preset-react 프리셋 설정을 하였다.
     - @babel/preset-react 프리셋은 기본 변환 규칙을 설정하였다. 
     - @babel/env 는 타겟 브라우저들의 버전 설정으로 세세한 변환 규칙을 대신할 수 있다. 이렇게 하면 세세하게 문법 변환 규칙들을 설정을 하지 않아도 자동으로 변환 규칙들이 한 번에 적용되는 편리한 env 프리셋의 기능이다.

4. 빌드 하기

   `npm run build` 명령으로 빌드해 보자

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0728.png" />

   - 정상적으로 빌드가 되었다.
   - 번들링된 번들 bundle.js 를 열어 보면 react와 관련된 주석과 코드들이 많이 보일 것이다.  

5. 개발 서버 실행

   `npm start` 명령어로 개발 서버를 실행해 보자.

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0717.png" />

   - hello.txt 의 내용을 수정해보고 즉시 반영되는 지 확인해 보자.
   - App.js 에서 React 컴포넌트 JSX코드에서 &lt;h1&gt; 를 &lt;h5&gt; 또는 다른 태그들로 수정하고 즉시 반영되는 지 확인해 보자.

   

#### 1-6. [실습] CSS 애셋 번들링



#### 1-7. [실습] Image 애셋 번들링



#### 1-8. [실습] 플러그인 : html-webpack-plugin 를 활용한 번들 통합 html5 문서 생성



#### 1-9. [실습] 소스맵



#### 1-10. [실습] HMR(Hot Module Replacement)



#### 1-11. [실습] 프로파일링 : Development와 Production mode별 번들링



#### 1-12. [실습] 최적화 플러그인 이용한 번들링



#### 1-13. [실습] 해시를 사용한 번들 캐싱 기능 향상

