import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { TeamService } from "../services/teams.service";
import { Team } from "../models/team";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'country', 'eliminated'];
  dataSource: MatTableDataSource<Team> = new MatTableDataSource<Team>([]);

  constructor(
    private teamService: TeamService,
    private router: Router) {  }

  ngOnInit(): void {

    this.teamService.getTeams()
      .subscribe(
        teams => {
          this.dataSource = new MatTableDataSource(teams);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        () => {
          this.dataSource = new MatTableDataSource([]);
        });
  }

  navigateToTeam(element: Team) {
    this.teamService.selectTeam(element);
    this.router.navigate(['/teams', element.id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
