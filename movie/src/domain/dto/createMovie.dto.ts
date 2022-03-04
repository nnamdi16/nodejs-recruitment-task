import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto implements Readonly<CreateMovieDto> {
  @ApiProperty({
    description: 'Movie title',
    example: '',
    nullable: false,
    required: true,
    title: 'title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
