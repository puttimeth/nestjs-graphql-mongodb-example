import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../gql-custom-scalar/mongoid.scalar';

@InputType()
export class GetPetDto {
  @Field((type) => MongoObjectIdScalar, { nullable: true })
  _id?: Types.ObjectId;

  @Field({ nullable: true })
  name?: string;

  @Field((type) => MongoObjectIdScalar, { nullable: true })
  ownerId?: Types.ObjectId;
}
