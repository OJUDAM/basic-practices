## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch01](https://github.com/kickscar-javascript/basic-practices/tree/master/ch01) / 05. 주요 Library와 Frameworks 

#### 1-1. jQuery

1. 클라이언트 사이드의 DOM 조작(Manipulation)을 쉽게 할 수 있도록 작성된 JavaScript 라이브러리

2. 존레식에 의해 2006년 개발되어 발표된 이래 현재 가장 인기있는 JavaScript 라이브러리이다.

3. 기능

   + DOM 탐색 및 수정
   + CSS 셀렉터에 기반한 DOM 조작
   + 이벤트
   + Ajax 및 JSON 파싱
   + 멀티브라우저 지원 (파이어폭스, 크롬, 사파리, 오페라, 1.x for IE6, 2.x for IE9)
   + 유틸리티와 호환성 메소드 지원
   + 플러그인을 통한 확장성

4. 주요 버젼

   + v1.0 (2006년 8월) : 첫번째 안정화 버젼

   + v1.3 (2009년 1월) : Sizzle Selector 내장

   + v1.4 (2010년 1월) : 메이저 업데이트

   + v1.6 (2011년 5월) : attr()와 val() 함수의 큰 성능향상

   + v2.0 (2013년 4월) : 2.x 버전의 IE 6 ~ 8 버전 지원 중단 1.x는 계속지원

   + v3.0 (2016년 6월) : Promises/A+ 와 HTML5 호환성 개선

   + v.3.1(2016년 7월) : jQuery.readyException 추가

     

#### 1-2. Backbone.js

1. 블라블라~
2. 블라블라2

#### 1-3. React

1. 클라이언트 사이드의 유저 인터페이스 개발에 쓰이는 JavaScript 라이브러리이다.
2. 다른 웹 프레임워크가 MVC, MVW 등의 구조를 지향하는데 반해 리액트는 오직 View만 담당하는데 이는 프레임워크라기 보다는 라이브러리라 볼 수 있다.
3. 컴포넌트 단위로 애플리케이션을 구성하게 된다.
4. 라우터, Ajax, 상태관리를 위해서는 보통 프레임워크는 이를 다 내장하고 있지만 리액트는 따로 사용해야 한다.
5. 보통, 라우팅에는 react-router, Ajax에는 axios, fetch, 상태 관리를 위해서는 redux, MobX 등을 사용한다.  
6. 리액트만 배워야 하는 것이 아니고 여러 라이브러리를 함께 익혀야 하는 단점도 있지만 개발에 맞는 스택을 설정할 수 있는 장점과 Backbone.js, Angular.js 와 같은 다른 웹프레임워크와 라이브러리와 조합할 수 있는 유연함도 있다.
7. React의 가장 큰 특징은 Virtual DOM이다. 이를 사용하여 느린 DOM 업데이트의 처리횟수를 최소화하고 효율적으로 처리할 수 있게 한다. 이에 대한 오해도 존재하는 데, Virtual DOM은 지속적으로 데이터가 변화하는 대구모 애플리케이션 구축에 최적화 되어있다.
8. 개발 지원
   +  기본적으로 Node.js 에서 빌드와 테스트 서버 구동이 가능하다.
   + ECMAScript 2015 (ES6)  기반의 JavaScript 코드를 작성하는 것이 보통이며 여러 번들링 도구가 있지만 webpack을 사용하여 번들링 한다.
   + webpack의 css-loader를 통해 CSS 파일을 읽어오고 웹 폰트, 미디어 파일은 file-loader, ES6의 ES5로 트랜스컴파일은 babel-loader가 하면서 하나의 파일로 번들링한다.
   + 이 로더는 개발적으로 설치하고 설정하는 것이 보통이지만,  create-react-app 도구를 사용하여 이 작업을 편하게 할 수도 있다. 
   + JSX(JavaScript eXtension)
     + 자바스크립트 확장 문법으로 XML과 비슷하다. 
     + JSX로 작성된 코드 번들링되면서 babel-loader를 사용하여 JavaScript로 변환된다.(Babel은 react preset을 공식 지원한다.)
     + 보기 쉽고 익숙하며 babel을 통한 트랜스컴파일시 오류 검출 그리고 HTML 태그를 사용할 수 있고 컴포넌트도 JSX 코드안에 자연스럽게 삽입이 가능하것도 큰 장점이다.
     + 단점은 문법을 배워야 한다는 것인데 그리 어렵지 않고 말했듯시 보기 쉽고 금방 익숙해 진다.   

#### 1-4. Vue.js

1. 클라이언트 사이드의 유저 인터페이스 개발를 위한 프론트엔드 프레임워크이다.
2. Control 대신 뷰모델을 가지는 MVVM 패턴을 따르는 UI 개발을 통해 반응형 웹애플리케이션 작성을 가능하게 한다. (이는 리액트도 마찬가지이다)
3. Angular의 양방향 데이터 바인딩과 React 단방향 데이터 흐름의 장점을 모두 결합한 프레임워크이다.
4. 컴포넌트를 사용하여 재사용이 가능한 UI들을 묶고 뷰 레이어를 정리하도록 하고 있으며 HTML 템플릿 위주의 개발을 권장하는데 React의 JSX 사용도 가능하다.
5. 개발지원
   + vue.js가 의존성을 가지고 있는 라이브러리나 플랫폼은 없다.
   + HTML 커스텀 엘리먼트를 Virtual DOM 렌더 함수로 컴파일하도록 내부 구현이 되어 있기 때문에 별도의 템플릿 엔진도 없다.
   + vue-cli 도구를 제공하데, 프로젝트를 쉽게 구성할 수 있도록 미리 정의된 설정들이 있다.
     + webpack : 번들링 도구로 webpack을 사용한 번들링 과정에 빌드와 함께 vue-loader를 통해 정적분석, 테스트 등 기본 빌드 프로세스 대부분을 설정한다.
     + browserify : 번들링 도구로 Browserify을 사용한 번들링 과정에 빌드와 함께 vueify, 정적 분석, 테스트 등 기본 빌드 프로세스 대부분을 설정한다.

#### 1-5. AngularJS

1. 블라블라~
2. 블라블라2

#### 1-6. Electron

1. 블라블라~
2. 블라블라2