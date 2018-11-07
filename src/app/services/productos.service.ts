import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Producto} from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargaProductos();
  }

  private cargaProductos() {
    this.http.get('https://angular-html-8abfc.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) => {
          this.cargando = false;
          this.productos = resp;
        }
      )
    ;
  }
}