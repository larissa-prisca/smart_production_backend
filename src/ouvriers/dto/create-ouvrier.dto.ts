import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOuvrierDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @IsOptional()
  telephone?: string;

  @IsString()
  @IsOptional()
  rfid?: string;

  @IsString()
  @IsOptional()
  departement?: string;
}
