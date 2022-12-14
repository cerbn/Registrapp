import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: any[] = [
    {
      rut: '1.111.111-1',
      nom_completo: 'Mister popo',
      correo : 'popo@duocuc.cl',
      semestre: 6,
      password: '123456',
      tipo_usuario: 'administrador'
    }
  ];

  constructor() { }

  agregarUsuario(usuario): boolean{
    if ( this.obtenerUsuario(usuario.rut) == undefined ) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }
  eliminarUsuario(rut: string){
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }
  actualizarUsuario(usuario){
    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }
  obtenerUsuario(rut: string){
    return this.usuarios.find(usu => usu.rut == rut);
  }
  obtenerUsuarios(){
    return this.usuarios;
  }


  validarLogin(rut, password){
    return this.usuarios.find(usu => usu.rut == rut && usu.password == password);
  }


}
