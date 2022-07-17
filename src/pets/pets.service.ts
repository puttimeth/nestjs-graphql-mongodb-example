import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { UsersService } from '../users/users.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { GetPetDto } from './dto/get-pet.dto';
import { Pet, PetDocument } from './pet.schema';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Pet.name) private petModel: Model<PetDocument>,
    private readonly usersService: UsersService,
  ) {}

  async findOneId(id: Types.ObjectId): Promise<Pet> {
    return await this.petModel.findOne({ _id: id });
  }

  async findAll(filterObject: GetPetDto = {}): Promise<Pet[]> {
    let matchObject = {};
    // convert some field to ObjectId for mongodb
    if ('_id' in filterObject)
      matchObject[`pets._id`] = new Types.ObjectId(filterObject._id);
    if ('name' in filterObject) matchObject[`pets.name`] = filterObject.name;
    if ('ownerId' in filterObject)
      matchObject[`pets.ownerId`] = new Types.ObjectId(filterObject.ownerId);
    /**
     * 1. unwind all pets inside user
     * 2. filter only those match condition
     * 3. merge all pet into same array
     */
    const data = await this.userModel.aggregate([
      {
        $unwind: {
          path: '$pets',
        },
      },
      {
        $match: matchObject,
      },
      {
        $group: {
          _id: null,
          pets: {
            $push: '$pets',
          },
        },
      },
    ]);
    return data?.[0]?.['pets'] ?? [];
  }

  async createPet(createPetDto: CreatePetDto) {
    // check if owner exists
    const ownerUser = await this.usersService.findOneId(createPetDto.ownerId);
    if (!ownerUser) throw new BadRequestException('Unknown owner id.');
    // create pet
    let newPet = new this.petModel({
      ...createPetDto,
      ownerId: new Types.ObjectId(createPetDto.ownerId),
    });
    const updatedUser = await this.userModel.findByIdAndUpdate(
      ownerUser._id,
      { $push: { pets: newPet } },
      { new: true },
    );
    if (updatedUser.pets.length <= ownerUser.pets.length) {
      throw new InternalServerErrorException('Cannot create new pet.');
    }
    return updatedUser.pets[updatedUser.pets.length - 1];
  }
}
