import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class BatchDeleteProgressDto {
  @ApiProperty({ type: [String] })
  @IsArray({ message: 'Should be an array!' })
  @ValidateNested({ each: true })
  @Type(() => String)
  readonly ids: string[];
}
