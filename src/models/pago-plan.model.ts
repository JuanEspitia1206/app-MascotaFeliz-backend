import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Plan} from './plan.model';

@model()
export class PagoPlan extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idPagoPlan?: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  fechaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  formaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Plan)
  planId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<PagoPlan>) {
    super(data);
  }
}

export interface PagoPlanRelations {
  // describe navigational properties here
}

export type PagoPlanWithRelations = PagoPlan & PagoPlanRelations;
