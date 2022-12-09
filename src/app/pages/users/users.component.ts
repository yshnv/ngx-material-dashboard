import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpApi } from 'src/app/core/http/http-api';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator | any;
  tableColumn: string[] = ['Name', 'Mobile', 'Email', 'Negative', 'Actions'];
  usersArray = new MatTableDataSource<any>([]);
  public totalLength = 0;

  public pageSize = 10;
  public pageIndex = 0;

  page = '0';
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(page: string = '1', pageSize = 10) {
    this.pageSize = pageSize;
    this.dataService
      .getMethod(
        HttpApi.getUsers +
          '?role=user&page=' +
          page +
          '&sortBy=createdAt:desc&limit=' +
          this.pageSize
      )
      .subscribe({
        next: (res) => {
          console.log(
            '🚀 ~ line 189 ~ UsersPage ~ this.data.getMethod ~ res',
            res
          );
          this.usersArray = new MatTableDataSource<any>(res?.results);
          this.pageSize = res.limit;
          this.pageIndex = res.page - 1;

          this.totalLength = res.totalResults;

          console.log(this.usersArray);
          this.usersArray.paginator = this.paginator;
          console.log(this.totalLength);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  getData(event: any) {
    console.log(event);
    this.getUsers(event.pageIndex + 1, event.pageSize);
  }
  ngAfterViewInit() {
    this.usersArray.paginator = this.paginator;
  }
}
