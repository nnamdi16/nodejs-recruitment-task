import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'movie' })
class MovieEntity extends BaseEntity {
  @Column()
  public title: string;

  @Column()
  public released: string;

  @Column()
  public genre: string;

  @Column()
  public director: string;

  @Column()
  public userId: string;
}

export default MovieEntity;
