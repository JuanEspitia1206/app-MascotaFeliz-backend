import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MfmongodbDataSource} from '../datasources';
import {PagoPlan, PagoPlanRelations, Plan, Mascota} from '../models';
import {PlanRepository} from './plan.repository';
import {MascotaRepository} from './mascota.repository';

export class PagoPlanRepository extends DefaultCrudRepository<
  PagoPlan,
  typeof PagoPlan.prototype.idPagoPlan,
  PagoPlanRelations
> {

  public readonly plan: BelongsToAccessor<Plan, typeof PagoPlan.prototype.idPagoPlan>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof PagoPlan.prototype.idPagoPlan>;

  constructor(
    @inject('datasources.mfmongodb') dataSource: MfmongodbDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(PagoPlan, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
  }
}
