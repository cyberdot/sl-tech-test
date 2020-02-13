import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Team } from "../../../models/team";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamService } from "../../../services/teams.service";
import { SimpleChanges } from "@angular/core/core";

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css']
})
export class EditViewComponent implements OnInit, OnChanges {

  constructor(
    private teamService: TeamService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  @Input() team: Team;
  @Input() isEditMode: boolean = false;

  countries: string[];

  private snackBarRef;

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

  editForm = new FormGroup({
    teamName: new FormControl(this.teamName, [Validators.required]),
    teamCountry: new FormControl(this.teamCountry),
    isTeamEliminated: new FormControl(this.teamEliminated)
  });

  ngOnInit() {

    this.teamService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const teamChanged = changes["team"];
    if (teamChanged && teamChanged.currentValue) {
      console.log(teamChanged);
      this.editForm.patchValue({
        teamName: teamChanged.currentValue.name,
        teamCountry: teamChanged.currentValue.country,
        isTeamEliminated: teamChanged.currentValue.eliminated
      });
    }
  }


  save() {
    if (this.editForm.valid) {
      const form = this.editForm.value;
      const team = <Team>{
        id: this.team.id,
        name: form.teamName,
        country: form.teamCountry,
        eliminated: form.isTeamEliminated
      }
      this.teamService.updateTeam(team)
        .subscribe(() => {
          this.snackBarRef = this.snackBar.open("Team details have been updated!", "Close", { duration: 2000, verticalPosition: 'top' });
          this.snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigate(['/']);
          });
        });
    }
  }
}
