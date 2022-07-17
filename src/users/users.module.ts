import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PetsModule } from '../pets/pets.module';
import { PostsService } from '../posts/posts.service';
import { Post, PostSchema } from '../posts/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    PetsModule,
  ],
  providers: [UsersService, UsersResolver, PostsService],
})
export class UsersModule {}
