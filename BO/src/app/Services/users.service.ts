import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user.model'

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private httpClient: HttpClient) {}

    getAllUser(): Observable<Array<User>> {
        return this.httpClient.get<Array<User>>(environment.apiUrl + '/api/v1/user/all');
    }
}
