import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MfmongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations} from '../models';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.idEmpleado,
  EmpleadoRelations
> {
  sucursal: any;
  constructor(
    @inject('datasources.mfmongodb') dataSource: MfmongodbDataSource,
  ) {
    super(Empleado, dataSource);
  }
}
