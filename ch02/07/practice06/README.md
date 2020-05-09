## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch02](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02) / [07](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07) / 실습 06. CSS 번들링

### 1. 다양한 종류의 애셋 번들링
​	웹팩의 아주 특별난 특징 중에 하나는 JavaScript 뿐만 아니라 모든 종류의 파일들을 모듈로 취급한다는 것이다. [실습04. 간단한 웹펙 로더 작성](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/practice04) 은 애플리케리션에서 외부 텍스트 파일의 내용을 import하는 간단한 텍스트 로더를 직접 작성해 보는 실습 이었고 다른 실습 프로젝트에서도 이 로더를 계속 사용하고 있다.

​	웹팩은 다양한 애셋에 대한 다양한 로더([웹팩 지원 로더](https://webpack.js.org/loaders/) 참고)들을 제공하고 있다. 직접 작성한 text-loader도 사실은 웹팩의 Files 로더 중 raw-loader 로 대체할 수 있다. 이 뿐만 아니라 JSON, Styling, Template, Image, Framework(VueJS의 컴포넌트 파일 .vue와 같은)뿐만 아니라 3rd 파티 로더까지 포함하면 모든 종류의 외부 애셋 파일에 대한 로딩및 처리가 가능하다고 말할 수 있다.



### 2. 스타일시트

​	웹팩에서는 CSS처리를 위해 css-loader와 style-loader 두 가지 로더를 제공한다. 

1. **css-loader**

   css 파일의 @import와 url 문을 찾고 분석한다.

2. **style-loader**

   유효하다고 분석된 모든 스타일링 규칙을 JavaScript 코드로 변경한다.
   
   

### 3. CSS 파일 번들링 하기

​	앞의 실습 애플리케이션에 스타일링을 적용해 보고 직접 작성한 text-loader도 웹팩 raw-loader로 교체해 본다.

#### 3.1 디렉토리 생성

   ```bash
   $ mkdir project-ex01
   $ cd project-ex01
   ```

#### 3.2 메니페스트 생성

   ```bash
   $ npm init -y
   ```

#### 3.3. 패키지 설치

   ```bash
$ npm i -D webpack webpack-cli webpack-dev-server @babel/core babel-loader @babel/preset-env @babel/preset-react style-loader css-loader raw-loader react react-dom
   ```

1. **웹팩 패키지** : webpack webpack-cli webpack-dev-server
2. **babel 패키지** : @babel/core babel-loader @babel/preset-env @babel/preset-react
3. **스타일시트 패키지** : style-loader css-loader
4. **텍스트 파일 처리** : raw-loader(text-loader를 웹팩 raw-loader로 교체)
5. **react 라이브러리 패키지** : react, react-dom

#### 3-4. 애플리케이션 작성

3. 기능과 내용은 pratice05의 project-ex01과 같으므로 pratice05의 project-ex01에 있는 public, src 디렉토리및 webapck.config.js를 복사한다.

2. text-loader는 웹팩의 raw-loader로 대체하기 때문에 text-loader.js 는 필요없다. 삭제하도록 한다.

3. package.json의 "scripts" 내용을 수정한다.

   ```json
   "scripts": {
       "start": "node_modules/.bin/webpack-dev-server --progress",
     	"build": "node_modules/.bin/webpack"
   }
   ```

4. css 작성 (App.css)

   ```css
   .Header{
       width: 180px;
       text-align: center; 
       margin:100px auto;
       padding: 20px;
       border: 2px solid #999;
       color: #1144fe;
       background-color:#cec1c9
   }
   ```

5. App.js 수정

   ```JavaScript
   import React, { Component } from 'react';
   import content from './hello.txt';
   import './App.css'
   
   function App() {
       return (
           <h1 className='Header'>{ content }</h1>
       );
   }
   
   export default App;	
   ```

   App.css 파일을 모듈로 import하는 구문을 추가 하였고, txt 파일 import 구문은 수정이 없지만 raw-loader는 텍스트 파일 내용을 string 객체로 default export 하기 때문에 `{ context }` 로 수정해야 한다. 

#### 3-5. 로더 설정

​	webpack.config.js 에서 로더들의 설정을 한다.

```JavaScript
	.
	.
	.
    module: {
        rules: [{
            test: /\.txt$/i,
            loader: 'raw-loader'
        },{
            test: /\.js$/i,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }]
    },
	.
	.
	.
```

​	raw-loader로 수정한 것과 CSS 파일 처리를 위한 style-locader와 css-loader 설정을 추가 하였다. babel preset 설정은 이전 실습의 babel.confiog.json 를 변경없이 사용하면 된다.

#### 3-6. 개발 서버 실행

​	`npm start` 명령으로 webpack 개발 서버를 실행하고 브라우저에서 확인해 보자.

<img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0729.png" />

<img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0730.png" />



#### 3-7. @import 적용

​	Common.css 스타일시트 파일을 하나 더 작성하고 App.css 에서 import해서 스타일시트 사이의 의존성을 웹팩이 분석하여 번들링하는 것을 확인해 보자.

1. Commons.css 작성

   ```css
   html {
       box-sizing: border-box;
   }
   
   *, *:before, *:after {
       box-sizing: inherit
   }
   
   body {
       margin: 0;
       font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
       background-color:#dfdf99;
   }
   
   h1, h2, h3, h4, h5, h6 {
       margin:0;
       padding:0;
   }
   ```

   ​	`body`에 `background-color` 스타일링 속성을 추가 하였다. 반영이 된다면 `#dfdf99` 색으로 전체 배경색이 변경될 것이다.

2. App.css 수정

   ```CSS
   @import 'Common.css';
   
   .Header{
       width: 180px;
       text-align: center; 
       margin:100px auto;
       padding: 20px;
       border: 2px solid #999;
       color: #1144fe;
       background-color:#cec1c9
   }
   ```

   ​	@import 를 사용해 Common.css 를 import 한다.

3. 브라우저에서 확인

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0731.png" />



### 4. CSS 모듈

#### 4.1 React 라이브러리 패키지 설치링

```
npm i -D react react-dom
```

#### 4.2 리팩토링

1. App.js

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

​	이전 실습 예제의 App.js와 완전 동일한 React 함수를 작성하였고 React Component를 반환한다. 이전 실습에서 작성한 text-loader로 hello.txt 변환 작업을 해야한다. 코드를 보면 hello.txt안의 text를 이용하는 코드가 있다. ES6과 JSX로 작성된 코드 이며 JSX 코드와 React에 대한 내용은 [react-practices](https://github.com/kickscar-javascript/react-practices) 을 참고 한다.

2. index.js

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

​	바벨에 대한 개념 그리고 설정 및 사용 방법을 알고 있으면 바벨 로더 적용은 비교적 쉽다. 내용이 많거나 어렵지 않으니 [ch02 / 03. Babel : 트랜스컴파일러 도구](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/03) 을 참고해서 이해 하도록 한다.

#### 3.1 바벨 로더 설치

```
npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react
```

​	코드 변환 기본 기능을 위해 @babel/core 을 설치한다.바벨을 독립 도구로 사용하지 않고 웹팩 로더로 사용할 것이기 때문에 babel-cli 대신, babel-loader를 설치한다. 참고로 babel-loader는 babel 프로젝트에서 나왔기 때문에 @babel 패키지 스코프가 적용되지 않는다.

​	ES6 트랜스파일링을 위해 @babel/preset-env 프리셋을 설치한다. JSX 트랜스파일링을 위해 @babel/preset-react 프리셋을 설치한다.

#### 3.2 설정

1. 로더 설정 : webpack.config.js

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

​	이전 실습에서 작성하였던 text-loader 설정을 그대로 유지하였다.  바벨 로더 설정을 보면, React 코드가 작성된 js 파일을 대상으로 하였다. 그리고 패키지가 설치된 node_modules의 js 파일들은 제외하였다. text-loader와는 다르게 babel-loader는 npm 패키지로 설치 되었기 때문에 소스 파일의 경로가 필요없고 이름만 설정하면 된다.

2. 바벨 설정 : babel.config.json

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

​	외부에 설정한 바벨 설정 내용이다. 보통, 바벨 설정에서는 변환 규칙을 위해 프리셋과 플러그인 설정을 하게 된다. ES6 변환을 위한 @babel/env 프리셋과 React 변환을 위해 @babel/preset-react 프리셋 설정을 하였다. @babel/preset-react 프리셋은 기본 변환 규칙을 설정하였다.

​	@babel/env 는 타겟 브라우저들의 버전 설정으로 세세한 변환 규칙을 대신할 수 있다. 이렇게 하면 세세하게 문법 변환 규칙들을 설정을 하지 않아도 자동으로 변환 규칙들이 한 번에 적용되는 최근에 나온 preset-es2015를 대체하는 편리한 env 프리셋 기능이다.

### 4. 빌드 하기

   `npm run build` 명령으로 빌드해 보자

<img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0728.png" />

​	정상적으로 빌드가 되었다. 번들링된 번들 bundle.js 를 열어 보면 react와 관련된 주석과 코드들이 많이 보일 것이다.  

### 5. 개발 서버 실행

   `npm start` 명령어로 개발 서버를 실행해 보자.

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0717.png" />

​	hello.txt 의 내용을 수정해보고 바로 브라우저에 반영 되는가 확인해 보자. 그리고  App.js 에서 React 컴포넌트 JSX코드에서 &lt;h1&gt; 를 &lt;h5&gt; 또는 다른 태그로 수정하고 바로 브라우저에 반영 되는가 확인해 보자.