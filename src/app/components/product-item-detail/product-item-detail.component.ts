import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICartDetails } from 'src/app/intefaces/CartDetails';
import { IProductDetails } from 'src/app/intefaces/ProductDetails';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  productId:number;
  productDetails : IProductDetails [] = [];
  cartProducts: ICartDetails[]=[];
  amount: number = 1;
  loading :boolean = true ;
  
  constructor(private activatedRoute : ActivatedRoute , private productsService : ProductsService ) { 
    this.productId =  +(this.activatedRoute.snapshot.paramMap.get('id') ||'')  ;
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getQuantity (value :number){return
    this.amount = value ;
  }

  getProductDetails(){
    this.productsService.fetchProductDetails(this.productId).subscribe(
      (res)=>{
        this.productDetails = res.filter(item => item.id == this.productId) ;
         this.loading =false;
      },
      (error)=> {
        console.log(error.message);
        alert("Error")
      }
    )
  }

  addToCart(product:IProductDetails){
    if("cart" in localStorage){
      this.cartProducts =JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find(item => item.item.id == product.id  );
      if(exist){
        alert("Product already in Your Cart")
      }
      else{
        this.cartProducts.push({item:product , quantity :this.amount});
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
        alert("Added in Your Cart")
      }
    }
    else {
      this.cartProducts.push({item:product , quantity :this.amount});
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
      alert("Added in Your Cart")
    }
    }
}
