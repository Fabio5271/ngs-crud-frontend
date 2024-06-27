import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(@Inject(String) private APIUrl: string, private http: HttpClient) { }

  // Get all
  getAll(): Observable<any> {
    return this.http.get<any>(this.APIUrl);
  }

  // Get with id
  get(id: any): Observable<any> {
    return this.http.get(`${this.APIUrl}/${id}`);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.APIUrl}`, data);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.APIUrl, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.APIUrl}/${id}`);
  }
}
