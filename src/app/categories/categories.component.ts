import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesServiceService, Category } from '../services/categories-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  searchedId: string = "newCat"
  categories: Category[] = []

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesServiceService,
    private router: Router) { }

  categoriesForm: FormGroup = this.formBuilder.group({
    id: [],
    category1: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    description: ['', Validators.minLength(10)],
  })

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((data: Category[]) => this.categories = data);
  }

  onSelect(category: Category) {
    this.categoriesForm.patchValue(category)
  }

  onDelete(category: string) {
    this.categoryService.deleteCategory(category).subscribe();
    this.router.navigate(["categories"])
  }

  onSubmit() {
    console.log(this.categoriesForm.value.name);
    console.log(this.categoriesForm.value);
  }

}
