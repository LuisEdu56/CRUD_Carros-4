import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutofirebaseService } from 'src/app/services/produtofirebase.service';

@Component({
  selector: 'app-lista-de-produtos',
  templateUrl: './lista-de-produtos.component.html',
  styleUrls: ['./lista-de-produtos.component.scss']
})
export class ListaDeProdutosComponent implements OnInit {  /* onInit = interface, um contrato, se tem a interface tem que ter a funcao */
  public lista_produtos : Produto[] = [];

  constructor(private _router : Router,
    private produtoService : ProdutofirebaseService) {
      
     }

  ngOnInit(): void {
     this.produtoService.getProdutos().subscribe(res => {  /* sobrescreve tudo que ta vindo do getproduto, percorre cada produto, onde tem dois tipos de retorno, o id(hash do site), e todo seu conteudo (...) */
      this.lista_produtos = res.map(e=>{
        return{
          id : e.payload.doc.id,
          ...e.payload.doc.data() as Produto
        }as Produto;
      })
    })    /* carregando os produtos do produtos.service */
  }

  public excluir(produto : Produto) : void{
    let resultado = confirm("Deseja excluir o Produto: " + 
    produto.marca + " ?");
    if(resultado)  /* se o resultado for verdade */
    {
      this.produtoService.deletarProduto(produto)
      .then(()=>{alert("Produto Excluído com Sucesso!")})
      .catch(()=>{alert("Erro ao excluir Produto!")})
      }
    }

  public editar(produto : Produto) : void{
    this._router.navigate(["/editarProduto", produto.id]);
  }

  public irParaCriarProduto() : void{
    this._router.navigate(["/criarProduto"]);  /* indo para path criarProduto */

  }

}
