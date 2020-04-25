## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch02](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02) / [07](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07) / 실습 05. React 애플리케이션 번들링


### 1. project-ex05 생성

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

### 2. React 리팩토링

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

### 3. 바벨 로더 적용

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

### 4. 빌드 하기

   `npm run build` 명령으로 빌드해 보자

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0728.png" />

   - 정상적으로 빌드가 되었다.
   - 번들링된 번들 bundle.js 를 열어 보면 react와 관련된 주석과 코드들이 많이 보일 것이다.  

### 5. 개발 서버 실행

   `npm start` 명령어로 개발 서버를 실행해 보자.

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0717.png" />

   - hello.txt 의 내용을 수정해보고 즉시 반영되는 지 확인해 보자.
   - App.js 에서 React 컴포넌트 JSX코드에서 &lt;h1&gt; 를 &lt;h5&gt; 또는 다른 태그들로 수정하고 즉시 반영되는 지 확인해 보자.