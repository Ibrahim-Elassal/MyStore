import { Component, OnInit } from '@angular/core';
import { ICartDetails } from 'src/app/intefaces/CartDetails';
import { IProductList } from 'src/app/intefaces/ProductList';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products : IProductList [] = [];
  cartProducts : ICartDetails [] = [];
  loading :boolean = true ;
  
  constructor( private productsService : ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
   this.productsService.fetchProducts().subscribe(
    (res )=>{
      this.products = res ;
      localStorage.setItem("products",  JSON.stringify(this.products));
      this.loading =false;
    } ,
    (error)=> {
      console.log(error.message);
      alert("Error")
    }
   )
  }


  addToCart(event :ICartDetails){
    if("cart" in localStorage){
      this.cartProducts =JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if(exist){
        alert("Product already in Your Cart")
      }
      else {
        this.cartProducts.push(event);
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
        alert("Added in Your Cart")
      }
    }
    else{
      this.cartProducts.push(event);
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
      alert("Added in Your Cart")
    }
  }
}