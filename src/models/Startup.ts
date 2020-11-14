import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import User from './User';

@Entity('startups')
class Startup {
  @PrimaryGeneratedColumn('uuid')
  id: 'uuid';

  @Column()
  name: string;

  @Column()
  about: string;

  @Column()
  acting: string;

  @Column()
  logo: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Startup;
