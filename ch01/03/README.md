## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch01](https://github.com/kickscar-javascript/basic-practices/tree/master/ch01) / 03. CommonJS 와 AMD

### 1. JavaScript 모듈

#### 1-1. 필요성

​	JavaScript가 인기를 끌면서 주요 호스트 환경인 웹브라우저뿐만 아니라 서버사이드 스크립트와 같은 다양한 환경에서 사용해보려는 노력이 있었다.  다양한 환경의 다양한 형태의 애플리케이션을 개발할 수 있는 범용으로 JavaScript를 사용하기 위해서는 선결 조건은 모듈화이다.  JavaScript 모듈 표준 스펙의 제정 작업을 위한 2개의 프로젝트가 CommonJS와 AMD 이다.

​	ECMAScript6부터 정식으로 모듈 지원을 하기 시작했지만 그 전까지는 이 두 프로젝트가 JavaScript의 복잡한 애플리케이션, 라이브러리, 프레임워크등 모듈이 필요한 개발에 많은 도움을 주었고  ECMAScript6 표준 모듈 지원 스펙에도 영향을 주었다.

#### 1-2. JavaScript 모듈

​	JavaScript의 모듈을 코드에서 사용하고 프로그래밍에 적용하는 것은 [ch09. 모듈(Module)](https://github.com/kickscar-javascript/basic-practices/tree/master/ch09) 을 참고하고 여기서는 JavaScript의 모듈에 대한 이해를 돕는 내용을 정리한다.

1. **스코프**

   모듈 자신만의 독립적인 실행 영역을 의미한다. 모듈 스코프가 존재한다.

2. **정의**

   exports 객체를 이용한 모듈안에 함수, 변수, 객체 등을 정의한다.

3. **사용**

   require 함수를 이용하여 외부에서 모듈에 정의한 함수, 변수, 객체등을 사용한다.

   

### 2. CommonJS

#### 2-1. 소개

​	최초의 JavaScript 모듈화 프로젝트가 [CommonJS](http://www.commonjs.org/) 이었다. CommonJS는 모듈 명세 뿐만 아니라 다양한 API 규격으로 구성되어 있다. 이 중에 대표적인 것이 바로  JavaScript 모듈 명세이다. 

​	당시, ECMAScript 표준 명세에는 모듈에 대한 내용이 없었기 때문에 CommonJS의 모듈 스펙은 상당한 파급력을 가졌다. 처음에는 ServerJS 라는 이름으로 시작하였는데 이름에서 보듯, 서버사이드 스크립트의 모듈화에 집중하였다. 나중에  JavaScript를 범용(Common)으로 쓰자는 취지로 이름을 CommonJS로 바꾸었다. 

​	JavaScript 모듈 명세의 실질적인 표준 역활을 했다.  많은 프로젝트, 로더, 프레임워크들이 CommonJS 모듈 명세에 따라 모듈을 만들거나 모듈 로드 시스템을 만들었다.

#### 2-2. CommonJS 구현체 (프로젝트, 로더, 프레임워크, 플랫폼)

구현체는 CommonJS 기반의 새로운 프로젝트, 모듈(.JS) 파일을 로딩하는 로더, CommonJS 기반의 프레임워크 라이브러리나 플랫폼 등 다양하다. 반드시 CommonJS는 서버사이드의 구현체들만 활용해야 하는 것은 아니다. 하지만, CommonJS를 이용한 가장 주요한 플랫폼으로 Node.js가 있듯이 모듈화 명세 작업의 중점이 서버사이드 였고 명세의 간결함 등의 장점으로 서버사이드에 활용하였다.

1. [SpoutCore](https://sproutcore.com/)

   웹브라우저 로더

2. [PINF JavaScript Loader](https://github.com/pinf/loader-js)

   웹브라우저 로더

3. [Narwhal](https://github.com/tlrobinson/narwhal)

    Javascipt 클라이언트 애플리케이션 개발 플랫폼

4. [**Node.js**](http://nodejs.org)

   서버사이드 네트워크 애플리케이션 개발  플랫폼

### 3. AMD(Asynchronous Module Definition)

#### 3-1. 소개

​	[AMD](https://github.com/amdjs) 는 비동기 상황의 모듈 사용을 더 중점으로 한  CommonJS에서 빠져 나온 프로젝트이다. 비동기 상황은 네트워크상에서 여러 모듈을 다운로드 하는 상황으로 웹브라우저에서 여러 모듈을 다운로드 하는 것에 더 중점을 두었던 프로젝트이다. CommonJS가 브라우저 밖의 특히, 서버 사이드에서 JavaScript 모듈화에 중점을 두었기 때문에 AMD가 빠져나와 독립 프로젝트가 될 수 밖에 없었다.

#### 3-2. AMD 구현체

​	AMD가 서버사이드 플랫폼에 활용되지 않는 것은 아니지만 주요 구현체는 웹브라우저의 로더들이다. 필요한 파일을 네트워크를 통해 내려받아야 하는 웹브라우저에서는 AMD가 더 유연한 방법을 제공한다.

1. [RequireJS](http://requirejs.org/)

   웹브라우저 로더

2. [bdLoad](http://bdframework.org/bdLoad/)

   웹브라우저 로더

3. [Yabble](http://github.com/jbrantly/yabble)

   웹브라우저 로더

   

### 4. ECMAScript 2015(ES6)

​	ECMAScript Harmony 프로젝트의 성공적인 결과물 ECMAScript 2015 표준 명세에는 그 동안 빠져 있던 JavaScript 모듈에 대한 명세가 추가 되었다.

​	서버 사이드 모듈화 기능을 CommonJS에 의존하던 Node.js도 CommonJS 대신에 ECMAScript 2015로 대체하였다. ECMAScript 2015는 서버 사이드 뿐만 아니라 웹브라우저에서 지원해야 하는 비동기 모듈 로딩도 지원한다. 이 의미는 웹브라우저에서도 CommonJS나 AMD 기반의 별도의 로더가 필요없다는 뜻이다.

​	CommonJS 와 AMD가 ECMAScript 2015 표준 명세로 그 입지가 약해졌지만  ECMAScript 2015 표준 명세의 모듈 명세에 많은 기술적 영향과 아이디어를 제공하였다.