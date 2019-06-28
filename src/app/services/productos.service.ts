import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
   //bandera
  cargando = true;

  constructor( private http: HttpClient) {
    this.cargarProductos();


   }
   private cargarProductos(){
     //url de mi proyecto de firebase
     this.http.get('https://angular-html-7f3a1.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[])=>{
          console.log(resp);
          this.cargando = false;

        });
   }
}
