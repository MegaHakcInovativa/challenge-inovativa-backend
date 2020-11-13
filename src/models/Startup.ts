import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Startup;
