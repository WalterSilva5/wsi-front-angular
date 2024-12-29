import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthDto } from '../dto/auth-data.dto';
import { AuthApiService } from '../provider/auth-api.service';
@Injectable({
    providedIn: 'root',
})
export class AuthApiHandler {
    constructor(private api: AuthApiService) { }

    public async login(authData: AuthDto): Promise<any> {
        return firstValueFrom(this.api.login(authData));
    }
}