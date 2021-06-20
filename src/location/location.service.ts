import { Point } from 'geojson';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { greatCircleDistance, convertArrayToObject } from 'src/shared/util';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

import LocationEntity from './entities/location.entity';
import { Coordinates } from './dto/coordinates.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}
  public async create(createLocationDto: CreateLocationDto): Promise<any> {
    const { sourceLocation, destinationLocation, ...locationDto } =
      createLocationDto;
    console.log(sourceLocation);
    console.log(destinationLocation);
    const errors = await validate(createLocationDto);
    if (errors.length > 0) {
      const _errors = { message: 'Location input is not valid' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const coordinates = this.calculateDistance(
      sourceLocation,
      destinationLocation,
    );
    const { sourceCoordinates, destinationCoordinates, distance } = coordinates;

    locationDto['sourceCoordinates'] = sourceCoordinates;
    locationDto['destinationCoordinates'] = destinationCoordinates;
    locationDto['distance'] = distance;

    const newLocationDetails = this.locationRepository.create({
      ...locationDto,
    });
    await this.locationRepository.save(newLocationDetails);
    return newLocationDetails;
  }

  public calculateDistance(
    sourceLocation: Coordinates,
    destinationLocation: Coordinates,
  ) {
    const sourceCoordinates: Point = {
      type: 'Point',
      coordinates: [sourceLocation.longitude, sourceLocation.latitude],
    };
    const destinationCoordinates: Point = {
      type: 'Point',
      coordinates: [
        destinationLocation.longitude,
        destinationLocation.latitude,
      ],
    };

    const distance = greatCircleDistance(sourceLocation, destinationLocation);
    return {
      sourceCoordinates,
      destinationCoordinates,
      distance,
    };
  }

  public async findAll() {
    return await this.locationRepository.find({ where: { isDeleted: false } });
  }

  public async findOne(id: number) {
    return await this.locationRepository.findOne({ id, isDeleted: false });
  }

  public async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<LocationEntity> {
    const errors = await validate(updateLocationDto);
    if (errors.length > 0) {
      const _errors = { message: 'Location input is not valid' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      updateLocationDto.hasOwnProperty('sourceLocation') &&
      !updateLocationDto.hasOwnProperty('destinationLocation')
    ) {
      const { sourceLocation, ...locationDetails } = updateLocationDto;
      let fetchLocationDetails = await this.locationRepository.findOne({ id });
      const { destinationCoordinates } = fetchLocationDetails;
      let state = ['latitude', 'longitude'];
      let destinationLocation = convertArrayToObject(
        destinationCoordinates.coordinates,
        state,
      );
      let coordinates = this.calculateDistance(
        sourceLocation,
        destinationLocation,
      );
      const { sourceCoordinates, distance } = coordinates;
      locationDetails['sourceCoordinates'] = sourceCoordinates;
      locationDetails['destinationCoordinates'] = destinationCoordinates;
      locationDetails['distance'] = distance;

      await this.locationRepository.update({ id }, locationDetails);
    } else if (
      !updateLocationDto.hasOwnProperty('sourceLocation') &&
      updateLocationDto.hasOwnProperty('destinationLocation')
    ) {
      const { destinationLocation, ...locationDetails } = updateLocationDto;
      let fetchLocationDetails = await this.locationRepository.findOne({ id });
      const { sourceCoordinates } = fetchLocationDetails;
      let state = ['latitude', 'longitude'];
      let sourceLocation = convertArrayToObject(
        sourceCoordinates.coordinates,
        state,
      );
      let coordinates = this.calculateDistance(
        sourceLocation,
        destinationLocation,
      );
      const { destinationCoordinates, distance } = coordinates;
      locationDetails['sourceCoordinates'] = sourceCoordinates;
      locationDetails['destinationCoordinates'] = destinationCoordinates;
      locationDetails['distance'] = distance;

      await this.locationRepository.update({ id }, locationDetails);
    } else if (
      updateLocationDto.hasOwnProperty('sourceLocation') &&
      updateLocationDto.hasOwnProperty('destinationLocation')
    ) {
      const { destinationLocation, sourceLocation, ...locationDetails } =
        updateLocationDto;
      let coordinates = this.calculateDistance(
        sourceLocation,
        destinationLocation,
      );
      const { destinationCoordinates, sourceCoordinates, distance } =
        coordinates;
      locationDetails['sourceCoordinates'] = sourceCoordinates;
      locationDetails['destinationCoordinates'] = destinationCoordinates;
      locationDetails['distance'] = distance;
      await this.locationRepository.update({ id }, locationDetails);
    } else {
      await this.locationRepository.update({ id }, updateLocationDto);
    }

    return await this.locationRepository.findOne({ id });
  }

  public async remove(id: number) {
    await this.locationRepository.update({ id }, { isDeleted: true });
    return {
      message:'Location details deleted successfully'
    }
  }
}
