# SEA-REAL 무료 메뉴판 번역 서비스

`Code.gs`는 Google Apps Script의 내장 `LanguageApp.translate`를 사용하는 읽기 전용 JSONP 번역 서비스입니다.

- 사진은 전송하지 않습니다.
- 브라우저의 Tesseract.js가 추출한 메뉴 글자만 전송합니다.
- 지원 대상 언어는 영어, 일본어, 중국어입니다.
- Google Cloud 결제 계정이나 API 키가 필요하지 않습니다.

배포된 웹 앱 URL은 `outputs/sea-real.html`의 `menuTranslationServiceUrl`에 연결되어 있습니다.

코드를 변경하면 Apps Script에서 새 버전으로 배포하고 해당 URL이 유지되는지 확인해야 합니다.
