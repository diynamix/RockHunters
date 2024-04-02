import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { ErrorService } from "./core/error/error.service";

const {apiUrl} = environment;

@Injectable()
class AppInterceptor implements HttpInterceptor {
    API = '/data';

    constructor(private errorService: ErrorService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(this.API)) {
            req = req.clone({
                url: req.url.replace(this.API, apiUrl),
                withCredentials: true,
            });
        }
        return next.handle(req).pipe(
            catchError((err) => {
                if (err.status === 403) {
                    this.router.navigate(['/auth/login']);
                } else if (err.status === 409) {
                    this.router.navigate(['/auth/register']);
                } else {
                    this.errorService.setError(err);
                    this.router.navigate(['/error']);
                }
                return [err];
            })
        );
    }
}

export const AppInterceptorProvider: Provider = {
    useClass: AppInterceptor,
    multi: true,
    provide: HTTP_INTERCEPTORS,
}