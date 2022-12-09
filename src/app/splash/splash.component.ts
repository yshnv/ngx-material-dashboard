import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (this.authService.accessToken) {
        this.router.navigate(['/pages']);
      } else {
        this.router.navigate(['/auth']);
      }
    }, 1000);
  }
}
