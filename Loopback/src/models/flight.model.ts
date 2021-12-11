import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Route} from './route.model';

@model()
export class Flight extends Entity {
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
  fecha_inicio: string;

  @property({
    type: 'string',
    required: true,
  })
  Star_Time: string;

  @property({
    type: 'string',
    required: true,
  })
  end_date: string;

  @property({
    type: 'string',
    required: true,
  })
  end_time: string;

  @property({
    type: 'number',
    required: true,
  })
  sold_seats: number;

  @property({
    type: 'string',
    required: true,
  })
  pilot_name: string;

  @belongsTo(() => Route, {name: 'rutafk'})
  ruta: string;

  constructor(data?: Partial<Flight>) {
    super(data);
  }
}

export interface FlightRelations {
  // describe navigational properties here
}

export type FlightWithRelations = Flight & FlightRelations;
