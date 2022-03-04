import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MovieDto implements Readonly<MovieDto> {
  @ApiProperty({
    description: 'Movie title',
    example: 'Guardians of the Galaxy Vol. 2',
    nullable: false,
    required: true,
    title: 'title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Movie release date',
    example: '2017',
    nullable: false,
    required: true,
    title: 'release',
  })
  @IsString()
  @IsNotEmpty()
  released: string;

  @ApiProperty({
    description: 'Movie Genre',
    example: 'Action, Adventure, Comedy',
    nullable: false,
    required: true,
    title: 'genre',
  })
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty({
    description: 'Movie Director',
    example: 'James Gunn',
    nullable: false,
    required: true,
    title: 'Movie Director',
  })
  @IsString()
  @IsNotEmpty()
  director: string;

  @ApiProperty({
    description: 'User idenitification number',
    example: '1',
    nullable: false,
    required: true,
    title: 'UserId',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class MovieResponseDto extends OmitType(MovieDto, ['userId'] as const) {}
