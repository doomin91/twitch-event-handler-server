# LoggerModule

요청, 응답, 쿼리문등 에 대한 로그를 저장하는 모듈이다.

## 용어

생략

## 종속성

- MessageModule
- EmailModule

## 세팅방법

원하는 서비스 app.module에 import 한다.
main.ts

```Typescript
const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(CustomLogger));
```

main.ts 에서 NestFactory.create에 추가적인 옵션 설정과 Logger를 사용해줘야한다.

```Typescript
await app.listen(port, '0.0.0.0');
```

IP 서버를 IPv4 형식으로 얻기 위해 서버를 가동할 때 포트 외에 추가적으로 '0.0.0.0' 형식을 넣어줘야한다.

app.module

```Typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware, JwtMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
```

AppModule을 export 할 때, LoggerMiddleware 를 넣어줘야한다.

## 호출방법

생략

## 도메인 다이어그램

생략

## 프로세스 다이어그램

생략

## 추가설명

- 현재 미완성 상태이다.
  - SQL 문을 한 번에 DB에 저장하기
  - 쿼리문 응답속도 확인

## Node Module

- request-ip : IPv6 -> IPv4 로 변환하는 모듈
- @types/request-ip : request-ip typescript version
