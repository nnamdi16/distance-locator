import { Point } from 'geojson';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import greatCircleDistance from 'src/shared/util';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

import LocationEntity from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}
  public async create(
    createLocationDto: CreateLocationDto,
  ): Promise<CreateLocationDto> {
    const {
      sourceLocation,
      destinationLocation,
      ...locationDto
    } = createLocationDto;
    const errors = await validate(createLocationDto);
    if (errors.length > 0) {
      const _errors = { message: 'Location input is not valid' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    }
  
    const sourceCoordinates: Point = {
      type: 'Point',
      coordinates: [sourceLocation.longitude, sourceLocation.latitude],
    };
    const destinationCoordinates: Point = {
      type: 'Point',
      coordinates: [destinationLocation.longitude, destinationLocation.latitude],
    };

    const distance = greatCircleDistance(sourceCoordinates,destinationLocation);
    locationDto['sourceCoordinates'] = sourceCoordinates;
    locationDto['destinationCoordinates'] = destinationCoordinates;
    locationDto['distance'] = distance;

    const newLocationDetails = this.locationRepository.create({
      ...locationDto
    });
    await this.locationRepository.save(newLocationDetails);
    return;
  }

  public async findAll() {
    return await this.locationRepository.find({ where: { isDeleted: false } });
  }

  public async findOne(id: number) {
    return await this.locationRepository.findOne({ id, isDeleted: false });
  }

  public async update(id: number, updateLocationDto: UpdateLocationDto):Promise<LocationEntity> {
    await this.locationRepository.update({ id }, updateLocationDto);
    return await this.locationRepository.findOne({ id });
    
  }

  public async remove(id: number) {
    await this.locationRepository.update({ id }, { isDeleted: true });
    return await this.locationRepository.findOne({ id });
  }
}
