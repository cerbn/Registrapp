
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

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


  verificar_password: string;

  constructor(private toastController: ToastController, 
                      private usuarioService: UsuarioService,   
                      private router: Router) { }

  ngOnInit() {

  }

  //método que desencadena el formulario con el boton submit:
  registrar(){
    if (this.alumno.controls.password.value == this.verificar_password) {
      this.usuarioService.agregarUsuario(this.alumno.value);
      this.alumno.reset();
      this.toastagregado();
  
      this.router.navigate(['/login']);

    }
    else{
      this.toastError();
    }
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'LAS CONTRASEÑAS NO COINCIDEN!',
      duration: 5000
    });
    toast.present();
  }
  async toastagregado() {
    const toast = await this.toastController.create({
      message: 'USUARIO REGISTRADO!',
      duration: 5000
    });
    toast.present();
  }
}
