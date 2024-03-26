import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  userSubscription: Subscription;

  user: User | undefined;
  USER_KEY = '[user]';
  apiUrl = 'http://localhost:3030/users';

  get isLogged(): boolean {
    return !!this.user;
  }
  
  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${this.apiUrl}/login`, {email, password})
      .pipe(tap((user) => this.user$$.next(user)));
  }
  
  register(email: string, password: string, username: string) {
    return this.http
      .post<User>(`${this.apiUrl}/register`, {email, password, username})
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('X-Authorization', `${token}` );

    return this.http
      .get(`${this.apiUrl}/logout`, { headers })
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  getUser() {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      
    }

    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('X-Authorization', `${token}` );      

    return this.http
      .get<User>(`${this.apiUrl}/me`, { headers })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }
}