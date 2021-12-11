import {BindingScope, injectable} from '@loopback/core';
import { User } from '../models';
import {config} from '../config/config';
const jwt = require('jsonwebtoken');
import {UserRepository} from '../repositories';
import {repository} from '@loopback/repository';
const generator = require("password-generator");
const cryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(
  @repository(UserRepository)
  public userRepository: UserRepository) { }

  //Generacion de claves
  GenerarClave() {
    let clave = generator(8, false);
    return clave;
  }

  CifrarClave(clave: String) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  GenerarTokenJWT(user: User) {
    let token = jwt.sign({
      data: {
        id: user.id,
        correo: user.email,
        nombre: user.name + " " + user.lastname
      }
    }, config.claveJWT)
 
    return token
  }

  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, config.claveJWT);
      return datos;
    } catch (error) {
      return false;
    }
  }

  //Autenticacion
  IdentificarPersona(email: string, password: string) {
    try {
      let p = this.userRepository.findOne({where: {email: email, password: password}})
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }
}
