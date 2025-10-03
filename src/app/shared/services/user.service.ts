import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseObjectJsonDto } from '../models/response-object-json-dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'https://localhost:7085';

  constructor(private http: HttpClient) {}

  login(credentials: { usernameOrEmail: string; password: string }): Observable<ResponseObjectJsonDto<User>> {
    return this.http.post<ResponseObjectJsonDto<User>>(`${this.baseUrl}/login`, credentials);
  }
}
