import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class Coordinates implements Readonly<Coordinates> {
  @IsNumber()
  @ApiProperty({
    description: 'Latitude',
  })
  latitude: number;
  
  @IsNumber()
  @ApiProperty({
    description: 'Latitude',
  })
  longitude: number;
}
