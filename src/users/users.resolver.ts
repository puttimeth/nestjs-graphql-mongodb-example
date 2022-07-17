import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from '../posts/post.schema';
import { PostsService } from '../posts/posts.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './user.schema';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Query(() => [User], { name: 'user' })
  async getUser(
    @Args('GetUserDto', { defaultValue: {} }) getUserDto: GetUserDto,
  ): Promise<User[]> {
    return await this.usersService.findAll(getUserDto);
  }

  @Mutation(() => User)
  async createUser(
    @Args('CreateUserDto') createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @ResolveField()
  async posts(@Parent() user: User): Promise<Post[]> {
    const { _id } = user;
    return await this.postsService.findAll({ ownerId: _id });
  }
}
