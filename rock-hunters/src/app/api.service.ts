import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { RockAddType, Rock, RockForEdit, RockFavouriteType } from './types/rock';
import { Like } from './types/like';

const { apiUrl } = environment;
const rockUrl = `${apiUrl}/rocks`;
const likeUrl = `${apiUrl}/likes`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('accessToken');

    return new HttpHeaders()
      .set('content-type','application/json')
      .set('X-Authorization', `${token}` );
  }

  // ROCKS ----------

  getAllRocks() {
    const query = new URLSearchParams({
        load: `owner=_ownerId:users`,
    });
   
    return this.http.get<Rock[]>(`${rockUrl}?${query}&sortBy=_createdOn%20desc`);
  }

  getRockByRockId(rockId: string) {  
    const query = new URLSearchParams({
        load: `owner=_ownerId:users`,
    });

    return this.http.get<Rock>(`${rockUrl}/${rockId}?${query}`);
  };

  getRockForEditByRockId(rockId: string) {  
    return this.http.get<RockForEdit>(`${rockUrl}/${rockId}`);
  };

  getFavouriteRocks(userId: string) {
    const query = new URLSearchParams({
        where: `_ownerId="${userId}"`,
        load: `rock=rockId:rocks`,
        // sortBy: `_createdOn desc`
    });

    return this.http.get<RockFavouriteType>(`${likeUrl}?${query}&sortBy=_createdOn%20desc`);
  };

  createRock(rock: RockAddType) {
    const headers = this.getHeaders();

    const body = JSON.stringify(rock);

    return this.http.post<RockAddType>(rockUrl, body, { headers });
  }

  editRock(rockId: String, rock: RockAddType) {
    const headers = this.getHeaders();

    const body = JSON.stringify(rock);

    return this.http.put<RockAddType>(`${rockUrl}/${rockId}`, body, { headers });
  };

  deleteRock(rockId: string) {
    const headers = this.getHeaders();

    return this.http.delete<RockAddType>(`${rockUrl}/${rockId}`, { headers });
  }


  // LIKES ----------

  like(rockId: string)  {
    const headers = this.getHeaders();

    const body = { rockId };

    return this.http.post<Like>(likeUrl, body, { headers });
  }

  unlike(likeId : string) {
    const headers = this.getHeaders();

    return this.http.delete<Like>(`${likeUrl}/${likeId}`, { headers });
  };
  
  getAllLikesByRockId(rockId: string) {
    const query = new URLSearchParams({
        where: `rockId="${rockId}"`,
    });
    
    return this.http.get<number>(`${likeUrl}?${query}&count`);
  }
  
  getLikeId(userId: string, rockId: string) {
    const query = new URLSearchParams({
      where: `rockId="${rockId}"`,
    });

    return this.http.get<Like[]>(`${likeUrl}?${query}`);
    
    // const searchParams = new URLSearchParams({
    //   where: `rockId="${rockId} AND _ownerId="${userId}"`,
    //   select: `_id`,
    // });

    // const query = `where=rockId%3D%22${rockId}%22%20AND%20_ownerId%3D%22${userId}%22`

    // return this.http.get<string>(`${likeUrl}?${searchParams}&${query}`);
  }
}
