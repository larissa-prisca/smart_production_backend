import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Ouvrier } from '../../ouvriers/entities/ouvrier.entity';

@Entity()
export class Qualite {
  @PrimaryGeneratedColumn()
  id: number;

  // Reçu directement depuis le script Python (ex: OUVRIER_ID = 1)
  @Column()
  ouvrierId: number;

  @ManyToOne(() => Ouvrier, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ouvrierId' })
  ouvrier: Ouvrier;

  @Column()
  reference: string;

  @Column()
  statutIA: string; // "conforme" ou "non_conforme"

  @Column({ default: 'IA' })
  sourceDecision: string;

  @Column({ nullable: true })
  typeDefaut: string;

  @Column({ type: 'float', nullable: true })
  scoreConfiance: number;

  @CreateDateColumn()
  createdAt: Date;
}