import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DataService } from '../core/services/data.service';
import { MenuServiceService } from '../core/services/menu-service.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  @ViewChild('drawer') public sidenav: MatSidenav | any;
  showFiller = true;
  isPhonePortrait: boolean = false;
  pagesArray: any = [
    {
      title: 'Dashboard',
      url: '/pages/dashboard',
      icon: 'dashboard',
    },
    {
      title: 'Users',
      url: '/pages/users',
      icon: 'person',
    },
  ];
  userData: any;
  constructor(
    private router: Router,
    private menuServiceService: MenuServiceService,
    private responsive: BreakpointObserver,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserMe();
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      this.isPhonePortrait = false;
      if (result.matches) {
        this.isPhonePortrait = true;
      }
      console.log(this.isPhonePortrait);
    });
  }
  ngAfterViewInit(): void {
    this.menuServiceService.setSidenav(this.sidenav);
  }

  getUserMe() {
    this.dataService.getMethod('users/me').subscribe({
      next: (res) => {
        console.log('🚀 ~ file: pages.page.ts ~ line 36 ~  ~ res', res);
        this.userData = res;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  logout() {
    let dialogRef = this.dialog.open(LogoutDialog, {
      width: '250px',
      data: { data: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result == 'YES') {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }
}
@Component({
  selector: 'logout-dialog',
  templateUrl: '../pages/logout-dialog.html',
})
export class LogoutDialog {
  constructor(
    public dialogRef: MatDialogRef<LogoutDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  logoutClick(button: string) {
    this.dialogRef.close(button);
  }
}
