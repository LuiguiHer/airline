import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Route,
  Airport,
} from '../models';
import {RouteRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
@authenticate("admin")

export class RouteAirportController {
  constructor(
    @repository(RouteRepository)
    public routeRepository: RouteRepository,
  ) { }

  @get('/routes/{id}/airport', {
    responses: {
      '200': {
        description: 'Airport belonging to Route',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Airport)},
          },
        },
      },
    },
  })
  async getAirport(
    @param.path.string('id') id: typeof Route.prototype.id,
  ): Promise<Airport> {
    return this.routeRepository.destinyfk(id);
  }
}
