import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { cadastroComponent } from './components/cadastro/cadastro.component';
import { CriarProdutoComponent } from './components/criar-produto/criar-produto.component';
import { EditarProdutoComponent } from './components/editar-produto/editar-produto.component';
import { ListaDeProdutosComponent } from './components/lista-de-produtos/lista-de-produtos.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioGuard } from './services/usuario.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: cadastroComponent},

  {path:'listaDeProdutos', component: ListaDeProdutosComponent,
  canActivate : [UsuarioGuard]},  /* pacote, path, e chama o componente */
  {path:'criarProduto', component: CriarProdutoComponent,
  canActivate : [UsuarioGuard]},
  {path:'editarProduto/:indice', component: EditarProdutoComponent,
  canActivate : [UsuarioGuard]},  /* so chega na rota se passar o indice */
  
  {path: '**', redirectTo:"/login"},       /* se colocar qualquer rota que nao exista joga para a lista de produtos */
  {path: "", redirectTo:"/llogin", pathMatch:"full"}  /* se for vazio vai para listaDeProdutos */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
