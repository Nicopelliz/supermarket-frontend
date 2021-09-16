import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { PhotoApiService } from '../services/photo-api.service';
import { Product, ProductsServiceService } from '../services/products-service.service';
import { CategoriesServiceService, Category } from '../services/categories-service.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Output() redirect: EventEmitter<String>=new EventEmitter() 

  daCanc : string = "ciao" 

  products: Product[] = []
  categories: Category[] = []
  catID = new FormControl(null)
  search = new FormControl("");
  minPrice = new FormControl();
  maxPrice = new FormControl();
  result:any;
  results: any[]=[];

  constructor(
    private productService: ProductsServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoriesServiceService) { }

  ngOnInit(): void {
    let allParams = this.route.snapshot.paramMap.get("")
    console.log(allParams)
    this.setCategories()
  }

  setCategories() {
    this.categoryService.getCategories()
      .subscribe((data: Category[]) => this.categories = data);
  }

  onSearch(){
    console.log(this.search.value, this.catID.value, this.minPrice.value, this.maxPrice.value)
    this.productService.getProducts(this.search.value, this.catID.value, this.minPrice.value, this.maxPrice.value)
    .subscribe({next:(data)=>{
      this.products=data
      console.log(this.products) 
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
