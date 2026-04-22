import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Departement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ nullable: true })
  responsable: string;

  @Column({ default: 0 })
  nombreOuvriers: number;
}
