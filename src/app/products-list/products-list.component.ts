import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsServiceService } from '../services/products-service.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = []

  constructor(
    private productService: ProductsServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe((data)=>this.products=data)
  }

  createProduct() {
    this.router.navigate(['products/detail', 'new-product'])
  }

  getDetail(product:Product){
    this.router.navigate(["products/detail", product.id])
  }
}
