import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsServiceService } from '../services/products-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  searchedId: string = ""
  title: string= ""
  products: Product[] = []

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsServiceService,
    private route:ActivatedRoute) { }

  productForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    code: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])],
    price: ['', Validators.compose([Validators.required])],
    category: ['', Validators.compose([Validators.required])]
  })

  ngOnInit(): void {
    
    // this.categoryService.getCategories()
    //   .subscribe((data: Category[]) => this.categories = data);

    this.products = this.productService.getProductsProva()

    this.searchedId = this.route.snapshot.paramMap.get('id')!

    if(this.searchedId !== "") {
      this.title =  'Edit Detail Page'
      // v1
      
/*
      // v2
      this.todoService.getDetailData(+this.requestId)
        .subscribe((data: Todo) => {
          this.todoForm.patchValue(data); 
        });
*/
    } else {
      this.title = 'Create Detail Page'
      
    }
  
  }

  onSubmit() {
    console.log(this.productForm.value.name);
    console.log(this.productForm.value);
  }
}
