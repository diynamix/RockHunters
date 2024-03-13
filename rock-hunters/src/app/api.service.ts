import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Rock } from './types/rock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllRocks() {
    const {apiUrl} = environment;
    return this.http.get<Rock[]>(`${apiUrl}/rocks`);
  }
}
