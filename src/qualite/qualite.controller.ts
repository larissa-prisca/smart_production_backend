import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QualiteService } from './qualite.service';
import { CreateQualiteDto } from './dto/create-qualite.dto';
import { UpdateQualiteDto } from './dto/update-qualite.dto';

@Controller('qualite')
export class QualiteController {
  constructor(private readonly qualiteService: QualiteService) {}

  // route appelée automatiquement par la caméra IA
  @Post()
  create(@Body() createQualiteDto: CreateQualiteDto) {
    return this.qualiteService.create(createQualiteDto);
  }

  // route appelée quand l'ouvrier corrige la décision de l'IA
  @Patch(':id/corriger')
  corrigerDecision(
    @Param('id') id: string,
    @Body() body: { statutFinal: string; typeDefaut?: string },
  ) {
    return this.qualiteService.corrigerDecision(
      +id,
      body.statutFinal,
      body.typeDefaut,
    );
  }

  @Get()
  findAll() {
    return this.qualiteService.findAll();
  }

  @Get('statut/:statut')
  findByStatut(@Param('statut') statut: string) {
    return this.qualiteService.findByStatut(statut);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qualiteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQualiteDto: UpdateQualiteDto) {
    return this.qualiteService.update(+id, updateQualiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qualiteService.remove(+id);
  }
}
