import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../gql-custom-scalar/mongoid.scalar';

@InputType()
export class CreatePostDto {
  @Field()
  title: string;

  @Field((type) => MongoObjectIdScalar)
  ownerId: Types.ObjectId;
}
