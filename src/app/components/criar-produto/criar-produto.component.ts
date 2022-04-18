import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ImagemService } from 'src/app/services/imagem.service';
import { ProdutofirebaseService } from 'src/app/services/produtofirebase.service';


@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.scss']
})
export class CriarProdutoComponent implements OnInit {
  public formCadastrar : FormGroup;
  public imagemURL? : string;

  constructor(private _router : Router,
    private produtoService : ProdutofirebaseService,
    private _formBuilder : FormBuilder,
    private imagemService : ImagemService) {
      this.formCadastrar = this._formBuilder.group({
        //nome : ["", [Validators.required, Validators.minLength(5)]],                  /* o segundo parametro sao os validadores, validators do angular forms, nome deve ter 5 caracteres */
        //preco : ["", [Validators.required]]               /* colocando todos os campos, vazio pois é o valor que vem pré-escrito no formulario */
        marca : ["", [Validators.required]],
        modelo : ["", [Validators.required]],
        ano : ["", [Validators.required]],
        versao : ["", [Validators.required]],
        combustivel : ["", [Validators.required]],
        cores : ["", [Validators.required]],
        cambio : ["", [Validators.required]],
        quilometragem : ["", [Validators.required]],
        blindagem : ["", [Validators.required]],
        preco : ["", [Validators.required]],
        downloadURL : ["", [Validators.required]]
      });
     }  /* injetando o service produtoservice */

  ngOnInit(): void {
  }

  private validarFormulario(){
    for (let campos in this.formCadastrar.controls)
    {
      this.formCadastrar.controls[campos].markAllAsTouched();   /* todos os campos foram tocados */
    }
  }

  public submitForm()
  {
    this.validarFormulario();
    if(!this.formCadastrar.valid)  /* se tentar cadastrar produto vazio n faz nada */
    {
      return;
    }
    this.salvar();
  }
  
  public salvar() : void{
    const target = document.getElementById("file") as HTMLInputElement;
    const file : File = (target.files as FileList)[0];
    if(file.type.split('/')[0] != 'image'){
      alert("Tipo de arquivo não suportado");
      console.log("tipo não suportado");
      return;
    }
    else{
    console.log(document.getElementById("file"))
    this.uploadFile(file, this.formCadastrar.value)
    .then(()=>(console.log("salvo com sucesso!")))
    .catch((error)=>(console.log(error)))
    ;}
  }

  public uploadFile(event : any, produto : Produto ){
    return this.imagemService.uploadStorage(event, produto)
    .then((data)=>{console.log(data)})
    .catch((error)=>{console.log(error)})
  }

}