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
```ts
@Mutation(() => User)
async createUser(
  @Args('CreateUserDto') createUserDto: CreateUserDto,
): Promise<User> {
  return await this.usersService.createUser(createUserDto);
}
```

For `User` schema, I allow only `createUser`. The function behind this part is simple, I will skip it.

### Pet
Query and Mutation is the same as `User` schema

### Post
Query and Mutation is the same as `User` schema plus `LikePost` which increase `likes` field for targeted post.

## Extra
In case you also want to know how to use GraphQL with React framework. I make the example repo [here](https://github.com/puttimeth/react-graphql-example).
