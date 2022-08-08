import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.schema';

export class AuthResponseDto {
  @ApiProperty()
  readonly user: User;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnt' })
  readonly token: string;
}
