import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../gql-custom-scalar/mongoid.scalar';

@InputType()
export class LikePostDto {
  @Field((type) => MongoObjectIdScalar, { nullable: true })
  _id?: Types.ObjectId;
}
