import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { RockListType } from './types/rock';

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
    return this.http.post<RockListType>(`${apiUrl}/rocks`, rock);
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
