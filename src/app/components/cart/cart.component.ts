import { Component, OnInit } from '@angular/core';
import { IProductList } from 'src/app/intefaces/ProductList';
import data from '../files/data.json';
import { FormBuilder,FormGroup, FormControl,Validators,FormArray} from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { ICartDetails } from 'src/app/intefaces/CartDetails';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts : ICartDetails [] =[] ;
  total: number = 0;
  loginForm!: FormGroup;
  fullName : string ="";

  constructor(private productsService :ProductsService ,private router: Router) {
    this.loginForm = new FormGroup({    
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      credit: new FormControl('', [Validators.required , Validators.minLength(16) , Validators.maxLength(16) ,  Validators.pattern(/[0-9]/g)]),
    });
   }
   
  ngOnInit(): void {
   this. getCartProducts();
  }

  getFullName(value : string){
    this.fullName = value  ;
  }
  
  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts =JSON.parse(localStorage.getItem("cart")!);
    }
    this.getTotalPrice();
  }

  addAmount(index : number){
   this.cartProducts[index].quantity++ ;
   this.getTotalPrice();
   localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }

  detectChange(){
    this.getTotalPrice();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }

  minusAmount(index : number){
    this.cartProducts[index].quantity-- ;
    this.getTotalPrice();
    if(this.cartProducts[index].quantity<0){
      this.cartProducts[index].quantity = 0;
      this.getTotalPrice();
    }
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }

  deleteCart(index :number){
    this.cartProducts.splice(index , 1);
    this.getTotalPrice();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }

  deleteAllCarts(){
    this.cartProducts =[];
    this.getTotalPrice();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }
  
  getTotalPrice(){
    this.total= 0;
    for(let x in this.cartProducts){
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity ;
    }
    localStorage.setItem("total" , JSON.stringify(this.total));
  }
  
  onSubmit(loginForm:FormGroup){
    if (this.loginForm.valid) {
      localStorage.setItem("fullName" , JSON.stringify(this.fullName));
    }
      }

  }