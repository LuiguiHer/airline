import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Flight, FlightRelations, Route} from '../models';
import {RouteRepository} from './route.repository';

export class FlightRepository extends DefaultCrudRepository<
  Flight,
  typeof Flight.prototype.id,
  FlightRelations
> {

  public readonly rutafk: BelongsToAccessor<Route, typeof Flight.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('RouteRepository') protected routeRepositoryGetter: Getter<RouteRepository>,
  ) {
    super(Flight, dataSource);
    this.rutafk = this.createBelongsToAccessorFor('rutafk', routeRepositoryGetter,);
    this.registerInclusionResolver('rutafk', this.rutafk.inclusionResolver);
  }
}
