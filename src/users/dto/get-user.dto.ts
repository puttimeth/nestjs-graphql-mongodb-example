import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../gql-custom-scalar/mongoid.scalar';

@InputType()
export class GetUserDto {
  @Field((type) => MongoObjectIdScalar, { nullable: true })
  _id?: Types.ObjectId;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  phoneNumber?: string;
}
