import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators'
import { Produto } from '../models/produto';

export class MyData{
  downloadURL? : string;
  produto? : Produto;
}

@Injectable({
  providedIn: 'root'
})
export class ImagemService {
  task? : AngularFireUploadTask;
  UploadFileUrl? : Observable<string>;
  fileName? : string;

  constructor(
    private storage : AngularFireStorage,
    private angularStore : AngularFirestore,
    private _router : Router) { }

    async uploadStorage (file : File, produto : Produto){
      this.fileName = file.name;
      const path = `imagens/${new Date().getTime()}_${file.name}`;
      console.log(path)
      const fileRef = this.storage.ref(path);
      this.task = this.storage.upload(path,file);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.UploadFileUrl = fileRef.getDownloadURL();
          this.UploadFileUrl.subscribe((resp) => {
            produto.downloadURL = resp,
            this.uploadDatabase(produto);
          })
        })
      ).subscribe();
    }
    
    uploadDatabase(image : Produto){
      return this.angularStore.collection('produtos').add(image)
      .then(()=>
      {
        alert("Salvo com sucesso");
        this._router.navigate(["/listaDeProdutos"])
      })
      .catch((error)=>(console.log(error)));
    }

    getImages() {
      return this.angularStore.collection('imagens').snapshotChanges().pipe(
        map(
          (action) => {
            return action.map((dados) => ({
              key : dados.payload.doc.id,
              data :dados.payload.doc.data()
            }))
          }
          )
        );
    }
}