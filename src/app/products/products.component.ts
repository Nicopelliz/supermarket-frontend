import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../services/products-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  
  daCancel: any;

  ngOnInit(): void {
    console.log(this.daCancel)
  }

}
