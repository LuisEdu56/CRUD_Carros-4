import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ignoreElements } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class cadastroComponent implements OnInit {
  public formcadastro : FormGroup;

  constructor(private _router : Router,
    private _formBuilder : FormBuilder,
    private usuarioService : UsuarioService) {
      this.formcadastro = this._formBuilder.group({
        email : ["", [Validators.required, Validators.email]],                  /* o segundo parametro sao os validadores, validators do angular forms, nome deve ter 5 caracteres */
        password : ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword : ["", [Validators.required, Validators.minLength(6)]]
     });
    }

  ngOnInit(): void {
  }

  private validarFormulario(){
    for (let campos in this.formcadastro.controls)
    {
      this.formcadastro.controls[campos].markAllAsTouched();   /* todos os campos foram tocados */
    }
  }

  public submitForm()
  {
    this.validarFormulario();
    if(!this.formcadastro.valid)  /* se tentar cadastro produto vazio n faz nada */
    {
      return;
    }
    this.cadastro();
  }

  cadastro() {
    if(this.formcadastro.controls['password'].value == 
    this.formcadastro.controls['confirmPassword'].value)
    {
    this.usuarioService.cadastroComEmailPassword(this.formcadastro.controls['email'].value, 
    this.formcadastro.controls['password'].value)
    .then(()=>{
      alert("cadastro Efetuado com Sucesso!");
      this._router.navigate(["/login"]);
    })
    .catch((error)=>{
      alert("Erro ao efetuar cadastro, tente novamente!");
      console.log(error);
    })
  }else{
    alert("As senhas não conferem!");
  }
}

}
