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

=================

#### 1-3. React

1. 클라이언트 사이드의 유저 인터페이스 개발에 쓰이는 JavaScript 라이브러리이다.
2. 다른 웹 프레임워크가 MVC, MVW 등의 구조를 지향하는데 반해 리액트는 오직 View만 담당하는데 이는 프레임워크라기 보다는 라이브러리라 볼 수 있다.
3. 컴포넌트 단위로 애플리케이션을 작성한다.
4. 라우터, Ajax, 상태관리를 위해서는 보통 프레임워크는 이를 다 내장하고 있지만 리액트는 외부 라이브러리나 코드를 사용할 수 있다.
5. 보통, 라우팅에는 react-router, Ajax에는 axios, fetch, 상태 관리를 위해서는 redux, MobX 등을 사용한다.  
6. 리액트만 배워야 하는 것이 아니고 여러 라이브러리를 함께 익혀야 하는 단점도 있지만 개발에 맞는 스택을 설정할 수 있는 장점과 Backbone.js, Angular.js 와 같은 다른 웹프레임워크와 라이브러리와 조합할 수 있는 유연함도 있다.
7. React의 가장 큰 특징은 Virtual DOM이다. 개발자가 작성하는 React API는 React의 Virtual DOM을 업데이트하고 React가 실제 브라우저의 DOM의 업데이트 처리 횟수를 최소화하고 효율적으로 처리한다. 기존 DOM API를 사용한 화면 개발에 익숙하여 이 특징을 이해하지 못하면 React 프로그래밍 모델에 맞지 않는 부자연스러운 코드를 작성할 가능성이 있다.       
8. 개발 지원
   +  기본적으로 Node를 사용하여 빌드와 개발용 서버 구동을 하여 개발을 진행한다.
   + ECMAScript 2015 (ES6)  기반의 JavaScript 코드를 작성하는 것이 보통이며 webpack을 사용하여 번들링 한다.
   + webpack이 지원하는 다영한 로더를 사용하여 애플리케이션의 JavaScript 뿐만 아니라 CSS, 이미지, 폰트 등의 모든 assets들을 번들링한다. 
   + 이 로더는 개발적으로 설치하고 설정하는 것이 보통이지만 개별적인 로더의 설정법 작동 원리등을 이해해야 하는 부담이 있다. CRA(create-react-app) 라는 도구를 사용하여 이 작업을 편하게 할 수도 있지만 기본적으로 설정 방법과 관련 패키지를 이해하고 있어야 한다. 
   + JSX(JavaScript eXtension)
     + 자바스크립트 확장 문법으로 XML과 비슷하다. 
     + JSX로 작성된 코드 번들링되면서 babel-loader를 사용하여 JavaScript(React API)로 변환된다. Babel은 react preset을 공식 지원한다.
     + 보기 쉽고 익숙하며 babel을 통한 트랜스컴파일시 오류 검출 그리고 HTML 태그를 사용할 수 있고 컴포넌트도 JSX 코드안에 자연스럽게 삽입이 가능하것도 큰 장점이다.
     + 단점은 문법을 배워야 한다는 것인데 그리 어렵지 않고 말했듯시 보기 쉽고 금방 익숙해 진다.   

#### 1-4. Vue.js

================

#### 1-5. AngularJS

================

#### 1-6. Electron

================