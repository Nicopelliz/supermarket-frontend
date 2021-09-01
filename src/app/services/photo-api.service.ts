import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoApiService {

  constructor(private http:HttpClient) { }

  URL = "https://api.unsplash.com/search/photos?page=1&client_id=cK-6QZniSExxjI5B02_i9ldAkH_0fAnR_Yzlq8msTic&query="


  getPhotos(searchTerm:string):Observable<any>{ 
    console.log(searchTerm)
    return this.http.get(this.URL+searchTerm)
  }
}
