import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MfmongodbDataSource} from '../datasources';
import {VisitaDomiciliaria, VisitaDomiciliariaRelations, Empleado, Mascota} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {MascotaRepository} from './mascota.repository';

export class VisitaDomiciliariaRepository extends DefaultCrudRepository<
  VisitaDomiciliaria,
  typeof VisitaDomiciliaria.prototype.idVisitaD,
  VisitaDomiciliariaRelations
> {

  public readonly empleado: BelongsToAccessor<Empleado, typeof VisitaDomiciliaria.prototype.idVisitaD>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof VisitaDomiciliaria.prototype.idVisitaD>;

  constructor(
    @inject('datasources.mfmongodb') dataSource: MfmongodbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(VisitaDomiciliaria, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
  }
}
