import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user';
import { map } from 'rxjs';

export const loginVerifyGuard: CanActivateFn = () => {
  const userService = inject(UserService)
  const router = inject(Router)

  return userService.currentUser$.pipe(
    map((user) => {
      if(user) {
        router.navigate(['/'])
        return false
      } else {
        return true
      }
    })
  )
};
