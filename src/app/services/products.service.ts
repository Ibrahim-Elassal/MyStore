import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductList } from '../intefaces/ProductList';
import { IProductDetails } from '../intefaces/ProductDetails';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }
  private baseUrl = 'assets/data.json' ;
  
  fetchProducts(){
    return this.http.get <IProductList[]> (this.baseUrl);
  }

  fetchProductDetails (ProductId :number){
    return this.http.get< IProductDetails []> (this.baseUrl);
  }
  
  
}