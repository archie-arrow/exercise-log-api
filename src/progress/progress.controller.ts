import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { UserPayload } from 'src/decorators/user-payload.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BatchDeleteProgressDto } from 'src/progress/dto/batch-delete-progress.dto';
import { CreateProgressDto } from 'src/progress/dto/create-progress.dto';
import { Progress } from 'src/progress/progress.schema';
import { ProgressService } from 'src/progress/progress.service';

@ApiTags('Progress')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @ApiResponse({ type: [Progress] })
  @ApiOperation({ description: 'Add user progress' })
  @Post()
  addProgress(
    @Body() createProgressDto: CreateProgressDto,
    @UserPayload() userPayload: UserPayloadDto,
  ): Promise<Progress[]> {
    return this.progressService.addProgress(createProgressDto, userPayload);
  }

  @ApiResponse({ type: [Progress] })
  @ApiOperation({ description: 'Get user progress' })
  @Get()
  getProgress(@UserPayload() userPayload: UserPayloadDto): Promise<Progress[]> {
    return this.progressService.getProgress(userPayload);
  }

  @ApiResponse({ type: [Progress] })
  @ApiOperation({ description: 'Get exercise progress' })
  @Get('/exercise/:id')
  getExerciseProgress(@Param('id') id: string): Promise<Progress[]> {
    return this.progressService.getExerciseProgress(id);
  }

  @ApiResponse({ type: Progress })
  @ApiOperation({ description: 'Delete exercise progress' })
  @Delete(':id')
  deleteProgress(@Param('id') id: string): Promise<Progress> {
    return this.progressService.deleteProgress(id);
  }

  @ApiResponse({ type: [Progress] })
  @ApiOperation({ description: 'Batch delete progress' })
  @Delete(':id')
  batchDeleteProgress(@Body() batchDeleteProgressDto: BatchDeleteProgressDto): Promise<Progress[]> {
    return this.progressService.batchDeleteProgress(batchDeleteProgressDto);
  }
}
