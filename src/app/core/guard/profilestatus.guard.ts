import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { AuthService } from "../service/auth.service";

@Injectable()
export class ProfileStatus implements Resolve<any> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let status = this.authService.isprofileStatusIncomplete();
    if (status == 0) {
      this.router.navigate(["/app/complete-registration"]);
    } else if (status == 1) {
      this.router.navigate(["/app/not-verified"]);
    }
  }
}
