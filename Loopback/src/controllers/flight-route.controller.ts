import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Flight,
  Route,
} from '../models';
import {FlightRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
@authenticate("admin")

export class FlightRouteController {
  constructor(
    @repository(FlightRepository)
    public flightRepository: FlightRepository,
  ) { }

  @get('/flights/{id}/route', {
    responses: {
      '200': {
        description: 'Route belonging to Flight',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Route)},
          },
        },
      },
    },
  })
  async getRoute(
    @param.path.string('id') id: typeof Flight.prototype.id,
  ): Promise<Route> {
    return this.flightRepository.rutafk(id);
  }
}
