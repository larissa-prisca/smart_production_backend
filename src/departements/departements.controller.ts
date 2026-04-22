import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { DepartementsService } from './departements.service';

@Controller('departements')
export class DepartementsController {
  constructor(private readonly departementsService: DepartementsService) {}

  @Post()
  create(
    @Body() body: { nom: string; responsable: string; nombreOuvriers: number },
  ) {
    return this.departementsService.create(body);
  }

  @Get()
  findAll() {
    return this.departementsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departementsService.remove(+id);
  }
}
