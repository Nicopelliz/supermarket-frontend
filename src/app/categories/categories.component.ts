import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesServiceService, Category } from '../services/categories-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = []

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesServiceService) { }

  categoriesForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    description: ['', Validators.minLength(10)],
  })

  ngOnInit(): void {
    
    // this.categoryService.getCategories()
    //   .subscribe((data: Category[]) => this.categories = data);

    this.categories = this.categoryService.getCategoriesProva()
  }

  onSubmit() {
    console.log(this.categoriesForm.value.name);
    console.log(this.categoriesForm.value);
  }

}
