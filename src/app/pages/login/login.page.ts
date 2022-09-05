import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string;
  password: string;

  constructor(private toastController: ToastController, private router: Router, 
    private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  login(){
    var usuarioLogin = this.usuarioService.validarLogin(this.user, this.password);

    if ( usuarioLogin != undefined ) {
      this.router.navigate(['/home']);
    }else{
      this.toastError();
    }
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'USUARIO O CONTRASEÑA INCORRECTOS!',
      duration: 3000
    });
    toast.present();
  }

} 