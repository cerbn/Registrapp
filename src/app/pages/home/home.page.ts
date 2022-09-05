import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //VAMOS A CREAR NUESTRO ALUMNO:
  alumno = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.required, 
                                 Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    semestre: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, 
                                   Validators.minLength(6),
                                   Validators.maxLength(18)]),
    tipo_usuario: new FormControl('alumno')
  });

  //VAMOS A CREAR EL ARREGLO QUE TENDRA TODOS LOS USUARIOS REGISTRADOS DESDE EL SERVICIO:
  usuarios: any[] = [];
  verificar_password: string;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  //método que desencadena el formulario con el boton submit:
  registrar() {
    if (this.alumno.controls.password.value != this.verificar_password) {
      alert('CONTRASEÑAS NO COINCIDEN!');
      return;
    }

    var respuesta: boolean = this.usuarioService.agregarUsuario(this.alumno.value);
    if (respuesta) {
      this.alumno.reset();
      alert('USUARIO REGISTRADO!');
    }else{
      alert('USUARIO YA REGISTRADO!');
    }
  }

  eliminar(rutEliminar) {
    this.usuarioService.eliminarUsuario(rutEliminar);
  }

  buscar(rutBuscar) {
    var usuarioEncontrado: any = this.usuarioService.obtenerUsuario(rutBuscar);
    this.alumno.setValue(usuarioEncontrado);

    this.verificar_password = usuarioEncontrado.password;

  }

  actualizar() {
    this.usuarioService.actualizarUsuario(this.alumno.value);
    this.alumno.reset();
    this.verificar_password = '';
  }

}
 