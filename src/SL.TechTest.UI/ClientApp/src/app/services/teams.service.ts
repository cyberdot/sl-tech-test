import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Team } from "../models/team";

@Injectable({ providedIn: 'root'})
export class TeamService {
  constructor(
    private http: HttpClient) {}

  private team: Team;

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(environment.api.teams);
  }

  getTeam(id: string): Observable<Team> {
    return this.http.get<Team>(environment.api.teams + '/' + id);
  }

  getCountries(): Observable<string[]> {
    return this.http.get<string[]>(environment.api.countries);
  }

  selectTeam(team: Team) {
    this.team = team;
  }

  get selectedTeam() {
    return this.team;
  }

  updateTeam(team: Team) {
    return this.http.put(environment.api.teams, team);
  }
}
