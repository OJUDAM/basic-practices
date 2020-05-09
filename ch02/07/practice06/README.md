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

1. 기능과 내용은 pratice05의 project-ex01과 같으므로 pratice05의 project-ex01에 있는 public, src 디렉토리및 webapck.config.js, babel.config.json를 복사한다.

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

​	JavaScript는 CommonJS및 AMD 프로젝트의 노력과 그리고 ES6의 성과로 모듈 지원을 자체적으로 하기 시작하면서 개발적 측면에서 급속한 발전을 이루어 냈다. 하지만, 웹 애플리케이션 화면을 꾸미는 스타일시트는 여러 파일로 분리는 가능하지만 최종적으로 브라우저에서 하나의 큰 스타일시트로 합쳐져 전역 선언을 그대로 유지할 수 없게끔 작성되어야 했다.

​	 이는 많은 문제점을 가지고 있다. 그 중에 제일 큰 문제점은 중복되는 스타일링 이름이다. 예를 들어 .header 라는 클래스 이름이 외부 CSS 라이브러리에 있고 개발하고 있는 애플리케이션의 스타일시트에도 있으면 충돌이 발생하여 의도한 스타일링이 적용안되는 상황같은 것으로 스타일시트의 유지 관리를 아주 어렵고 복잡하게 만든다.

​	 모듈은 명시적으로 선언된 코드의 독립적 단위를 보장하는 방법이다. 모듈간의 의존성을 최적화 도구로 관리하여 로드 순서까지 제어가 가능하게 한다.

​	 [CSS 모듈 프로젝트](https://github.com/css-modules/css-modules) 는 이러한 모듈의 장점을 CSS에 구현하고자 하는 프로젝트다.  웹팩은 이 프로젝트의 제안을 적극 수용하여 css-loader가 이를 기본적으로 지원하고 있다. 이는 Vue나 React와 같은 컴포넌트 기반의 프로그래밍 모델을 가지고 있는 프레임워크나 라이브러리를 사용하여 화면을 개발할 때 많은 장점을 가질 수 있다. CSS의 클래스 이름을 작성하는 컴포넌트 코드의 로컬 범위로 export하게되어 같은 CSS 클래스 이름의 충돌을 원천적으로 막아 안전하게 사용할 수 있다는 의미다. 실습으로 확인해 보자.          

#### 4.1 디렉토리 생성

   ```bash
   $ mkdir project-ex02
   $ cd project-ex02
   ```

#### 4.2 메니페스트 생성

   ```bash
   $ npm init -y
   ```

#### 4.3. 패키지 설치

   ```bash
$ npm i -D webpack webpack-cli webpack-dev-server @babel/core babel-loader @babel/preset-env @babel/preset-react style-loader css-loader react react-dom
   ```

​	txt 처리를 위한 raw-loader 설치를 뺐다. 이 번 실습에서는 사용하지 않는다. 

#### 4-4. 애플리케이션 작성

1. 앞의 project-ex01과 같으므로 project-ex01에 있는 public, src 디렉토리및 webapck.config.js, babel.config.json를 복사한다.

2. package.json의 "scripts" 내용을 수정한다.

   ```json
   "scripts": {
       "start": "node_modules/.bin/webpack-dev-server --progress",
     	"build": "node_modules/.bin/webpack"
   }
   ```

3. App.js 수정

   ```JavaScript
   import React, { Component, Fragment } from 'react';
   import styles from './App.css'
   
   import Banner01 from "./Banner01";
   import Banner02 from "./Banner02";
   
   export default function App() {
       return (
           <Fragment>
               <Banner01 />
               <Banner02 />
           </Fragment>
       );
   }
   ```

   기존의 App 화면 출력하던 부분을 컴포넌트 Banner01로  독립 CSS 모듈과 함께 옮길 것이다. 그리고 컴포넌트 Banner02를 작성하는 데 마찬가지로 독립 CSS 모듈을 가지고 있다. 그리고 두 개의 독립 CSS 모듈에는 스타일링은 다르지만 같은 클래스 이름 의 스타일시트가 각각의 컴포넌트에 개별적으로 적용되는지 확인해 볼 것이다.  

4. App.css

   ```css
   @import 'Common.css';
   ```

   사실 컴포넌트 App가 바로 Common.css를 import 해도 되지만 Banner01.css 로 옮길 스타일링만 빼고 그대로 유지 시켰다. 애플리케이션 전체 스타일링만 적용할 것이다.

5. Banner01.css

   ```css
   .Header {
       width: 180px;
       text-align: center; 
       margin:100px auto;
       padding: 20px;
       border: 2px solid #999;
       color: #1144fe;
       background-color:#c9c1cd;
   }
   ```

   css 모듈이 적용된 css 파일이 이전 일반 css 파일과 별반 차이가 없어 보이지만 사실, css 모듈를 위한 다양한 기능을 위한 규칙들로 작성할 수 있다. 자세한 내용은 [webpack css 로더 : modules 문서](https://webpack.js.org/loaders/css-loader/#modules) 를 참조 한다.

6. Banner01.js 

   ```JavaScript
   import React, { Component } from 'react';
   import styles from './Banner01.css';
   
   export default function Banner01() {
       return (
           <h1 className={ styles.Header }>Hello React</h1>
       );
   }
   ```

    css 모듈을 사용하기 때문에 styles라는 변수로 import 하였다. styles 변수로 클래스 이름에 접근한다.

7. Banner02.css

   ```css
   .Header{
       font-size: 0.75em;
       width: 180px;
       text-align: center;
       margin:10px auto;
       padding: 20px;
       border: 2px solid #999;
       color: #fe4411;
       background-color:#c9c1cd
   }
   ```

   Banner01.css 와 같은 클래스이름의 스타일시트다. 스타일링 내용은 다르다.

8. Banner02.js

   ```JavaScript
   import React, { Component } from 'react';
   import styles from './Banner02.css';
   
   export default function Banner02() {
       return (
           <h1 className={ styles.Header }>Hello CSS Module</h1>
       );
   }
   ```

   컴포넌트의 화면 텍스트와 적용 CSS 모듈만 빼고 Banner01과 완전 동일하다.

#### 4-5. css-loader 옵션 설정

​	css-loder의 옵션 중에 modules 옵션을 true로 설정하면 된다. 기본은 false 이다.

```javascript
   module: {
        rules: [{
            test: /\.css$/i,
            use: [{
                loader: 'style-loader'
            },{ 
                loader:'css-loader',
                options: {
                    modules: true
                }
            }]
        }]
    },
```

​	raw-loader 설정을 뺐다. 이 전의 스타일시트 로더 설정 `['style-loader', 'css-loader']`  는 기본 옵션으로 두 개의 로더를 설정했다. 하지만 이 실습에서는 CSS 모듈 지원을 위해 css-loader의 옵션 설정을 해야 한다. 이를 위해서는 `{ }` 안에 로더 설정을 해야한다. style-loader는 설정할 옵션이 없지만 css-load와 같은 모습으로 설정하였다.

#### 4-6. 개발 서버 실행

​	`npm start` 명령으로 webpack 개발 서버를 실행하고 브라우저에서 확인해 보면 두 CSS 파일이 같은 클래스 이름의 다른 스타일링이 적용되었지만 컴포넌트별로 개별적으로 적용되어 있음을 알 수 있다.

<img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0732.png" />



### 5. CSS 프로세서

