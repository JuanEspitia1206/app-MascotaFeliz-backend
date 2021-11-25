import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DetalleProducto} from '../models';
import {DetalleProductoRepository} from '../repositories';

export class ContdetallepController {
  constructor(
    @repository(DetalleProductoRepository)
    public detalleProductoRepository : DetalleProductoRepository,
  ) {}

  @post('/detalle-productos')
  @response(200, {
    description: 'DetalleProducto model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetalleProducto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleProducto, {
            title: 'NewDetalleProducto',
            exclude: ['idDproducto'],
          }),
        },
      },
    })
    detalleProducto: Omit<DetalleProducto, 'idDproducto'>,
  ): Promise<DetalleProducto> {
    return this.detalleProductoRepository.create(detalleProducto);
  }

  @get('/detalle-productos/count')
  @response(200, {
    description: 'DetalleProducto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetalleProducto) where?: Where<DetalleProducto>,
  ): Promise<Count> {
    return this.detalleProductoRepository.count(where);
  }

  @get('/detalle-productos')
  @response(200, {
    description: 'Array of DetalleProducto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetalleProducto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetalleProducto) filter?: Filter<DetalleProducto>,
  ): Promise<DetalleProducto[]> {
    return this.detalleProductoRepository.find(filter);
  }

  @patch('/detalle-productos')
  @response(200, {
    description: 'DetalleProducto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleProducto, {partial: true}),
        },
      },
    })
    detalleProducto: DetalleProducto,
    @param.where(DetalleProducto) where?: Where<DetalleProducto>,
  ): Promise<Count> {
    return this.detalleProductoRepository.updateAll(detalleProducto, where);
  }

  @get('/detalle-productos/{id}')
  @response(200, {
    description: 'DetalleProducto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetalleProducto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetalleProducto, {exclude: 'where'}) filter?: FilterExcludingWhere<DetalleProducto>
  ): Promise<DetalleProducto> {
    return this.detalleProductoRepository.findById(id, filter);
  }

  @patch('/detalle-productos/{id}')
  @response(204, {
    description: 'DetalleProducto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleProducto, {partial: true}),
        },
      },
    })
    detalleProducto: DetalleProducto,
  ): Promise<void> {
    await this.detalleProductoRepository.updateById(id, detalleProducto);
  }

  @put('/detalle-productos/{id}')
  @response(204, {
    description: 'DetalleProducto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detalleProducto: DetalleProducto,
  ): Promise<void> {
    await this.detalleProductoRepository.replaceById(id, detalleProducto);
  }

  @del('/detalle-productos/{id}')
  @response(204, {
    description: 'DetalleProducto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detalleProductoRepository.deleteById(id);
  }
}
