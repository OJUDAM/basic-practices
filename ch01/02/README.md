## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch01](https://github.com/kickscar-javascript/basic-practices/tree/master/ch01) / 02. JavaScript와 ECMAScript

### 1. ECMAScript 표준 명세

​	ECMAScript와 JavaScript 관계는 다분히 공학분야의 학술적 관계다. 기술적으로는 ECMAScript 표준 명세의 규칙과 지침대로 구현된 구현체 중 하나로  JavaScript를 보는 것이 맞다. 구현체의 의미는 다음과 같다.

1. 구현된 스크립트 언어의 문법 체계로 프로그래밍 코드 작성이 가능해야 한다.
2. 작성된 코드는 스크립트 엔진(인터프리터)을 통해 실행되어야 한다.

​	앞의 [JavaScript 타임라인](https://github.com/kickscar-javascript/basic-practices/tree/master/ch01/01) 에서 본 것처럼 ECMAScript 표준 명세의 구현체는 JavaScript만 있었던 것은 아니였다.

### 2. ECMAScript의 구현체

#### 2-1. JScript

​	Microsoft에서 개발한 ECMAScript 표준 명세 구현체이다. 기본적으로 ECMAScript 5 명세를 구현하지만 거기에 Active Scripting 이라는 자신들의 .NET Runtime 스크립팅 명세가 추가 되어 있다.

​	IE9 부터 Chakra(차크라) 이름의 엔진이 내장 되었는데 ECMAScript 5 명세를 준수하고 Active Scripting까지 지원하는 JScript 엔진이라 볼 수 있다. IE Edge에 내장된 Chakra 엔진은 IE9+의 JScript엔진과 이름은 같지만 Active Scripting 기능을 빼고 최신 ECMAScript 명세만을 구현한 순수 JavaScript 엔진이다. 

#### 2-2. ActionScript

​	어도비 플래시 애니메이션 구현을 위해 개발된 스크립트로 언어적 문법은 스크립트에 기반하지만 Java와 비슷하게 컴파일 후 중간 코드를 AVM(ActionScript Virtual Machine)에서 실행한다. 어도비가 모질라와 함께 ECMAScript 4의 명세 작업을 주도하면서 개발되었고 엔진 이름은 Tamarin 이다. FLEX, AIR, 플래시 라이트 등의 플래시 파생 기술들과 데스크톱, 모바일로 실행 플랫폼을 넓혀갔지만 앞의 [JavaScript 타임라인](https://github.com/kickscar-javascript/basic-practices/tree/master/ch01/01) 에서도 언급된 것 처럼 ECMAScript 4 명세의 폐기와 함께 시장에서 거의 퇴출되었다.

#### 2-3. JavaScript 

​	앞의 ECMAScript 구현체들의 기술 상황과 현재의 시장 상황 등을 고려해보면 ECMAScript 표준 명세 구현체는  JavaScript 밖에 없다.  따라서 JavaScript와 ECMAScript는 같은 것이라 생각해도 큰 무리는 없다. JavaScript 엔진은 그 종류가 상당히 많다.

1. [**SpiderMonkey**](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey)
   - 최초의 JavaScript 엔진 
   - Mozila FIrefox 웹브라우저
   - ECMAScript 2015 (ES6)
2. **Chakra(JScript)**
   - Microsoft JScript 엔진
   - Internet Explorer 9+ 웹브라우저
   - ECMAScript 5
3. [**Charkra(JavaScript)**](https://github.com/Microsoft/ChakraCore)
   - Microsoft JavaScript 엔진
   - Internet Explorer Edge 웹브라우저
   - ECMAScript 2015 (ES6)
4. [**V8**](https://v8.dev/)
   - Google **/** Chrome, Opera14+ 웹브라우저, 
   - **Node.js Runtime**
   - ECMAScript 2015 (ES6)
5. [**KJS**](https://api.kde.org/4.x-api/kdelibs-apidocs/kjs/html/index.html)
   - KDE
   - Konqueror Web Browser
   - ECMAScript 2015 (ES6) 
6. [**JavasciptCore**](https://trac.webkit.org/wiki/JavaScriptCore)
   - Apple
   - Safari 웹브라우저 Webkit 프레임워크 JS Engine, React Native App 
   - ECMAScript 2015 (ES6)



### 3. ECMAScript 비표준 스크립트 언어

#### 3-1. 정의

​	ECMAScript2015(ES6) 이전, 표준 명세 구현체  JavaScript의 언어적 결함, 데이터 타입의 모호함 등의 여러 이유로 개발된 JavaScript 파생 스크립트 언어들을 가리킨다.

​	JavaScript 방언쯤 되는 파생 스크립트 언어라 볼 수 있지만 ECMAScript 구현체라고는 볼 수 없다. 그 이유는 이 비표준 스크립트 언어로 작성된 코드를 실행하는 엔진은 대부분 JavaScript 엔진으로 직접 실행할 수 있는 엔진이 존재하지 않기 때문이다. 따라서, 대부분 컴파일러(트랜스컴파일러 또는 트랜스파일러)을 통해  JavaScript 코드로 변환되어 JavaScript 엔진에서 실행된다.

#### 3-2. 종류

1. [**CoffeScript**](https://coffeescript.org/)
   - JSConference 2011에서 차세대 JS.next 스크립트 언어로 주목 받았고 구글의 트랜스파일러 프로젝트 트레이서(Traceur) 발표에 의해 탄력을 받은 스크립트 언어다.
   -  JavaScript의 설계 결함 때문에  JavaScript 문법을 개선한 스크립트 언어중 하나다. 트랜스컴파일을 통해 JavaScript로 변환된다.
   - 최신 자바스크립트를 지원하지 않는 단점으로 인해 경쟁 스크립트 언어 TypeScript에 비해 현재는 인기가 많이 떨어져 있다.
2. [**Dart**](https://dart.dev/)
   - 구글에서 만든 JavaScript을 개선한 스크립트 언어다. 
   - 프론트엔드 개발을 위해 처음 나왔지만 지금은  VM과 컴파일러 지원을 통해 웹 프론트엔드 뿐만아니라  데스크탑, 서버, 모바일, 애플리케이션 까지 개발할 수 있다. 
   - 최근 구글의 크로스플랫폼 앱 프레임워크인 Flutter가 인기를 끌고 있는데 DartScripting을 기반으로 하고 있다.
3. [**TypeScript**](https://www.typescriptlang.org/)
   - Microsoft가 개발한 정적 타입을 추가하는 등 JavaScript의 타입을 많이 개선한 스크립트 언어이다.
   - 코드의 견고함이 장점으로 꼽힌다.
   - 백엔드와 프론트에서 모두 활용이 가능하고 장점이 많은 파생 스크립트 언어 중 하나이다. 
   - 구글이 최신 Angular 개발 스크립트로 TypeScript를 선택하였고 React 프레임워크도 TypeScript를 지원하는 등 인기가 높아져 가고 있는 JavaScript 파생 스크립트 언어다.