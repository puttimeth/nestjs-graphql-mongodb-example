import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CreatePetDto {
  @Field()
  name: string;

  @Field((type) => String)
  ownerId: Types.ObjectId;
}
