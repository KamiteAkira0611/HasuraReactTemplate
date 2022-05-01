# Hasura + React + NestJS Template

<img width="full" alt="スクリーンショット 2022-05-01 17 05 36" src="https://user-images.githubusercontent.com/57242907/166137563-e12a7f83-e435-4e37-ad51-012d875d6b77.png">


- React
  - MUIv5
  - FirebaseAuth
  - router-dom
  - apollo
- Hasura
  - migration system
  - FirebaseAuth
- NestJS
  - Prisma
  - apollo

# Getting Started

下記環境変数を編集

- `/.env`
- `/firebase/prd/functions/.env`
- `/firebase/stg/functions/.env`
- `/frontend/.env` ※ReactをDockerで起動する場合は不要

```
$ docker compose up --build -d
```

### テーブル構造の変更

Hasura consoleの起動

**⚠️Hasura consoleからテーブルを操作しないとマイグレーションが反映されないので注意**

```
$ cd hasura
$ yarn hasura
-> http://localhost:9695/
```

