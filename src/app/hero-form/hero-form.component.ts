import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Hero, HeroService } from '../service/hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  errors = '';
  isLoading = false;

  constructor(private heroService: HeroService) { }

  @Output()
  playerAdded: EventEmitter<Hero> = new EventEmitter<Hero>();

  ngOnInit(): void {
  }

  addHero(nickname) {
    this.isLoading = true;
    this.heroService
      .addHero({
        nickname
      })
      .subscribe(
        hero => {
          this.isLoading = false;
          hero.isUpdating = false;
          this.playerAdded.emit(hero);
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      );
  }

}
