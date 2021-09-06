import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesServiceService, Category } from '../services/categories-service.service';
import { Product, ProductsServiceService } from '../services/products-service.service';
import { PhotoApiService } from '../services/photo-api.service';

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
  isNew: boolean = true
  codeLenght: number = 8
  categories: Category[] = []
  dateNow: string = Date()
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  todayEngFormat = this.yyyy + '-' + this.mm + '-' + this.dd
  searchWindowOpen = false
  searchTerm: string = ""
  photos: any;


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoriesServiceService,
    private photoService: PhotoApiService
  ) { }

  productForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    code: ['', Validators.compose([Validators.required,
    Validators.minLength(this.codeLenght), Validators.maxLength(this.codeLenght)])],
    expiration: [''],
    price: ['', Validators.compose([Validators.required, Validators.min(0)])],
    imgURL: [''],
    catId: ['', Validators.compose([Validators.required])]
  })


  ngOnInit(): void {

    // set the category field
    this.setCategories()
    console.log(this.categories)
    this.searchedId = this.route.snapshot.paramMap.get('id')!

    if (this.searchedId !== "new-product") {
      this.title = "Edit Product"
      this.btnSubmit = "Save"
      this.isNew = false
      this.productService.getProductDetail(+this.searchedId)
        .subscribe((data: Product) => {
          data.expiration = data.expiration?.split('T')[0];
          this.productForm.patchValue(data);
          this.searchTerm = this.productForm.value.name
        });

    } else {
      this.title = "Create Product"
      this.btnSubmit = "Create"
    }
  }

  // delete product
  onDelete() {
    this.productService.deleteProduct(this.searchedId).subscribe({
      next: (result) => {
        console.log('result', result)
        this.router.navigate(['/products'])
      },
      error: (error) => {
        console.error(error)
        alert('Error deleting data');
      }
    });
  }

  // create or update Product
  onSubmit() {
    console.log(this.productForm.value)

    // make null if no datetime
    if (this.productForm.value.expiration === "") {
      this.productForm.patchValue({ expiration: null })
    }

    // default image if no IMAGE
    if (this.productForm.value.imgURL === ""){
      this.productForm.value.imgURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
    }
    
    this.productService.saveProduct(this.searchedId, this.productForm.value, this.isNew).subscribe({
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

  setCategories() {
    this.categoryService.getCategories()
      .subscribe((data: Category[]) => this.categories = data);
  }

  goToProductPage() {
    this.router.navigate(["../../"], { relativeTo: this.route })
  }

  changeWindow() {
    if (this.searchWindowOpen) {
      this.searchWindowOpen = false
    }
    else {
      this.searchWindowOpen = true
      this.onSearch()
    }
  }

  onSearch() {
    this.photoService.getPhotos(this.searchTerm).subscribe((data) => {
      this.photos = data["results"]
      console.log(this.photos)
    })
  }

  changeSearchTearm(event: any) {
    this.searchTerm = event.value;
    console.log(this.searchTerm);
  }

  choosePhoto(photoURL: string) {
    this.changeWindow()
    this.productForm.patchValue({ imgURL: photoURL })
  }
}
