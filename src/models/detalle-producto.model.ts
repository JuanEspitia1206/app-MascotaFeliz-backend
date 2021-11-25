import {Entity, model, property} from '@loopback/repository';

@model()
export class DetalleProducto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idDproducto?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
  })
  estado?: string;

  @property({
    type: 'string',
  })
  productoId?: string;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  constructor(data?: Partial<DetalleProducto>) {
    super(data);
  }
}

export interface DetalleProductoRelations {
  // describe navigational properties here
}

export type DetalleProductoWithRelations = DetalleProducto & DetalleProductoRelations;
