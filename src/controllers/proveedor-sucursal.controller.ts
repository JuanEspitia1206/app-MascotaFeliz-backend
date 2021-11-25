import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Proveedor,
  Sucursal,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorSucursalController {
  constructor(
    @repository(ProveedorRepository)
    public proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Sucursal belonging to Proveedor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async getSucursal(
    @param.path.string('id') id: typeof Proveedor.prototype.idProveedor,
  ): Promise<Sucursal> {
    return this.proveedorRepository.sucursal(id);
  }
}
