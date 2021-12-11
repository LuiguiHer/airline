import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import axios from 'axios';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {AuthService} from '../services';
import {Credentiales} from '../models';
import { HttpErrors} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
@authenticate("admin")

export class UsuarioController {
  constructor(
    @repository(UserRepository)
    public usuarioRepository: UserRepository,
    @service(AuthService)
    public servicioAuth: AuthService
  ) { }

  @authenticate.skip()
  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<User, 'id'>,
  ): Promise<User> {
    //Nuevo
    let clave = this.servicioAuth.GenerarClave();
    let claveCifrada = this.servicioAuth.CifrarClave(clave);
    usuario.password = claveCifrada;
    let p = await this.usuarioRepository.create(usuario);

    // Notificamos al usuario por correo
    let destino = usuario.email;
    // Notifiamos al usuario por telefono y cambiar la url por send_sms
    // let destino = usuario.telefono;

    let asunto = 'Registro de usuario en plataforma';
    let contenido = `Hola, ${usuario.name} ${usuario.lastname} su contraseña en el portal es: ${clave}`
    axios({
      method: 'post',
      url: 'http://localhost:5000/send_email',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        destino: destino,
        asunto: asunto,
        contenido: contenido
      }
    }).then((data: any) => {
      console.log(data)
    }).catch((err: any) => {
      console.log(err)
    })

    return p;
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    usuario: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    usuario: User,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: User,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

  //Servicio de login
  @authenticate.skip()
  @post('/login', {
    responses: {
      '200': {
      description: 'Identificación de usuarios'
      }
    }
  })
  async login(
    @requestBody() credentiales: Credentiales
  ) {
    let p = await this.servicioAuth.IdentificarPersona(credentiales.user, credentiales.password);
    if (p) {
      let token = this.servicioAuth.GenerarTokenJWT(p);
   
      return {
        status: "success",
        data: {
          nombre: p.name,
          apellidos: p.lastname,
          correo: p.email,
          id: p.id
        },
        token: token
      }
    } else {
      throw new HttpErrors[401]("Datos invalidos")
    }
  }
}
