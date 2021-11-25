import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pedido} from './pedido.model';
import {DetalleProducto} from './detalle-producto.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idProducto?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'date',
  })
  fechaVencimiento?: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  presentacion: string;

  @hasMany(() => Pedido, {through: {model: () => DetalleProducto}})
  pedidos: Pedido[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
