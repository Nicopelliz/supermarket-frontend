import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { PhotoApiService } from '../services/photo-api.service';
import { Product, ProductsServiceService } from '../services/products-service.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Output() redirect: EventEmitter<String>=new EventEmitter() 

  daCanc : string = "ciao" 

  products: Product[] = []
  search = new FormControl('');
  result:any;
  results: any[]=[];

  constructor(
    private productService: ProductsServiceService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let allParams = this.route.snapshot.paramMap.get("")
    console.log(allParams)
  }


  onSearch(){
    this.productService.getProducts(this.search.value)
    .subscribe({next:(data)=>{
      this.products=data
      console.log(this.products) 
      // this.redirect.emit(this.products)
      this.redirect.emit(this.daCanc) 
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
