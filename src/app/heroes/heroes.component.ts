import { Component, OnInit } from '@angular/core';
import { Hero, HeroService } from '../service/hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  errorMessage: string;
  isLoading: boolean = true;
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {

    this.heroService.getHeroAxios();

    this.heroService
      .getHero()
      .subscribe(
        heroes => {
          this.heroes = heroes;
          this.isLoading = false;
        },
        error => {
          this.errorMessage = <any>error;
          this.isLoading = false;
        }
      );
  }

  findHero(id): Hero {
    return this.heroes.find(hero => hero.id === id);
  }

  isUpdating(id): boolean {
    return this.findHero(id).isUpdating;
  }

  appendHero(player: Hero) {
    this.heroes.push(player);
  }

  deleteHero(id) {
    let hero = this.findHero(id);
    hero.isUpdating = true;
    this.heroService
      .deleteHero(id)
      .subscribe(
        response => {
          let index = this.heroes.findIndex(player => player.id === id)
          this.heroes.splice(index, 1)
          hero.isUpdating = false;
        },
        error => {
          this.errorMessage = <any>error;
          hero.isUpdating = false;
        }
      );
  }

}
