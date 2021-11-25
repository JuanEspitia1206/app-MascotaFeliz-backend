import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Mascota} from './mascota.model';

@model()
export class VisitaDomiciliaria extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idVisitaD?: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoDsaludMascota: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  horaInicio: string;

  @property({
    type: 'string',
    required: true,
  })
  horaFin: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<VisitaDomiciliaria>) {
    super(data);
  }
}

export interface VisitaDomiciliariaRelations {
  // describe navigational properties here
}

export type VisitaDomiciliariaWithRelations = VisitaDomiciliaria & VisitaDomiciliariaRelations;
