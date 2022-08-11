import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { UserPayload } from 'src/decorators/user-payload.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateSetDto } from 'src/sets/dto/create-set.dto';
import { UpdateSetDto } from 'src/sets/dto/update-set.dto';
import { SetsService } from 'src/sets/sets.service';
import { Set } from 'src/sets/sets.schema';

@ApiTags('Sets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sets')
export class SetsController {
  constructor(private setsService: SetsService) {}

  @ApiResponse({ type: [Set] })
  @ApiOperation({ description: 'Get user sets' })
  @Get()
  getSets(@UserPayload() userPayload: UserPayloadDto): Promise<Set[]> {
    return this.setsService.getSets(userPayload);
  }

  @ApiResponse({ type: Set })
  @ApiOperation({ description: 'Get set by id' })
  @Get(':id')
  getSetById(@Param('id') id: string): Promise<Set> {
    return this.setsService.getSetById(id);
  }

  @ApiResponse({ type: Set })
  @ApiOperation({ description: 'Create set' })
  @Post()
  createSet(@Body() createSetDto: CreateSetDto, @UserPayload() userPayload: UserPayloadDto): Promise<Set> {
    return this.setsService.createSet(createSetDto, userPayload);
  }

  @ApiResponse({ type: null, status: HttpStatus.NO_CONTENT })
  @ApiOperation({ description: 'Update set' })
  @Patch(':id')
  updateSet(@Body() updateSetDto: UpdateSetDto, @Param('id') id: string): Promise<Set> {
    return this.setsService.updateSet(updateSetDto, id);
  }

  @ApiResponse({ type: null, status: HttpStatus.NO_CONTENT })
  @ApiOperation({ description: 'Delete set' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteSet(@Param('id') id: string): Promise<null> {
    return this.setsService.deleteSet(id);
  }
}
