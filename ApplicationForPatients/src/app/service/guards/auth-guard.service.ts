import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthGuard implements CanActivate{
    token: any;

    constructor(private router: Router, private jwtHelper: JwtHelperService) {
    }

    canActivate() {
        this.token = localStorage.getItem("jwt");

        if(this.token && !this.jwtHelper.isTokenExpired(this.token)) {
            return true;
        }

        this.router.navigate(["login"]);
        
        return false;
    }
}