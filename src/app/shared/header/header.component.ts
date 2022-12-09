import { Component, OnInit } from '@angular/core';
import { MenuServiceService } from 'src/app/core/services/menu-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private menuServiceService: MenuServiceService) {}

  ngOnInit(): void {}
  toggle() {
    this.menuServiceService.toggle();
  }
}
