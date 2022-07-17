import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../gql-custom-scalar/mongoid.scalar';

@InputType()
export class CreatePetDto {
  @Field()
  name: string;

  @Field((type) => MongoObjectIdScalar)
  ownerId: Types.ObjectId;
}
