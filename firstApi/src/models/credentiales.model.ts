import {Model, model, property} from '@loopback/repository';

@model()
export class Credentiales extends Model {
  @property({
    type: 'string',
    required: true,
  })
  user: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<Credentiales>) {
    super(data);
  }
}

export interface CredentialesRelations {
  // describe navigational properties here
}

export type CredentialesWithRelations = Credentiales & CredentialesRelations;
