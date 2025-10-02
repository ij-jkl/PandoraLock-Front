import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ResponseObjectJsonDto {
  message: string;
  code: string;
  response: any;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'https://localhost:7085';

  constructor(private http: HttpClient) {}

  register(userData: RegisterRequest): Observable<ResponseObjectJsonDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ResponseObjectJsonDto>(
      `${this.baseUrl}/create/user`,
      userData,
      { headers }
    );
  }
}
