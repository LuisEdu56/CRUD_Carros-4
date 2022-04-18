import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin : FormGroup;

  constructor(private _router : Router,
    private _formBuilder : FormBuilder,
    private usuarioService : UsuarioService) {
      this.formLogin = this._formBuilder.group({
        email : ["", [Validators.required, Validators.email]],                  /* o segundo parametro sao os validadores, validators do angular forms, nome deve ter 5 caracteres */
        password : ["", [Validators.required, Validators.minLength(6)]]
     });
    }

  ngOnInit(): void {
  }

  private validarFormulario(){
    for (let campos in this.formLogin.controls)
    {
      this.formLogin.controls[campos].markAllAsTouched();   /* todos os campos foram tocados */
    }
  }

  public submitForm()
  {
    this.validarFormulario();
    if(!this.formLogin.valid)  /* se tentar cadastro produto vazio n faz nada */
    {
      return;
    }
    this.logarComEmailPassword();
  }

  logarComEmailPassword() {
    this.usuarioService.loginComEmailPassword(this.formLogin.controls['email'].value, 
    this.formLogin.controls['password'].value)
    .then(()=>{
      alert("Login Efetuado com Sucesso!");
      this._router.navigate(["/listaDeProdutos"]);
    })
    .catch((error)=>{
      alert("Erro ao efetuar login, tente novamente!");
      console.log(error);
    })
  }

  logarComGoogleCount() {
    this.usuarioService.loginComGoogleCount()
    .then(()=>{
      alert("Login Efetuado com Sucesso!");
      this._router.navigate(["/listaDeProdutos"]);
    })
    .catch((error)=>{
      alert("Erro ao efetuar login, tente novamente!");
      console.log(error);
    })
  }
}
    
