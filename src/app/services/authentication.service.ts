import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {first, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
// import {CurrentUser} from '../models/currentUser';

// import {UserListDto} from '../_models/userListDto';

export const currentUserWithToken = 'currentUser';
// export const currentUserId = 'currentUserId';
// export const currentUserDto = 'currentUserDto';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.serverUrl + 'auth/login', {username, password})
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem(currentUserWithToken, JSON.stringify(user));
          // this.getAndSaveCurrentUser();
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem(currentUserWithToken);
    // localStorage.removeItem(currentUserId);
    // localStorage.removeItem(currentUserDto);
  }

  // getAndSaveCurrentUser() {
  //   // this.getMe();
  //   this.getCurrentUserListDto();
  // }
  //
  // getMeHttp() {
  //   return this.http.get<CurrentUser>(environment.serverUrl + 'auth/me');
  // }
  //
  // getMe() {
  //   this.getMeHttp().pipe(first()).subscribe(userDto => {
  //     if (userDto && userDto.id) {
  //       localStorage.setItem(currentUserId, userDto.id.toString());
  //       localStorage.setItem(currentUserDto, JSON.stringify(userDto));
  //     }
  //   });
  // }
  //
  // getCurrentUserListDtoHttp() {
  //   return this.http.get<CurrentUser>(environment.serverUrl + 'auth/currentUserListDto');
  // }
  //
  // getCurrentUserListDto() {
  //   this.getCurrentUserListDtoHttp().pipe(first()).subscribe(userDto => {
  //     if (userDto && userDto.id) {
  //       localStorage.setItem(currentUserId, userDto.id.toString());
  //       localStorage.setItem(currentUserDto, JSON.stringify(userDto));
  //     }
  //   });
  // }


}
