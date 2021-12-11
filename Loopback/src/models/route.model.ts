import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Airport} from './airport.model';

@model()
export class Route extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  Time: number;

  @belongsTo(() => Airport, {name: 'originfk'})
  origin: string;

  @belongsTo(() => Airport, {name: 'destinyfk'})
  destiny: string;

  constructor(data?: Partial<Route>) {
    super(data);
  }
}

export interface RouteRelations {
  // describe navigational properties here
}

export type RouteWithRelations = Route & RouteRelations;
