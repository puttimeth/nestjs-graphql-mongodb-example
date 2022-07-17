import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MongoObjectIdScalar } from '../gql-custom-scalar/mongoid.scalar';

@Schema()
@ObjectType()
export class Pet {
  @Field((type) => MongoObjectIdScalar)
  _id: Types.ObjectId;

  @Prop()
  @Field({ nullable: true })
  name?: string;

  @Prop({ required: true })
  @Field((type) => MongoObjectIdScalar)
  ownerId: Types.ObjectId;
}

export type PetDocument = Pet & Document;
export const PetSchema = SchemaFactory.createForClass(Pet);
