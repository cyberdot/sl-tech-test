import { Component, OnInit, Input } from '@angular/core';
import { Team } from "../../../models/team";

@Component({
  selector: 'app-read-view',
  templateUrl: './read-view.component.html',
  styleUrls: ['./read-view.component.css']
})
export class ReadViewComponent implements OnInit {

  constructor() { }

  @Input() team: Team;
  @Input() isViewMode: boolean;

  get teamName() {
    if (this.team) {
      return this.team.name;
    }
    return '';
  }

  get teamCountry() {
    if (this.team) {
      return this.team.country;
    }
    return '';
  }

  get teamEliminated() {
    if (this.team) {
      return this.team.eliminated;
    }
    return false;
  }

  ngOnInit() {
  }

}
