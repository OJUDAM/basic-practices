## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch02](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02) / 07. Webpack : 모듈 번들러

### 1. 소개

#### 1 [웹팩](https://webpack.js.org/)이란?

1. 번들링(Bundling) 이란?

   ​	번들의 사전적 의미는 `묶음` 이라는 뜻이다.원래 번들링이라는 용어는 두 개 이상의 다른 제품을 하나의 번들 상품으로 묶어 단일 가격으로 판매하는 상술을 가리키는 경제용어다. JavaScript 애플리케이션 빌드에서 말하는 번들링은 두 개 이상의 다른 모듈을 하나의 번들 패키지로 묶는 것을 의미하며 웹팩은 번들링을 하는 모듈 번들러 도구이다. 

     

2. 웹 애플리케이션의 모듈

   ​	클라이언트 애플리케이션들이 갈수록 복잡해지기 때문에 모듈화 개발이 필요하다. 그런데 모듈의 필요성이 처음 시작된 계기는 서버사이드 애플리케이션 개발을 위해 JavaScript의 범용화 노력으로 시작되었다. 당시는 JavaScript에는 모듈 기능이 없었기 때문에 외부 라이브러리([ch01/ 03. CommonJS와 AMD](https://github.com/kickscar-javascript/basic-practices/tree/master/ch01/03))에 의존 하였지만 ES6부터는 JavaScript 자체적으로 모듈 지원을 하기 때문에 현재는 별도의 외부 라이브러리는 필요 없다.

   ​	JavaScript 모듈은 주로 클래스, 함수, 객체, 상수 등을 모아놓고 외부 애플리케이션들에서 공통으로 사용하는 라이브러리들을 의미한다. 그리고 규모가 있는 애플리케이션 개발에서는 개발 중인  JaveScript 코드들을 분리해서 모듈화 하고 의존관계를 부여하고 관리한다.

   

3. 번들링과 빌드 

   ​	개발 중에 분리하여 개발한 모듈들은 최종적으로 하나로 합치는 번들링의 필요성은 있지만 필수는 아니다. 서버사이드 개발(Node 기반)에서는 기본적으로 모듈 기능을 제공하기 때문에 애플리케이션 빌드와 배포에 따로 번들링을 할 필요가 없다.

   ​	반면, 브라우저에서 동작하는 클라이언트 애플리케이션은 빌드 과정에 번들링을 하여야 한다. 거의 필수라 보면 된다. 서버사이드와 마찬가지로 최근에 브라우저들도 모듈 기능을 지원하기 시작 했지만 수십 개에서 수백 개의 다양한 애셋(HTML, JavaScript, CSS, Image, Font) 모듈들을 브라우저에서 개별적으로 import하는 것은 상식적으로도 상당히 비효율적이다. 따라서, 하나의 번들로 묶어 브라우저에 전달하는 것이 할 수만 있다면 베스트인 것은 어렵지 않게 이해할 수 있다. 

   ​	[ch02. 개발도구와 개발환경 구성](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02) 에서도 다루었지만 애플리케이션의 빌드에는 번들링뿐만 아니라 린팅, 테스트, 트랜스컴파일, 압축/난독화, 문서화 등의 태스크가 필요하며 그리고 자동화를 위한 태스크 자동화도 필요하다. 웹팩은 다양한 애셋 모듈에 대한 린팅, 테스트, 트랜스컴파일, 압축/난독화, 문서화 작업 등의 개별적 빌드 태스크들을 실행하고 최종적으로 하나의 번들로 묶어 패키징까지 하는 빌드 도구이다. 

   

4. 웹팩이 하는 작업

   4-1. **모듈 관리**

   기본적으로 프로젝트 구조를 모듈 단위로 분석한다.

   4-2. **번들링**

   JavaScript 모듈뿐만 아니라 다양한 애셋(HTML, CSS, Image, Font)들을 번들로 묶고 패키징한다.

   4-3. **빌드 태스크 자동화**

   ​	그런트나 걸프와 같은 태스크 자동화 도구(또는 빌드 도구)의 장점을 대체한다. 즉, 빌드 도구의 태스크 자동 실행 기능을 웹팩에서는 로더라는 형태로 대체하여 실행한다.

   

#### 2. 그런트 또는 걸프와의 차이점

​	결론부터 말하면, 최종 번들로 묶인 결과물만 보면 사실 별 차이는 없다. 따라서 빌드와 번들링은 같은 용어라 여겨도 문제는 없다. 단지, 도구가 어떤 것에 중점과 장점을 가지고 있는가에 따라 다른 타이틀(태스크 자동화 도구인가? 번들링 도구인가? 이런...)이 앞에 붙는 것 같다.

​	[ch02/06. 태스크 자동화 도구](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/06) 에서 설명 했지만 그런트는 태스크 자동화 도구라 하고 걸프는 빌드 도구라 하는데 도구를 사용하는 목적과 결과는 별반 차이가 없다. 차이점은 설정, 과정, 그리고 내부 구현 등에서 차이가 있을 뿐이다.

​	두 도구와의 웹팩의 차이점은 모듈 번들러란 이름에도 있지만 모듈간의 의존성을 분석해 모듈들을 번들링 한다는 것이다. 빌드 도구가 모듈간의 의존성을 알고 있으면 빌드를 할 때 할 수 있는 것이 많다. 특히 서버사이드 애플리케이션보다 브라우저 베이스 어플리케이션의 빌드에 큰 장점이 있다. 웹팩은 클라이언트 애플리케이션의 JavaScript 뿐만 아니라 HTML, CSS, Image, Font 등의 다양한 애셋 모듈에 대한 빌드와 패키징이다. 

​	그리고 차이점이기도 하지만 웹팩만이 가지는 중요한 핵심 기능이라 할 수 있는 것은 빌드 과정에서 찾아 볼 수 있다.  웹팩의 방식이 쫌 더 직관적이고 빠르다 볼 수 있다. 그리고 웹팩이 널리 알려진 이유이기도 하기 때문에 약간의 이해가 필요하다

[추가 설명]

13개의 웹팩 실습을 통해 웹팩의 자세한 설정과 로더와 플러그인 등의 역활과 기능 등을 이해해 보도록 한다. 13개 실습을 이해하게 되면 react나 vue 기반의 클라이언트 어플리케이션을 개발할 때 별도의 도구의 도움 없이도 빌드및 테스트 서버 환경 등을 직접 설정할 수 있을 것이다. 

​	물론, 직접 설정보다는 별도로 제공되는 CLI 도구를 사용것이 편리하긴 하지만, 이해를 하고 쓰는 것과는 분명히 다르며 자동 빌드 배포 환경 구성 시, 다양한 백엔드 환경과의 통합 구성을 계획하는 데에도 도움이 될 것이다.      

### 2. 웹팩 실습

#### [실습 01. 시작하기](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex01)
#### [실습 02. webpack.config.js 작성](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex02)
#### [실습 03. 웹팩 개발 서버](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex03)
#### [실습 04. 간단한 웹팩 로더 작성](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex04)
#### [실습 05. React 애플리케이션 번들링](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex05)
#### [실습 06. CSS 애셋 번들링](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex06)
#### [실습 07. Image 애셋 번들링](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex07)
#### [실습 08. 번들 통합 html5 문서 생성](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex08)
#### [실습 09. 소스맵](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex09)
#### [실습 10. HMR](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex10)
#### [실습 11. mode별 번들링](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex11)
#### [실습 12. 번들링 최적화](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex12)
#### [실습 13. 번들 캐싱 향상](https://github.com/kickscar-javascript/basic-practices/tree/master/ch02/07/project-ex13)

