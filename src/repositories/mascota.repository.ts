import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MfmongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, VisitaDomiciliaria, Plan} from '../models';
import {ClienteRepository} from './cliente.repository';
import {VisitaDomiciliariaRepository} from './visita-domiciliaria.repository';
import {PlanRepository} from './plan.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.idMascota,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.idMascota>;

  public readonly visitaDomiciliarias: HasManyRepositoryFactory<VisitaDomiciliaria, typeof Mascota.prototype.idMascota>;

  public readonly plan: BelongsToAccessor<Plan, typeof Mascota.prototype.idMascota>;

  constructor(
    @inject('datasources.mfmongodb') dataSource: MfmongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VisitaDomiciliariaRepository') protected visitaDomiciliariaRepositoryGetter: Getter<VisitaDomiciliariaRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Mascota, dataSource);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.visitaDomiciliarias = this.createHasManyRepositoryFactoryFor('visitaDomiciliarias', visitaDomiciliariaRepositoryGetter,);
    this.registerInclusionResolver('visitaDomiciliarias', this.visitaDomiciliarias.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
