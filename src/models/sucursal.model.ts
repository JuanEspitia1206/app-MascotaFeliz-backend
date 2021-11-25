import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Proveedor} from './proveedor.model';

@model()
export class Sucursal extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idSucursal?: string;

  @property({
    type: 'string',
    required: true,
  })
  NombreC: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @hasMany(() => Proveedor)
  proveedors: Proveedor[];

  constructor(data?: Partial<Sucursal>) {
    super(data);
  }
}

export interface SucursalRelations {
  // describe navigational properties here
}

export type SucursalWithRelations = Sucursal & SucursalRelations;
