import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category{
  id:number
  category1:string
  description?:string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {

  categories:Category[]=[]

  public URL = "https://localhost:5001/api/categories"

  constructor(private http:HttpClient ) {}

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.URL)
  }

  getCategoriesProva():Category[]{
    return this.categories
  }

  deleteCategory(category: string): Observable<unknown> {
    console.log(category)
    return this.http.delete(this.URL + "/" + category)
  }
}
