import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ConfirmAuthDto {
  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description: 'Email del usuario a confirmar'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Código de confirmación enviado por email'
  })
  @IsString()
  @IsNotEmpty()
  pin: string;
}