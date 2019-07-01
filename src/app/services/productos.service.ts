import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
   //bandera
  cargando = true;
  productos : Producto[] = [];
  productosFiltrado: Producto[] = [];


  constructor( private http: HttpClient) {
    this.cargarProductos();


   }
   private cargarProductos(){
     //url de mi proyecto de firebase
     return new Promise((resolve,reject) => {
      this.http.get('https://angular-html-7f3a1.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[])=>{
        this.productos =  resp;


       setTimeout(() => {
        this.cargando = false;
        resolve();

       }, 2000);

      });

     });

   }


   getProducto(id: string){

   return this.http.get(`https://angular-html-7f3a1.firebaseio.com/productos/${ id }.json`);

   }

   buscarProdcuto(termino: string){

    if (this.productos.length === 0 ) {
      //cargar productos
      this.cargarProductos().then(()=>{

        //ejecutar después de tener los productos
        this.filtrarProductos(termino);
      });

    } else {
      //aplicar el filtro si ya tengo productos
      this.filtrarProductos(termino);

    }



   }

   private filtrarProductos(termino: string){

    //console.log(this.productos);
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod =>{
      const titulower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || titulower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);

      }


    });


   }



}
