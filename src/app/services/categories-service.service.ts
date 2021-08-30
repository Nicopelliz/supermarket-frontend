import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category{
  id:number
  name:string
  description?:string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {

  categories:Category[]=[
    {
      "id":1,
      "name":"A",
      "description":"prodotti alimentari freschi"
  },
  {
      "id":2,
      "name":"B",
      "description":"prodotti cosmetici"
  },
  {
      "id":3,
      "name":"C"
  },
  {
      "id":4,
      "name":"D"
  },
  {
      "id":5,
      "name":"E",
      "description":"prodotti"
  }
  ]

  public URL = "http://127.0.0.1:3200/categories.json"

  constructor(private http:HttpClient ) {}

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.URL)
  }

  getCategoriesProva():Category[]{
    return this.categories
  }
}
