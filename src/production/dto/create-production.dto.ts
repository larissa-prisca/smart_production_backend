import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProductionDto {
  @IsNumber()
  ouvrierId: number;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsNumber()
  @Min(0)
  quantiteProduite: number;

  @IsNumber()
  @Min(0)
  quantiteConforme: number;

  @IsNumber()
  @Min(0)
  quantiteNonConforme: number;
}
