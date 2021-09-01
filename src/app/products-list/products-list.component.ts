import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoApiService } from '../services/photo-api.service';
import { Product, ProductsServiceService } from '../services/products-service.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = []
  search = new FormControl('');
  result:any;
  results: any[]=[];

  constructor(
    private productService: ProductsServiceService,
    private router: Router,
    private photoAPI:PhotoApiService) { }

  ngOnInit(): void {
  }

  onSearch(){
    this.productService.getProducts(this.search.value)
    .subscribe({next:(data)=>{
      this.products=data
      console.log(this.products)  
      }
    })
  }

  createProduct() {
    this.router.navigate(['products/detail', 'new-product'])
  }

  getDetail(product:Product){
    this.router.navigate(["products/detail", product.id])
  }
}
