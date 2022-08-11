import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { CreateSetDto } from 'src/sets/dto/create-set.dto';
import { UpdateSetDto } from 'src/sets/dto/update-set.dto';
import { SetDocument, Set } from 'src/sets/sets.schema';

@Injectable()
export class SetsService {
  constructor(@InjectModel(Set.name) private setModel: Model<SetDocument>) {}

  async getSets(userPayload: UserPayloadDto): Promise<Set[]> {
    return this.setModel.find({ userId: userPayload.id });
  }

  async getSetById(id: string): Promise<Set> {
    return this.setModel.findById(id);
  }

  async createSet(createSetDto: CreateSetDto, userPayload: UserPayloadDto): Promise<Set> {
    return this.setModel.create({ ...createSetDto, userId: userPayload.id });
  }

  async deleteSet(id: string): Promise<null> {
    return this.setModel.findByIdAndDelete(id, { new: true });
  }

  async updateSet(updateSetDto: UpdateSetDto, id: string): Promise<Set> {
    return this.setModel.findByIdAndUpdate(id, { ...updateSetDto }, { new: true });
  }
}
