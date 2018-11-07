import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Producto} from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargaProductos();
  }

  private cargaProductos() {

    return new Promise((resolve, reject) => {

      this.http.get('https://angular-html-8abfc.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
            this.cargando = false;
            this.productos = resp;
            resolve();
          }
        );
    });


  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-8abfc.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      this.cargaProductos().then(() => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];
    termino = termino.toLowerCase();
    this.productos.forEach(prod => {
      const titulower = prod.titulo.toLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || titulower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
