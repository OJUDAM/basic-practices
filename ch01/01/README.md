## [JavaScript Practices](https://github.com/kickscar-javascript/basic-practices) / [ch01](https://github.com/kickscar-javascript/basic-practices/tree/master/ch01) / 01. 자바스크립트 타임라인

JavaScript 타임라인은 JavaScript와 JavaScript의 표준 명세 ECMAScript의 발전 내용의 시간순 나열이다. 단순한 버전의 나열이 아닌, 관련 기술및 사건들의 인과 관계들도 함께 나열하면 현재 JavaScript 기술 환경을 이해하는 도움이 될 것이다.  

------

#### 1993년

**Mosaic 출시**

최초의 GUI  웹블라우저 모자익(Mosaic)이 출시 되었다. 웹 대중화 시대를 여는 데 기여 한 브라우저로 평가되고 있다.

------

#### 1994년

**Netscape Navigaror  출시**

Mosaic 주요 개발자들이 **Netscape Communications** 를 설립하였고 바로, Netscape는  **Netscape Navigator** 라는 이름의 웹브라우저를 출시하였으며 시장에서 크게 성공을 했다.

------

#### 1995년

**JavaScript 개발과 Internet Explorer 출시**

​	Netscape는 Netscape 브라우저에서 동적인 웹페이지 지원을 위해 스크립트 언어를 Netscape에 내장하기로 결정하고 개발을 시작하였다. 이를 위해 2 트랙 전략을 세웠다. 하나는 Sun Microsystem과 협력하여  **Java** 기술을  Netscape에 내장할 계획이다. 또 다른 하나는 **Scheme**(스킴, 다중 패러다임을 지원하는 Lisp 변종 프로그래밍 언어) 전문 개발자 **Brendan Eich** (브렌던 에이히) 를 영입하여 Scheme을 Netscape에 내장하는 계획이었다.

​	첫 번째 계획은 Sun의 비협조로 잘 되지 않았다. 두번째 계획이 진행 되었는데 스크립트 언어 엔진은 10일만에 개발이 완료된것으로 알려져 있다. 한편, Netscape의 경영진은 이 스크립트 언어가 당시 큰 주목을 받고 있는  Java와 많이 비슷하기를 원했다. 이유는 마케팅에 유리할 것이라 판단하였기 때문이었고 개발에 제법 영향을 준 것도 사실이다. 이렇게 해서 **Mocha**(모카) 라는 이름의 스크립트 언어가 개발되었다. 모카는 다음과 같은 특징이 있었다.

1. 주요 기능들은 **Scheme**에 영향을 받았다.
2. 객체지향기술 지원은 **Self** (셀프) 라는 언어의 **prototype** 개념이 적용 되었다.
3. 전반적인 문법은 Java를 많이 따랐다.
4. 구문은 Java와 비슷하지만 내부는 셀프와 스킴에 가까웠다.

​	9월에 릴리즈된 Netscape Navigator 2.0에  Mocha가 **LiveScript** (라이브크스립트) 라는 이름으로 변경되어 최초로 탑재되었다. 12월에 LiveScript를  **JavaScript** 로 이름 변경을 하였다. 지금까지 공식적으로 이 이름을 유지하고 있고 기술적으로 뿐만 아니라 상업적으로도 눈부신 발전을 하고 있다. 하지만, 그 과정은 그리 순탄치만은 않았다. 

​	한편, **Windows95** 를 발표하면서 데스크탑 OS 시장 석권을 꿈꾸던 **Microsoft**는 **Internet Explorer** 출시와 함께 Netscape 가 주도하던 웹브라우저 시장에도 도전장을 내고 1차 브라우저 전쟁의 서막을 열었다.

------

#### 1996년

**JavaScript 표준화 작업과 MS의 JScript**

​	Microsoft는 Netscape의 JavaScript 엔진(Spider Monkey)을 리버스 엔지니어링하여 **JScript**라는 자신들만의 스크립트 엔진을 독자 개발하였고 Internet Explorer 3.0에 탑재하여 출시하였다.

​	11월에 Netscape는  JavaScript의 표준화 작업을 위해 기술 및 통신 업계에 막대한 영향력을 가진 비영리 표준 기관중에 하나인 ECMA International 에  JavaScript를 제출했다고 발표하였다. ECMA가 제출에 승인을 했다는 것은 웹 기술이 산업계뿐만 아니라 많은 여러 분야에 끼칠 영향력을 충분히 인지하고 있었다는 의미다. Netscape는 자사 소유 기술  JavaScript을 공개하여 ECMA 관리하에  표준 명세(스펙, Specification)를 제정하고 그 표준 명세와 함께 JavaScript를 발전시킬 계획이었던 것으로 보인다.

​	그 표준 명세가 **ECMA-262** 라는 **표준 명세 이름**에 세부 제정된 [**스크립트언어 명세**](https://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf) (구현을 위해 준수해야 하는 규칙, 지침 등)가 **ECMAScript** 이다. ECMA International의 여러 기술 위원회(TC, Technial Committee) 중 **TC39** 가 ECMA-262 명세를 책임지고 있다.

​	JavaScript는  자신의 표준 명세 ECMAScript 보다 먼저 세상에 나오긴 했지만,  당시에 Netscape가 자신들의 브라우저에 내장할 목적으로 구현된 최초의 ECMAScript 표준 명세를 준수한 스크립트 언어였다.

​	ECMAScript 표준 명세를 준수하여 구현된 스크립트 언어로는 Micorsoft가 Netscape와 같은 목적으로 개발한 JScript가 있고  **Macromedia** (매크로미디어,  2005년에 Adobe Systems가 인수) 가 어도비 플래시 작성 스크립트 언어로 개발한 **ActionScript** 가 있다. (ECMAScript 구현체는 이 세 스크립트 언어 밖에 없다.)

​	이런 이유로 Netscape 뿐만 아니라 Microsoft 와 브라우저 또는 웹 관련 기술에 관심있는 다수의 벤더들도 ECMA-262 표준 명세 워킹그룹에 참여했다. 실제로 TC39 구성원에는 Mozilla, Google, Apple, Microsoft 등의 메이저 브라우저 벤더들이 주축이다. 이 후에는 Facebook, Twitter 등의 웹 서비스로 큰 성공을 거둔 업체들도 참여했다. 

------

#### 1997년

**ECMAScript 초판(Version 1) 발표 와 Netscape 브라우저의 위기**

​	7월에 ECMAScript 초판이 ECMA-262 이라는 공식 명세 이름으로 완성되고 발표되었다. Internet Explorer에게 웹브라우저 시장의 점유율이 점점 밀리기 시작한 Netscape는 Netscape Communicator로 이름을 바꾼 브라우저를 출시하며 만회를 시도했지만 전세는 이미 기울어 진 상태였다.   

------

#### 1998년

**ECMAScript 2 발표**

​	6월에 ISO/IEC 16262 국제 표준과 완전히 동일한 규격으로 맞추기 위한 개정이 있었다. 그리고 웹브라우저 시장에서는 점유율이 급격히 떨어진 Netscape가 궁여지책으로 Communicator 웹 브라우저의 원시코드를 완전 공개했다.

------

#### 1999년

**ECMAScript 3 발표와  Netscape 합병**

​	12월에 강력한 정규표현식 지원, 향상된 문자열 처리, 새로운 제어문, try/catch 예외 처리, 엄격한 오류 정의, 수치형 출력 포맷팅 등의 내용으로 개정 발표가 있었다. 웹브라우저 시장에서 Micorosoft에 밀려난 Netscape는 AOL이라는 회사에 공식적으로 인수 합병되었다. 이미, 1 년전 부터  AOL에는 Netscape 팀이 꾸려져 있었기 때문에 발표가 이 해에 난 것이지 사실상 벌써부터 기술적 합병은 되어 있었다.

​	AOL의 Netscape 팀이 중심이 되어 **Mozila** 라는 자유 소프트웨어 커뮤니티가 운영되었으며 이 후, 파이어폭스(FireFox) 웹 브라우저를 출시한다. Netscape 브라우저는 AOL에 인수되면서 공식적으로는 그 이름이 사라졌지만 모질라를 통해 파이어폭스로 계승되었으며 현재도 데스크탑 브라우저들 중에 한자리 매김을 하고 있다.      

------

#### 2000년

**ECMAScript 4  개정 작업 시작과 함께 닥친 JavaScript의 위기**

​	ECMAScript 4 표준 개정 작업이 시작되었다. 이 후, ECMAScript 4는 완성 못하고 폐기되었고10년쯤 지나 5판으로 재개정 되는 비운을 맞는다. 그래서 ECMAScript 4는 존재하지 않는다. 

​	 2000년의 시작과 함께 수 년동안 웹은 기술 뿐만 아니라 다양한 산업, 경제 분야에 응용되면서 급격한 성장을 하게된다. 그러면 JavaScript도 많이 발전을 해야 하는 것이 상식적이지만 ECMAScript 4는 폐기 되는 등, 웹 성장과 반대의 운명을 걷게 된다.

​	이는 웹 개발의 핵심 기술인 JavaScript에 대한 이해 관계가 다른 집단들의 과도한 기술 독점과 대립 그리고 독자적 행보 등에 기인한 것으로 심지어  JavaScript는 시장에서 퇴출 위험까지 겪는다.

------

#### 2001년

**사실상 표준(De facto standard)  JScript**

​	8월에 Microsoft는 Internet Explorer 6.0을 Windows의 최고의 성공작이라 평가받는 Windows XP 와 함께 발표한다. Micorsoft는 시장의 엄청난 비난을 무시하고 Windows에 웹브라우저 끼워넣기를 시도하였는데 Windows XP의 큰 성공으로  4~5년안에  Internet Explorer가 웹 브라우저 시장의 95%를 석권하는 쾌거를 이룬다.

​	Netscape Navigator 뿐만 아니라 많은 웹브라우저들이 시장에서 고사될 위기에 몰렸고 설상가상으로 ECMAScript 4 개정 작업도 지연되고 있었다. 이 결과로,  JScript가 웹브라우저 스크립트 언어의 사실상의 표준이 되면서 Microsoft의 기술 독점으로 인한 웹 기술 생태계 교란이 우려되는 상황이 되었다.

------

#### 2003년

**지지부진한 ECMAScript 4 표준 작업**

​	ECMAScript 4 개정 작업 중간 발표 심포지옴이 있었다. JScript 와 ActionScript가 ECMAScript 4 명세 일부를 구현하면서 마이크로소프트와 아도비가 개정 작업을 주도하는 모습이었다. 하지만, 자신들만의 기술을 자랑하는 자리였고 표준이라 하기에는 너무 특정 두 회사의 기술 중심이었다. 그럴것이 당시 웹 시장에서 제일 잘나가는 두 기술 ActiveX 와 Adobe Flash 을 가지고 있는 회사들이었다.

------

#### 2004년

**모질라의 반격과 새로운 ECMAScript4 표준 시도**

​	Netscape의 적통 Mozila는 **Firefox** 브라우저를 시장에 발표한다. Internet Explorer의 시장 점유율을 10%정도 끌어 내렸다. Internet Explorer 아성이 시장에서 허물어질수 있다는 가능성을 보여주었다. 

​	탄력받은 Mozila는 ActionScript의 Macromedia와 손잡고 ECMAScript 4 개정 작업의 성공을 위해 명세 정리 작업을 주도한다. 명세의 주요 내용은 다음과 같다.

1. 클래스 기반의 객체지향 지원
2. 다중 메서드
3. 오퍼레이터 오버로딩
4. 타입 애노테이션
5. Strict Mode
6. 제너레이터

​	그런데, ECMAScript 4 표준 명세의 구현을 JavaScript 대신 ActionScript로 완성할 계획이었다. 성공했으면 JavaScript라는 이름은 사라졌을 것이다. 성공하기 위해서는 아직은 웹 브라우저 시장의 절대 점유율을 가진 Microsoft의 참여가 필요했지만 Microsoft가 그럴 이유가 전혀 없었다. 

​	Mozila와 Macromedia는 마이크로소프트 협력없이 자신들의 ECMAScript 4 후보 명세의 구현으로 ActionScript 3와 그 실행을 위한 **Tamarin** 엔진 개발을 마쳤다. 그리고 ECMA에 이 명세를 제출했지만 당연히 받아지지 않았다. ECMA 입장에서 보면 JScript와 다를 바 없고 차라리 JScript를 ECMAScript 표준안으로 제안하지 않는 마이크로소프트가 Netscape의 모질라보다 더 개념이 있어 보였을 것이다. 

​	이렇게 해서, ECMAScript 4는 사실상 폐기될 수순이었다. 약간 엉뚱한 표준 개정이 있었는데 ECMA은 ECMAScript에 XML기능을 추가한 ECMA-357 이름의 표준 명세 E4X를 발표했다. 2015년 폐기된 표준안이다.

------

#### 2005년

**JavaScript의 귀환(Return to JavaScript!)**

​	현대 프로그래밍 언어의 특징을 담을 ECMAScript 4 명세 개정을 위한 워킹 그룹이 다시 꾸려졌다. 2008년 완성을 목표로 다시 작업에 들어간다는 발표가 있었다. 그러나 비관적이었고 해야할 필요성도 느끼지 못하는 상황이었다. 

​	JavaScript 부활은 ECMA와 전혀 상관없는 오픈소스 커뮤니티에서 극적으로 전개되기 시작하였다. **Jesse James Garret** (제스 제임스 가렛)는 **Ajax** 라는 용어를 만들고 백서를 통해 그 기술을 상세 하였다. 백서에도 기술되어있고 Ajax 라는 단어에도 있지만 이 기술의 핵심에는 다름아닌 JavaScript가 있었다.

​	JavaScript기반의 클라이언트 개발을 통해서 서버에서 데이터만 백그라운로 전달받아 화면을 동적으로 바꾸는 웹 애플리케이션 구현이 핵심이었다. 새로운 통신 프로토콜도 아닌 이 간단한 기술의 잠재력과 파급력은 엄청났다. 오픈소스 커뮤니티와 개발자들이 수많은 Ajax 관련 오픈소스와 JavaScript 라이브러리를 개발하고 공개하면서 개선해 나갔다.

​	jQuery, Prototype, Dojo, MooTools 들이 당시 유명한 라이브러리들이 었으며 jQuery는 현재도 인기를 꾸준히 유지해오고 있는 오픈소스 JavaScript 라이브러리다. JavaScript 르네상스 시대가 열렸고 JavaScript에게 다시 관심이 쏟아지기 시작했다. 

​	상황이 이렇다 보니 기약도 없는 ECMAScript 4 명세 개정보다는 브라우저들이 기반하고 있는 ECMAScript 3의 수정 패치가 더 급했다. ECMAScript 3 마이너 패치를 위한 ECMAScipt 3.1 워킹 그룹이 구성되어 작업에 들어가면서 ECMAScript 명세 워킹 그룹이 두 개로 분리되는 상황이 벌어졌다.

​	[**Douglas Crockford**](https://www.crockford.com) 는 이 해 열린 Ajax Experience 컨퍼런스에서 ECMAScript 4의 급진성과 복잡성에 문제를 제기하고 JavaScript 미래의 모습이 맞기는 하지만 현재 상황에서 완성될 가능성이 없다고 단언했다.

------

#### 2008년

**Harmony Project 시작과 Chrome 브라우저 출시**

​	**Google**이 자신들의 웹브라우저 **Chrome**을 출시하였다. Chrome은 자바스크립트 엔진 V8을 내장하였다. 최초로 JIT 컴파일을 적용해 자바스크립트 실행 속도를 급격하게 향상 시켰다.

​	다른 브라우저들도 자신들의 자바스크립트 엔진을 개선하기 시작하였다. 이는 JavaScript 기반의 Ajax 기술을 적극 활용한 웹애플리케이션들이 점점 많아지면서 브라우저에게 당연히 요구되는 것이었다. 이런 시장의 요구에 늦게 대응한 브라우저가 Internet Explorer 다. 몇 년후, 웹 브라우저 시장 판도가 완전히 뒤집어 지는데 이 것이 중요한 요인이 된다.

​	8월에 노르웨이 오슬로에서는 흩어져 있는 ECMAScript 표준 명세 워킹 그룹이 다 함께 모인 컨퍼런스가 열렸고 여기서 JavaScript를 최초 개발한 Brendan Eich는 Harmony 프로젝트를 발표한다. 주요 내용은 다음과 같다.

1. ECMAScript 표준 워킹 그룹을 합쳐 하나로 집중한다.
2. Harmony 프로젝트는 ECMAScript 표준 작업을 지원하는 프로젝트이다.
3. ECMAScript 4 명세 중 이미 구현된 명세들은 계속 유지할 것이다.
4. ECMAScript 4 명세에 구현되지 못한 명세 중에  JavaScript 미래를 위해 구현되어야 할 명세들은 2009년 이후에도 계속 표준 명세로 발전시켜 나아간다. 

------

#### 2009년

**ECMAScript 5 발표**

​	Harmony 프로젝트의 합의에 따라 현대 JavaScript 표준 명세 작업은 정확한 완료 시점없이 지속적으로 진행해 나갔다.  하지만 문제는 JavaScript의 인기에 비해 언어가 가지는 결점과 개선되야할 것들에 대한 요구에 표준 명세 개정이 시급했졌다. ECMAScript 3 이후로 수 많은 기술적 또는 정치적 시행착오로 ECMAScript 4는 사실상 폐기 되었지만  JavaScript 위상은 그 때의 위상이 아닌 상당히 높아져 있었기 때문이다.  12월에 다음의 내용으로 ECMAScript 5 개정 발표가 있었다. 현재, 대부분의 주요 브라우저는 ECMAScript 5 버젼까지 완벽히 준수하고 구현되어 있다.

1. 더 철저한 오류 검사를 제공.
2. 오류 경향이 있는 구조를 피하는 하부 집합인 "strict mode"를 추가. 
3. 배열메서드, Native JSON, String.trim, Date등을 추가
4. Function.prototype.bind, Updated object model, Strict mode, Constants, Getters/Setters 추
5. ECMAScript 3의 모호한 것들을 대부분 명확히 하는 작업들이 이루어졌다.

------

#### 2015년 - ECMAScript 6 

**ECMAScript 6 발표**

​	수년동안 아주 야심적인 시도와 노력이 Harmony 프로젝트로 지속되었고 ECMAScript 6 발표로 그 결실을 마침내 맺는다. 클래스와 모듈 같은 복잡한 응용 프로그램을 작성하기 위한 새로운 문법등 광범위한 추가와 개선이 이루어졌다.

​	보통, 버젼닝에 따라 ECMAScript 6(ES6) 라 불리지만 여러 이름으로 불리기도 한다. Harmony 프로젝트의 결과물이기 때문에 ECMAScript Harmony 라 불리기도 한다. 이 때부터 버젼 넘버 대신 발표 연도를 붙혀 ECMAScript 2015(ES2015) 라 불리기 시작했다. 

​	이 후에 매년 새로운 개정판이 발표되었다. 그런데, ES5나 ES6에 비해 그 개정 범위가 아주 작다. 마이너 수준 개정이라 볼 수 있다. 이제 JavaScript가 광범위하게 안정화가 이루어진 완성도 높은 성숙한 언어로 볼 수 있다는 것을 의미한다.  

------

#### 2016년

**ECMAScript 2016(ES2016)**

1. 제곱연산자 추가
2.  Array.prototype.includes 지원

------

#### 2017년

**ECMAScript 2017(ES2017)**

1. 함수 표현식의 인자에서 trailing commas 허용
2. Object values/entries 메소드 지원
3. async/await 등 추가

------

#### 2018년

**ECMAScript 2018(ES2018)**

1. Promise.finally 추가
2. Async iteration 추가
3. object rest/spread property 등 추가

------

#### 2019년

**ECMAScript 2019(ES2019)**

1. Object.fromEntries 추가
2. flat, flatMap 추가
3. Symbol.description 추가
4. optional catch 등 추가