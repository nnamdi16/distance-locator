import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsObject } from 'class-validator';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Description',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Website',
  })
  public website?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Phone number',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Contact Person',
  })
  contactPerson: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of start location',
  })
  sourceName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of destination',
  })
  destinationName: string;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    description: 'Source Location',
  })
  sourceLocation: Coordinates;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    description: ' Destination Location',
  })
  destinationLocation: Coordinates;
}
