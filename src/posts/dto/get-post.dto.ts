import { Field, InputType, Int } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../gql-custom-scalar/mongoid.scalar';

@InputType()
export class GetPostDto {
  @Field((type) => MongoObjectIdScalar, { nullable: true })
  _id?: Types.ObjectId;

  @Field({ nullable: true })
  title?: string;

  @Field((type) => Int, { nullable: true })
  minLikes?: number;

  @Field((type) => Int, { nullable: true })
  maxLikes?: number;

  @Field((type) => MongoObjectIdScalar, { nullable: true })
  ownerId?: Types.ObjectId;
}
