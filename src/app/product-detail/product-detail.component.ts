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
  title: string = ""
  products: Product[] = []
  btnSubmit: string = ""
  isNew:boolean = true
  codeLenght:number = 8
  
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsServiceService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  productForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    code: ['', Validators.compose([Validators.required, 
      Validators.minLength(this.codeLenght), Validators.maxLength(this.codeLenght)])],
    price: ['', Validators.compose([Validators.required])],
    category: ['', Validators.compose([Validators.required])]
  })

  ngOnInit(): void {

    this.searchedId = this.route.snapshot.paramMap.get('id')!
    
    if (this.searchedId !== "new-product") {
      this.title = "Edit Product"
      this.btnSubmit = "Save"
      this.isNew = false
      this.productService.getProductDetail(+this.searchedId)
        .subscribe((data: Product) => {
          this.productForm.patchValue(data);
        });

    } else {
      this.title = "Create Product"
      this.btnSubmit = "Create"
    }
  }

  onDelete(){
    this.productService.deleteProduct(this.searchedId).subscribe({next:(result)=>{
      console.log('result', result)
      this.router.navigate(['/products'])
    },
    error: (error) => {
      console.error(error)
      alert('Error deleting data');
      }
    });
  }
  
  onSubmit() {
    this.productService.saveProduct(this.searchedId, this.productForm.value,  this.isNew).subscribe( {
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

  goToProductPage() {
    this.router.navigate(["../../"], { relativeTo: this.route })
  }
}
