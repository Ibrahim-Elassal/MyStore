import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProductList } from 'src/app/intefaces/ProductList';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() data : IProductList = {
    id: 0,
    name: '',
    price: 0,
    url: ''
  };
  @Output() item = new EventEmitter();
  amount : number = 1 ;
 
  constructor() { }

  ngOnInit(): void {
  }

  getQuantity (value :number){
    this.amount = value ;
  }

  add(){
  this.item.emit({item:this.data , quantity :this.amount})  
  }
  
}
