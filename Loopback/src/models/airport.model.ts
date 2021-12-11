import {Entity, model, property} from '@loopback/repository';

@model()
export class Airport extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @property({
    type: 'number',
    required: true,
  })
  coordinateX: number;

  @property({
    type: 'number',
    required: true,
  })
  coordinateY: number;

  @property({
    type: 'string',
    required: true,
  })
  acronym: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;


  constructor(data?: Partial<Airport>) {
    super(data);
  }
}

export interface AirportRelations {
  // describe navigational properties here
}

export type AirportWithRelations = Airport & AirportRelations;
