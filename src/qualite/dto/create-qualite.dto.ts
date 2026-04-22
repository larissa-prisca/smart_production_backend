import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateQualiteDto {
  @IsNumber()
  ouvrierId: number;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsIn(['conforme', 'non_conforme'])
  statutIA: string;

  @IsString()
  @IsOptional()
  typeDefaut?: string;

  @IsNumber()
  @IsOptional()
  scoreConfiance?: number;
}