export class Produto {
    id? : string;
    marca? : string; /* private para encapsulamento */
    modelo? : string;
    ano? : string;
    versao? : string;
    combustivel? : string;
    cores? : string;
    cambio? : string;
    quilometragem? : number;
    blindagem? : string;
    preco? : number;
    downloadURL? : string;

    constructor(marca : string, modelo : string, ano : string, versao : string, combustivel : string,
    cores : string, cambio : string, quilometragem : number, blindagem : string, preco : number, downloadURL : string)
    {
        //this.nome= nome;            /* pegando nome de cima */
        //this.preco=preco;
        this.marca=marca;            /* Constructor - pegando nome de cima */
        this.modelo=modelo;
        this.ano=ano;
        this.versao=versao;
        this.combustivel=combustivel;
        this.cores=cores;
        this.cambio=cambio;
        this.quilometragem=quilometragem;
        this.blindagem=blindagem;
        this.preco=preco;
        this.downloadURL=downloadURL;
    }
    /*
    public getNome() : string{
        return this._nome;
    }

    public setNome(nome : string) : void{
        this._nome = nome;
    }


    public getPreco() : number{
        return this._preco;
    }

    public setPreco(preco : number) : void{
        this._preco = preco;   /* recebendo novo valor 
    }*/


}
