import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePetDto } from './dto/create-pet.dto';
import { GetPetDto } from './dto/get-pet.dto';
import { Pet } from './pet.schema';
import { PetsService } from './pets.service';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query(() => [Pet], { name: 'pet' })
  async getPet(
    @Args('GetPetDto', { defaultValue: {} }) getPetDto: GetPetDto,
  ): Promise<Pet[]> {
    return await this.petsService.findAll(getPetDto);
  }

  @Mutation(() => Pet)
  async createPet(
    @Args('CreatePetDto') createPetDto: CreatePetDto,
  ): Promise<Pet> {
    return await this.petsService.createPet(createPetDto);
  }
}
