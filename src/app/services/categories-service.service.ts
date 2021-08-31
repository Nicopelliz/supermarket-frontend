import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category{
  catId:number
  category1:string
  description?:string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {

  public URL = "https://localhost:5001/api/categories"

  constructor(private http:HttpClient ) {}

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.URL)
  }

  deleteCategory(category: number): Observable<unknown> {
    console.log(category)
    return this.http.delete(this.URL + "/" + category)
  }

  saveCategory(id:number,data:Category, isNew: boolean){
    console.log(data)
    if (!isNew) {
      console.log(data.catId)
      return this.http.put(this.URL + '/' + id, data)
    } else {
       return this.http.post(this.URL, data)
    }
  }



}
