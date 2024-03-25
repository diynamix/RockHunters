import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { RockAddType, Rock } from './types/rock';

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
    
    return this.http.get<Rock[]>(`${apiUrl}/rocks?${query}`);
  }

  getRockByRockId(rockId: string) {
    const { apiUrl } = environment;
    
    const query = new URLSearchParams({
        load: `owner=_ownerId:users`,
    });

    return this.http.get<Rock>(`${apiUrl}/rocks/${rockId}?${query}`);
};

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
