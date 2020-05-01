## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch02](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02) / [07](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07) / 실습 01. 시작하기 

### 1. 프로젝트 생성 및 설정

#### 1.1 디렉토리 생성

   ```bash
   $ mkdir project-ex01
   $ cd project-ex01
   ```

#### 1.2 메니페스트 생성

   ```bash
   $ npm init -y
   ```

​	프로젝트의 페니페스트인 package.json 파일을 생성한다. 메니페스트 항목에 대한 몇가지 질문을 하는데 `-y` 옵션으로 기본으로 생성할 수 있다. 메니페스트 항목을 기본으로 설정해도 문제는 없다. 

#### 1.3. 웹팩 설치

   ```bash
   $ npm i -D webpack webpack-cli
   $ npx webpack -v
   ```

​	webpack core 패키지는 기본으로 설치해야하며 추가적으로 CLI 명령을 위해 CLI 도구 설치가 필요하다.  `webpack-cli` 도 반드시 함께 설치 한다. `i`는 설치 명령이고 `-D(--save-dev)` 는 이 프로젝트에만 설치하는 로컬(개발) 설치 옵션이다.

​	설치 후, `webpack -v` 명령으로 버젼확인 겸 제대로 설치되었는지 확인 해보자. webpack 스크립트를 실행하기 위해서는 `node_modules/.bin/webpack -v` 명령으로 설치되어있는 스크립트를 경로와 함께 실행해야 한다. npx는 긴 경로 이름을 생략할 수 있게 해주는 npm과 함께 설치되는 Node도구 이다. 

### 2. 프로젝트 구조 및 소스코드 작성

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0718.png" style="zoom:50%;" />

   ​  public 디렉토리에 애플리케이션의 화면에 해당하는 index.html이 존재한다. JavaScript로 작성할 애플리케이션 소스 코드는 src 디렉토리에 App.js와 index.js 이다. webpack을 통해 두 소스 파일이 public/bundle.js 파일로 번들링 되어 묶일 것이다.

#### 2-1. 디렉토리 생성

   ```bash
   $ mkdir src
   $ mkdir public
   ```

#### 2-2. index.html 작성

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

​	애플리케이션 화면과 애플리케이션이 다운로딩 되는 랜딩 html 파일이다. 브라우저는 애플리케이션이 번들링 된 번들 파일 bundle.js를 불러온다. 애플리케이션은 `id`가 'root'인 `div` 엘리멘트에 'Hello World' 가 포함된 `h1` 엘리멘트를 동적으로 추가 할 것이다. 브라우저에서 접근하는 파일이기 때문에 `public` 디렉토리에 작성한다.

#### 2-3. App.js  및 작성

   ```javascript
   export default function(){
       const app = document.createElement('h1');
       app.textContent = 'Hello World';
       return app;
   }
   ```

​	ES6 모듈 지원으로 작성된 JavaScript 모듈이고 간단한 함수 하나를 외부로 export 한다. 함수는 `DOM`에 텍스트 콘텐츠가 'Hello World' 인 `h1` 엘리멘트 객체를 생성하고 반환한다. 브라우저에서 접근하는 파일이 아니다. budle.js로 번들링이 되는 소스 파일이기 때문에 `src` 디렉토리에 작성한다.   

#### 2-4. index.js 작성

   ```javascript
      import App from './App';
      document
          .getElementById('root')
          .appendChild(App());
   ```

​	애플리케이션의 시작(**엔트리**, **Entry**) 이다. App라는 이름으로 import한 함수가 반환하는 엘리먼트 객체를  `id` 가 'root'인 `div` 엘리멘트의 자식 엘리멘트로 추가한다. 브라우저에서 접근하는 파일이 아니다. budle.js로 번들링이 되는 소스 파일이기 때문에 `src` 디렉토리에 작성한다.   

### 3. 빌드하기
<img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0719.png" />

​	빌드를 위한 명령은 `webpack` 이다. 최종 결과물인 번들 파일의 이름과 생성 디렉	토리를 지정하기 위해 `-o` 옵션을 사용했다. 주목할 것은 빌드 대상 파일을 하나하나 열거하거나 대상파일이 있는 디렉토리를 지정하지 않았다는 것이다. 애플리케이션의 **엔트리 포인트(Entry Point)**가 되는 소스 파일(index.js)만 지정했다. 이는 웹팩이 엔트리가 되는 index.js를 시작으로 전체 애플리케이션의 모듈 의존성 분석을 통해 의존성 파일을 자동으로 찾아 묶어주기 때문이다.  
​	warning의 내용은 프로파일링을 하지 않았기 때문이다. 실무 프로젝트에서는 프로파일링이 필요하다. 뒤의 예제에서는 실무 빌드를 위한 mode 설정을 통해 프로파일링을 할 것이기 때문에 지금은 신경 쓰지 않아도 된다.  결과를 보면 public 디렉토리에 번들링 된 budle.js가 생성된 것을 확인할 수 있다.

### 4. 결과확인
<img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0707.png" />