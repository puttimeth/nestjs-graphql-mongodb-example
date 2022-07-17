import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class GetPetDto {
  @Field((type) => String, { nullable: true })
  _id?: Types.ObjectId;

  @Field({ nullable: true })
  name?: string;

  @Field((type) => String, { nullable: true })
  ownerId?: Types.ObjectId;
}
