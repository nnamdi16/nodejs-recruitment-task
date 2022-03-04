import { CreateMovieDto } from './../../domain/dto/createMovie.dto';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}

it('should fail on invalid DTO', async () => {
  const myBodyObject = { title: 3 };
  const myDtoObject = plainToInstance(CreateMovieDto, myBodyObject);
  const errors = await validate(myDtoObject);
  expect(errors.length).not.toBe(0);
  expect(stringified(errors)).toContain(`title must be a string`);
});
