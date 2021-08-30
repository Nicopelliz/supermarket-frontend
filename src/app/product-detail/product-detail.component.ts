import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductsServiceService } from '../services/products-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  searchedId: string = "new-product"
  title: string= ""
  products: Product[] = []
  btnSubmit: string = ""

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsServiceService,
    private route:ActivatedRoute,
    private router:Router) { }

  productForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    code: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])],
    price: ['', Validators.compose([Validators.required])],
    category: ['', Validators.compose([Validators.required])]
  })

  ngOnInit(): void {

    this.products = this.productService.getProductsProva()

    this.searchedId = this.route.snapshot.paramMap.get('id')!

    if(this.searchedId !== "new-product") {
      this.title =  "Edit Product"
      this.btnSubmit = "Save"
      
    this.productService.getProductDetail(+this.searchedId)
      .subscribe((data: Product) => {
        this.productForm.patchValue(data); 
      });

    } else {
      this.title = "Create Product"
      this.btnSubmit = "Create"  
    }
  
  }

  goToProductPage(){
    this.router.navigate(["../../"],{relativeTo: this.route})
  }

  onSubmit() {
      
    this.productService.saveProduct({
      id: this.searchedId !== 'new' ? this.searchedId : undefined,
      ...this.productForm.value
    }).subscribe({
      next: (result) => {
        console.log('result', result)
        this.router.navigate(['/products'])
      },
      error: (error) => {
        console.error(error)
        alert('Save data error');
      }
    })
  }  
}
