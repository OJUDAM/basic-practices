## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch02](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02) / [07](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07) / 실습 03. 웹팩 개발 서버


### 1. 웹팩 개발 서버

   로컬 개발을 위해 옵션으로 제공되는 내장 서버이다.  간단한 node express 애플리케이션이 실행되며 웹팩 구성에 따라 애셋을 빌드한 후 **메모리**에 반영한다. 개발 진행 중에 소스 파일이 변경되면 자동으로 다시 빌드한 후 메모리에 반영하고 브라우저에 리로딩 한다. 

### 2. 프로젝트 생성 및 설정

#### 2.1 디렉토리 생성

   ```bash
   $ mkdir project-ex03
   $ cd project-ex03
   ```

#### 2.2 메니페스트 생성

   ```bash
   $ npm init -y
   ```

#### 2.3. 웹팩 설치

   ```bash
   $ npm i -D webpack webpack-cli
   $ npx webpack -v
   ```

#### 2-4. 파일 복사 

​	애플리케이션 기능과 내용은 앞의 project-ex02와 같으므로 project-ex02의 public, src 디렉토리 복사한다. project-ex02의 webapck.config.js 도 복사한다.

#### 2-5. 웹팩 개발 서버 설치

   ```bash
   $ npm i -D webpack-dev-server
   ```



### 3. 웹팩 개발 서버 설정

​	webpack.config.js 설정 파일의  `devServer` 섹션으로 설정한다.

#### 3-1. 주요 설정 항목

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

#### 3-2. devServer 섹션 추가

​	color와 progress 옵션은 CLI에서 적용해야 하는 CLI Only 옵션이기 때문에 webpack.config.js에 설정하면 오류가 발생한다. 이 옵션의 적용은 뒤에 스크립팅 실습으로 적용해 본다.
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



### 4. 서버 실행

​	`npx webpack-dev-server` 명령으로 서버를 실행해 보자.

<img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0723.png" />	

​	public 디렉토리에 budle.js로 번들링되지 않아도 애플리케이션이 실행되는 것을 확인 할 수 있다. 메모리에 빌드해서 실행하기 때문이다. 간단히 애플리케이션의 코드를 수정하고 이 것이 바로 서버에서 실행 중인 애플케이션에 반영되는 live reloading 을 테스트 해보자.

App.js 모듈 수정

```javascript
export default function(){
    const app = document.createElement('h1');
    app.textContent = 'Hello Webpack'

    return app;
}
```

콘솔과 브라우저에서 확인

<img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0710.png" />

<img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0713.png"/>

### 5. npm 스크립팅 적용

#### 5-1. npm 스크립트 적용

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

​	CLI 옵션 `--progress`을 통해 서버가 시작될 때 콘솔에 진행 표시줄을 표시하게 했다. CLI 옵션 `--color=false` 을 통해서 콘솔 출력의 컬러링을 disable 한다.

#### 5-2. 서버 실행

<img src="http://image.kickscar.me:8080/markdown/javascript-practices/ch02-0724.png" />

​	서버가 실행되면서 진행 표시줄이 잠깐 표시된 것을 확인할 수 있을 것이다. 콘솔 출력에 커러링이 적용되지 않은 것을 확인할 수 있다.