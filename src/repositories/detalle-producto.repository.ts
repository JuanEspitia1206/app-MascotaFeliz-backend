import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MfmongodbDataSource} from '../datasources';
import {DetalleProducto, DetalleProductoRelations} from '../models';

export class DetalleProductoRepository extends DefaultCrudRepository<
  DetalleProducto,
  typeof DetalleProducto.prototype.idDproducto,
  DetalleProductoRelations
> {
  constructor(
    @inject('datasources.mfmongodb') dataSource: MfmongodbDataSource,
  ) {
    super(DetalleProducto, dataSource);
  }
}
