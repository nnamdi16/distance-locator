import { Point } from 'geojson';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, MinLength, IsNumber, IsObject } from "class-validator";

export class CreateLocationDto implements Readonly<CreateLocationDto> {
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
