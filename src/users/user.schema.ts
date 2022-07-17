import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MongoObjectIdScalar } from '../gql-custom-scalar/mongoid.scalar';
import { Pet, PetSchema } from '../pets/pet.schema';
import { Post } from '../posts/post.schema';

@Schema()
@ObjectType()
export class User {
  @Field((type) => MongoObjectIdScalar)
  _id: Types.ObjectId;

  @Prop({ required: true })
  @Field()
  firstName: string;

  @Prop({ required: true })
  @Field()
  lastName: string;

  @Prop({ type: [PetSchema] })
  @Field((type) => [Pet])
  pets: Pet[];

  @Prop()
  @Field({ nullable: true })
  phoneNumber?: string;

  @Field((type) => [Post])
  posts: Post[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
