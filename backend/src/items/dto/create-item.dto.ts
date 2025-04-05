import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(100)
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(20)
  @ApiProperty()
  category: string;
}