import { IsString, IsOptional } from 'class-validator';

export class UpdateOuvrierDto {
  @IsString()
  @IsOptional()
  nom?: string;

  @IsString()
  @IsOptional()
  prenom?: string;

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
