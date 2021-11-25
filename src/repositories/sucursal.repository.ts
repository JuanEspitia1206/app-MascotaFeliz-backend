import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MfmongodbDataSource} from '../datasources';
import {Sucursal, SucursalRelations, Empleado, Proveedor} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {ProveedorRepository} from './proveedor.repository';

export class SucursalRepository extends DefaultCrudRepository<
  Sucursal,
  typeof Sucursal.prototype.idSucursal,
  SucursalRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Sucursal.prototype.idSucursal>;

  public readonly proveedors: HasManyRepositoryFactory<Proveedor, typeof Sucursal.prototype.idSucursal>;

  constructor(
    @inject('datasources.mfmongodb') dataSource: MfmongodbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Sucursal, dataSource);
    this.proveedors = this.createHasManyRepositoryFactoryFor('proveedors', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedors', this.proveedors.inclusionResolver);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
