import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const userService = inject(UserService)
  const toastr = inject(ToastrService)
  const router = inject(Router)

  return userService.currentUser$.pipe(
    map((user) => {
      if(user) {
        if(!userService.isAdmin()) {
          toastr.error('No tienes permiso para acceder a esta pagina.')
          router.navigate(['/no-authorization'])
          return false
        }

        return true
      } else {
        toastr.error('No tienes permiso para acceder a esta pagina.')
        router.navigate(['/no-authorization'])

        return false
      }
    })
  )
};
