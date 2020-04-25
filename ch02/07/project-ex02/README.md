## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch02](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02) / [07](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07) / 실습 02. webpack.config.js 작성


### 1. project-ex02 프로젝트 생성

#### 1-1. 프로젝트 project-ex02 디렉토리 생성

   ```bash
   $ mkdir project-ex02
   $ cd project-ex02
   ```

#### 1-2. package.json 파일 생성

   ```bash
   $ npm init -y
   ```

#### 1-3. 웹팩 코어및 웹팩 CLI 도구 설치

   ```bash
   $ npm i -D webpack webpack-cli
   ```

#### 1-4. 애플리케이션 기능과 내용은 project-ex01과 같으므로 project-ex01의 public, src 디렉토리 복사한다.

   
### 2. webpack.config.js

   ​	웹팩은 다양한 옵션들을 제공하여 웹팩 로더와 플러그인을 이용한 변환을 할 수 있게 한다. 하지만 CLI에서 `webpack` 명령어와 모든 옵션 조합으로 웹팩을 실행하는 것은 작업하기가 불편하고 오류가 생길 가능성도 높다. 보통은 빌드와 관련된 모든 옵션 정보를 설정할 수 있는 설정 파일  webpack.config.js을 작성하여 별도의 옵션지정 없이 `webpack` 만을 실행한다.([웹팩 설정 문서 참고](https://webpack.js.org/configuration/))

#### 2.1 webpack.config.js 작성

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

   ​	프로젝트 project-ex02 디렉토리 바로 아래에 있어야 한다. 빌드를 위해 가장 기본적인 최소 구성을 하였다. project-ex01를 빌드하기 위해 주었던 옵션과 비교하면 내용은 바로 이해될 것이다. Node의 `path` 모듈의 `resolve` 함수를 사용하여 전체 경로를 만들었다. ([Node api 문서 : path.resolve 참고](https://nodejs.org/api/path.html#path_path_resolve_paths)) webpack.config.js 에서는 아직 es6 module 지원 문법을 사용할 수 없다. 

#### 2-2 빌드와 결과 확인하기

   별도의 옵션이 없는 `npx webpack` 명령으로 빌드가 가능한 것을 확인할 수 있다.

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0720.png" />

   
### 3. npm 스크립팅 : "start"

   ​	사실, npx라는 도구가 있어서 웹팩 로컬 설치 시, `wbpack` 명령 실행이 불편하지는 않다. 아래 처럼 npx를 사용하지 않고 바로  `webpack`  을 실행하려면 조금 불편해 보인다.

   ```bash
   $ node_modules/.bin/webpack 
   ```

   ​	개선 할 수 있는 방법은 npm 스크립팅을 사용하는 것이다. 스크립트 파일, 또는 코드를 작성하고 npm으로 실행할 수 있다. 즉, npm을 태스크 러너로 사용하는 것이다.

   

#### 3-1. package.json 파일 안의  `scripts` 섹션 수정

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

#### 3-2. `npm start` 명령으로 빌드

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0721.png" />

   
### 4. npm 스크립팅 : "build"

   ​	빌드 작업이기 때문에 기왕이면 명령어 이름이 build면 더 좋을 것 같다. start, test 와 같은 스크립트 이름은 npm으로 바로 실행할 수 있는 특수한 이름이고 다른 이름은 `npm run {스크립트이름}` 형식을 사용해야 한다. 스크립트 이름을 `buid`로 수정하고 `npm run build`로 다시 빌드 해보자.

   <img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0722.png" />
