import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ImagemService } from 'src/app/services/imagem.service';
import { ProdutofirebaseService } from 'src/app/services/produtofirebase.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent implements OnInit {
  public formEditar : FormGroup;    /* ? significa que algo é facultativo */
  private id? : any;

  constructor(private _router : Router,
    private _actRoute : ActivatedRoute,
    private _formBuilder : FormBuilder,
    private _produtosService : ProdutofirebaseService,
    private imagemService : ImagemService) { 
      this.formEditar = this._formBuilder.group({
        //nome : ["", [Validators.required, Validators.minLength(5)]],                  /* o segundo parametro sao os validadores, validators do angular forms, nome deve ter 5 caracteres */
        //preco : ["", [Validators.required]]               /* colocando o preco do produto que vai ser editado */
        marca : ["", [Validators.required]],
        modelo : ["", [Validators.required]],
        ano : ["", [Validators.required]],
        versao : ["", [Validators.required]],
        combustivel : ["", [Validators.required]],
        cores : ["", [Validators.required]],
        cambio : ["", [Validators.required]],
        quilometragem : ["", [Validators.required]],
        blindagem : ["", [Validators.required]],
        preco : ["", [Validators.required]]
      
      });
    }

  ngOnInit(): void {
    this._actRoute.params.subscribe((parametros)=>{
      if(parametros["indice"]){
        this.id= parametros["indice"];
        this._produtosService.getProduto(parametros["indice"]).subscribe(res => {
          let produtoRef : any = res;
          this.formEditar = this._formBuilder.group({
            //nome : [produtoRef.nome, [Validators.required, Validators.minLength(5)]],                  /* o segundo parametro sao os validadores, validators do angular forms, nome deve ter 5 caracteres */
            //preco : [produtoRef.preco, [Validators.required]]               /* colocando o preco do produto que vai ser editado */
            marca : [produtoRef.marca, [Validators.required]],
            modelo : [produtoRef.modelo, [Validators.required]],
            ano : [produtoRef.ano, [Validators.required]],
            versao : [produtoRef.versao, [Validators.required]],
            combustivel : [produtoRef.combustivel, [Validators.required]],
            cores : [produtoRef.cores, [Validators.required]],
            cambio : [produtoRef.cambio, [Validators.required]],
            quilometragem : [produtoRef.quilometragem, [Validators.required]],
            blindagem : [produtoRef.blindagem, [Validators.required]],
            preco : [produtoRef.preco, [Validators.required]]
          });
        })
       }
    });
  }


  private validarFormulario(){
    for (let campos in this.formEditar.controls)
    {
      this.formEditar.controls[campos].markAllAsTouched();   /* todos os campos foram tocados */
    }
  }

  public submitForm()
  {
    this.validarFormulario();
    if(!this.formEditar.valid)  /* se tentar cadastrar produto vazio n faz nada */
    {
      return;
    }
    this.salvar();
  }

  public salvar() : void{
    this._produtosService.editarProduto(this.formEditar.value,
      this.id)
      .then(()=>{
        alert("Produto Editado com Sucesso!");
      this._router.navigate(["/listaDeProdutos"]);
      })
      .catch((error)=>{
        console.log(error)
        alert("Erro ao Salvar Produto!");
      })
  }
    
}
