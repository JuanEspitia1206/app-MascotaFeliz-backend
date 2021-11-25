import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MfmongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Pedido, DetalleProducto} from '../models';
import {DetalleProductoRepository} from './detalle-producto.repository';
import {PedidoRepository} from './pedido.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.idProducto,
  ProductoRelations
> {

  public readonly pedidos: HasManyThroughRepositoryFactory<Pedido, typeof Pedido.prototype.idPedido,
          DetalleProducto,
          typeof Producto.prototype.idProducto
        >;
  proveedor: any;

  constructor(
    @inject('datasources.mfmongodb') dataSource: MfmongodbDataSource, @repository.getter('DetalleProductoRepository') protected detalleProductoRepositoryGetter: Getter<DetalleProductoRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Producto, dataSource);
    this.pedidos = this.createHasManyThroughRepositoryFactoryFor('pedidos', pedidoRepositoryGetter, detalleProductoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
