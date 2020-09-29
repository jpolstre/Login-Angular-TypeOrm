import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'role', 'username'];
  dataSource = new MatTableDataSource();
  constructor(private userSvc: UsersService) {}
  ngOnInit(): void {
    this.userSvc.getAll().subscribe((users) => {
      console.log(users);
      this.dataSource.data = users;
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
