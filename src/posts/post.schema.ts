import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MongoObjectIdScalar } from '../gql-custom-scalar/mongoid.scalar';

@Schema()
@ObjectType()
export class Post {
  @Field((type) => MongoObjectIdScalar)
  _id: Types.ObjectId;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ default: 0 })
  @Field((type) => Int)
  likes: number;

  @Prop({ required: true })
  @Field((type) => MongoObjectIdScalar)
  ownerId: Types.ObjectId;

  @Prop({
    default: function () {
      return Date.now();
    },
  })
  @Field((type) => GraphQLISODateTime)
  createdDate: Date;
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
