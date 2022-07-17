# NestJS-GraphQL-MongoDB example project
![image](https://user-images.githubusercontent.com/32786620/179403545-1112d1ef-3a35-4ce2-a49f-f68504f62d7d.png)

## Description

This repo is the example for those who struggle to use NestJs as backend combined with GraphQL and MongoDB. First, It should be mentioned that I'm NOT an expert and have no idea about best practice in backend. Also, this example is a very small system, you may face issues when you try to scale up.

## Installation
```bash
yarn install
```

## Running
This application will required MongoDB to be run in Docker. I will assume that you got a basic for Docker. If you don't, well, I can only give you the link to the [official document](https://docs.docker.com).

I already prepare `docker-compose.yml` for MongoDB.
```
docker-compose up -d
```

Be sure that your MongoDB is online (The name of the container should be `nsetjs-graphql-mongodb`) then
```
yarn start:dev
```

## Schema
This project contain 3 main collections which are `User`, `Pet` and `Post`.

`User` contains `firstName`, `lastName` and `pets`.

`Pet` contains `name` and `ownerId`.

`Post` contains `title`, `likes`, `ownerId` and `createdDate`.

For more information about schema types, please look at the file `*.schema.ts`.

Here is an example of a user and a post.
```json
{
  "_id": {
    "$oid": "62d26efad453e245d1f3612e"
  },
  "firstName": "jelly",
  "lastName": "man",
  "pets": [
    {
      "name": "Bob5",
      "ownerId": {
        "$oid": "62d26efad453e245d1f3612e"
      },
      "_id": {
        "$oid": "62d29c3b8905fe686d670a49"
      }
    },
    {
      "name": "Bobo",
      "ownerId": {
        "$oid": "62d26efad453e245d1f3612e"
      },
      "_id": {
        "$oid": "62d29c448905fe686d670a4e"
      }
    }
  ],
  "__v": 0
}
```

```json
{
  "_id": {
    "$oid": "62d3e8c1756e90d95f4d8327"
  },
  "title": "my first post",
  "likes": 3,
  "ownerId": {
    "$oid": "62d26efad453e245d1f3612e"
  },
  "createdDate": {
    "$date": {
      "$numberLong": "1658054849754"
    }
  },
  "__v": 0
}
```

It may look big but most of it are ObjectId. If you cut it out, it is very simple.

## Functions
I have provided both `Query` and `Mutation` to test it out. Let me go through by schema.

### User
#### Query
```ts
@Query(() => [User], { name: 'user' })
async getUser(
  @Args('GetUserDto', { defaultValue: {} }) getUserDto: GetUserDto,
): Promise<User[]> {
  return await this.usersService.findAll(getUserDto);
}
```
This is what defined our `User` query. By using `@Query()` decorator and `@Args()` for the input, you can create simple but efficient endpoint for frontend.

Noticed that I pass `getUserDto` into `usersService`. This allow us to make only one query that accept all conditions. This way frontend can pass any condition that appear in `getUserDto` which are `_id`, `firstName`, `lastName` and `phoneNumber`. And if the condition is empty, it mean that they want all users!

#### Mutation
For `User` schema, I allow only `createUser`. The function behind this part is simple, I will skip it.

### Pet


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
