import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from "../services/teams.service";
import { Team } from "../models/team";
import { EditViewComponent } from "./components/edit-view/edit-view.component";

@Component({
  selector: 'app-team-details-component',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute) { }

  @ViewChild(EditViewComponent, { static: false })
  private editViewComponent: EditViewComponent;

  team: Team;
  inEditMode: boolean = false;

  ngOnInit(): void {
    this.team = this.teamService.selectedTeam;
    if (!this.team) {
      const id = this.route.snapshot.paramMap.get('id');
      this.teamService.getTeam(id)
        .subscribe(team => this.team = team);
    }
  }

  
  get teamBadgeUrl() {
    if (this.team) {
      return `http://img.uefa.com/imgml/TP/teams/logos/70x70/${this.team.id}.png`;
    }
    return '';
  }

  navigateToUefaProfile(id: number) {
    window.location.href = `https://www.uefa.com/teamsandplayers/teams/club=${id}/profile/index.html`;
  }

  edit() {
    this.inEditMode = true;
  }

  save() {
    this.editViewComponent.save();
  }

  cancel() {
    this.inEditMode = false;
  }

}
