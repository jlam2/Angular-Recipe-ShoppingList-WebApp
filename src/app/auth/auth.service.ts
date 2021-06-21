import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient){}

    signup(email: string, password: string){
        return this.http.post<AuthResponseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYZsVC33K7malxpOqMtn0BYkeOcSoL280',
                    {email: email, password: password, returnSecureToken: true}
                ).pipe(catchError(this.handleError));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYZsVC33K7malxpOqMtn0BYkeOcSoL280',
            {email: email, password: password, returnSecureToken: true}
        ).pipe(catchError(this.handleError));
      }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error has occured!'
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS': errorMessage = 'This email already exists.'; break;
            case 'EMAIL_NOT_FOUND': errorMessage = 'This email does not exist.'; break;
            case 'INVALID_PASSWORD': errorMessage = 'This password is invalid'; break;
        }
        return throwError(errorMessage);
    }
}