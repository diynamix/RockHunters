import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { RockAddType, RockListType } from './types/rock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllRocks() {
    const query = new URLSearchParams({
        load: `owner=_ownerId:users`,
    });

    const { apiUrl } = environment;
    
    return this.http.get<RockListType[]>(`${apiUrl}/rocks?${query}`);
  }

  createRock(rock : {}) {
    const { apiUrl } = environment;
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('X-Authorization', `${token}` );

    const body = JSON.stringify(rock);

    return this.http.post<RockAddType>(`${apiUrl}/rocks`, body, { headers });
  }


  // LIKES ----------
  
  getAllLikesByRockId(rockId: string) {
    const query = new URLSearchParams({
        where: `rockId="${rockId}"`,
    });

    const { apiUrl } = environment;

    return this.http.get<number>(`${apiUrl}/likes?${query}&count`);
  }
}
