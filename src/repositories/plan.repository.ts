import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MfmongodbDataSource} from '../datasources';
import {Plan, PlanRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.idPlan,
  PlanRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Plan.prototype.idPlan>;

  constructor(
    @inject('datasources.mfmongodb') dataSource: MfmongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Plan, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
