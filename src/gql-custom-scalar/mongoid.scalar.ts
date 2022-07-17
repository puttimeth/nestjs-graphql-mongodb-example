import { BadRequestException } from '@nestjs/common';
import { Scalar } from '@nestjs/graphql';
import { Kind, ASTNode, GraphQLScalarType } from 'graphql';
import { Types } from 'mongoose';

export const MongoObjectIdScalar = new GraphQLScalarType({
  name: 'MongoObjectId',
  description: 'Mongo object id scalar type',
  serialize(value: Types.ObjectId): string {
    return value.toHexString(); // value sent to the client
  },
  parseValue(value: string): Types.ObjectId {
    return new Types.ObjectId(value); // value from the client
  },
  parseLiteral(ast: ASTNode): Types.ObjectId {
    if (ast.kind !== Kind.STRING) {
      throw new BadRequestException(
        'MongoObjectId can only parse string values',
      );
    }
    return new Types.ObjectId(ast.value);
  },
});
