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

  selectedCat: string = "newCat"
  categories: Category[] = []
  category?: Category
  tryWay: string = ""
  try: boolean = true
  isNew: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesServiceService,
    private router: Router) { }

  categoriesForm: FormGroup = this.formBuilder.group({
    category1: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    description: ['', Validators.minLength(10)],
  })

  ngOnInit(): void {
    this.setCategories()
  }

  setCategories() {
    this.categoryService.getCategories()
      .subscribe((data: Category[]) => this.categories = data);
  }

  onSelect(category: Category) {
    this.categoriesForm.patchValue(category)
    this.selectedCat = category.category1
  }

  onDelete(category: string) {
    this.categoryService.deleteCategory(category).subscribe((data) => this.setCategories())
  }

  // da vedere come sistemare la put

  onSubmit() {
    this.categoryService.saveCategory(this.categoriesForm.value, this.isNew).subscribe({
      next: (result) => {
        console.log('result', result)
        this.setCategories()
        this.clearForm()
      },
      error: (error) => {
        console.error(error)
        alert('Save data error');
      }
    })
  }

  clearForm() {
    this.categoriesForm.patchValue({ category1: "", description: "" })
  }
}
