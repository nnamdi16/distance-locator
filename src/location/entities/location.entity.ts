import { BaseEntity } from 'src/shared/base.entity';
import { Column, Entity, Index } from 'typeorm';
import { Point } from 'geojson';

@Entity({ name: 'location' })
class LocationEntity extends BaseEntity {
  @Column()
  public description: string;

  @Column({ nullable: true })
  public website?: string;

  @Column()
  public phoneNumber: string;

  @Column()
  public contactPerson: string;

  @Column()
  public sourceName: string;

  @Column()
  public destinationName: string;

  @Column()
  public distance: number;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  public sourceCoordinates: Point;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  public destinationCoordinates: Point;
}

export default LocationEntity;
