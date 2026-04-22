import { Controller, Get } from '@nestjs/common';
import { OeeService } from './oee.service';

@Controller('oee')
export class OeeController {
  constructor(private readonly oeeService: OeeService) {}

  @Get()
  calculerOee() {
    return this.oeeService.calculerOee();
  }
}
