import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { LikePostDto } from './dto/like-post.dto';
import { Post, PostDocument } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(filterObject: GetPostDto = {}): Promise<Post[]> {
    let matchObject = {};
    // convert some field to ObjectId for mongodb
    if ('_id' in filterObject)
      matchObject['_id'] = new Types.ObjectId(filterObject._id);
    if ('title' in filterObject) matchObject['title'] = filterObject.title;
    if ('ownerId' in filterObject)
      matchObject['ownerId'] = new Types.ObjectId(filterObject.ownerId);
    if ('minLikes' in filterObject || 'maxLikes' in filterObject)
      matchObject[`likes`] = {};
    if ('minLikes' in filterObject)
      matchObject['likes'] = { $gte: filterObject.minLikes };
    if ('maxLikes' in filterObject)
      matchObject['likes'] = {
        ...matchObject['likes'],
        $lte: filterObject.maxLikes,
      };
    return await this.postModel.find(matchObject);
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    return await new this.postModel({
      ...createPostDto,
      ownerId: new Types.ObjectId(createPostDto.ownerId),
    }).save();
  }

  async likePost(likePostDto: LikePostDto): Promise<Post> {
    return await this.postModel.findByIdAndUpdate(
      likePostDto._id,
      { $inc: { likes: 1 } },
      { new: true },
    );
  }
}
