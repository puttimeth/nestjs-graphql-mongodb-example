import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { LikePostDto } from './dto/like-post.dto';
import { Post } from './post.schema';
import { PostsService } from './posts.service';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => [Post], { name: 'post' })
  async getPost(
    @Args('GetPostDto', { defaultValue: {} }) getPostDto: GetPostDto,
  ): Promise<Post[]> {
    return await this.postsService.findAll(getPostDto);
  }

  @Mutation(() => Post)
  async createPost(
    @Args('CreatePostDto') createPostDto: CreatePostDto,
  ): Promise<Post> {
    return await this.postsService.createPost(createPostDto);
  }

  @Mutation(() => Post)
  async LikePost(@Args('LikePostDto') likePostDto: LikePostDto): Promise<Post> {
    return await this.postsService.likePost(likePostDto);
  }
}
