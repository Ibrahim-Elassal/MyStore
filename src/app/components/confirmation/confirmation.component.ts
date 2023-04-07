import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  
  totalPrice : number = JSON.parse(localStorage.getItem("total")!);
  fullName : number = JSON.parse(localStorage.getItem("fullName")!);

  constructor() { }

  ngOnInit(): void {}

}
