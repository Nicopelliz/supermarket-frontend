import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './categories-service.service';

export interface Product {
  id: number
  name: string
  code: number
  price: number
  imgURL?: string
  expiration?: string | null
  CatID: number
}

@Injectable({
  providedIn: 'root'
})

export class ProductsServiceService {

  URL = "https://localhost:5001/api/articles"
  products: Product[] = []

  constructor(private http: HttpClient) { }

  // http GET
  getProducts(search: string, catID: number, minPrice:number, maxPrice: number): Observable<Product[]> {

    // soluzione PROF
    let searchCat = "";
    let minPriceStr = "";
    let maxPriceStr = "";
    if (search !== "") {
      search = "?name=" + search
    }
    if (catID !== null) {
      searchCat = (search===""?"?":"&") + "catId=" + catID
    }
    if (minPrice !== null && (catID !== null || search !=="")){
      minPriceStr = "&priceMin=" + minPrice
    }else if(minPrice !==null && catID === null && search === ""){
      minPriceStr = "?priceMin=" + minPrice
    }
    if (maxPrice !== null && (catID !== null || minPrice !== null || search !=="")){
      maxPriceStr = "&priceMax=" + maxPrice
    }else if (maxPrice !== null && catID === null && minPrice === null && search ===""){
      maxPriceStr = "?priceMax=" + maxPrice
    }
    return this.http.get<Product[]>(this.URL + search + searchCat + minPriceStr + maxPriceStr)

    // soluzione TEDIOSA MIA

    // if (search !== "") {
    //   return this.http.get<Product[]>(this.URL + "?name=" + search)
    // } else if (catID) {
    //   return this.http.get<Product[]>(this.URL + "?catId=" + catID)
    // } else if (search !== "" && catID) {
    //   return this.http.get<Product[]>(this.URL + "?catId=" + catID + "?name=" + search)
    // } else {
    //   return this.http.get<Product[]>(this.URL)
    // }
  }


  // http GET/ID
  getProductDetail(id: number): Observable<Product> {
    return this.http.get<Product>(this.URL + "/" + id)
  }

  // http DELETE
  deleteProduct(id: string): Observable<unknown> {
    return this.http.delete(this.URL + "/" + id)
  }

  // http POST & PUT
  saveProduct(id: string, data: Product, isNew: boolean) {
    if (data.expiration === "") {
      data.expiration = null
    }
    if (!isNew) {
      data.id = parseInt(id)
      return this.http.put(this.URL + '/' + id, data)
    } else {
      return this.http.post(this.URL, data)
    }
  }
}
