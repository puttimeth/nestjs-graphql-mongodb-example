import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CreatePostDto {
  @Field()
  title: string;

  @Field((type) => String)
  ownerId: Types.ObjectId;
}
