import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Route, RouteRelations, Airport} from '../models';
import {AirportRepository} from './airport.repository';

export class RouteRepository extends DefaultCrudRepository<
  Route,
  typeof Route.prototype.id,
  RouteRelations
> {

  public readonly originfk: BelongsToAccessor<Airport, typeof Route.prototype.id>;

  public readonly destinyfk: BelongsToAccessor<Airport, typeof Route.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AirportRepository') protected airportRepositoryGetter: Getter<AirportRepository>,
  ) {
    super(Route, dataSource);
    this.destinyfk = this.createBelongsToAccessorFor('destinyfk', airportRepositoryGetter,);
    this.registerInclusionResolver('destinyfk', this.destinyfk.inclusionResolver);
    this.originfk = this.createBelongsToAccessorFor('originfk', airportRepositoryGetter,);
    this.registerInclusionResolver('originfk', this.originfk.inclusionResolver);
  }
}
