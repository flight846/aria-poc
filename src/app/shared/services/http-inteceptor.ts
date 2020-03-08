import { AuthService } from 'src/app/auth/service/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    // We retrieve the token, if any
    const token = this.auth.getAuthorizationToken();
    let newHeaders = req.headers;
    if (token) {
      // If we have a token, we append it to our new headers
      newHeaders = newHeaders.append('Authorization', `Bearer ${token}`);
    }
    // Finally we have to clone our request with our new headers
    // This is required because HttpRequests are immutable
    const authReq = req.clone({ headers: newHeaders });
    // Then we return an Observable that will run the request
    // or pass it to the next interceptor if any
    return next.handle(authReq);
  }
}
