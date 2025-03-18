import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  getTestMessage() {
    return { message: 'Conexión exitosa con el backend 🚀' };
  }
}
