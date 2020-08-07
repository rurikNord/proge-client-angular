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
  isLoading = true;

  testData: Hero[];
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    // this.getHeroes();
    fetch('assets/img/images.jpg').then(response => response.blob()).then(data => {
      this.filetoBase64(data).then((base64: string) => {
        this.testData = [{
          nickname: 'Super',
          catch_phrase: 'Love is love',
          superpowers: 'Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser, Laser',
          real_name: 'Klark',
          id: 1,
          isUpdating: true,
          images: [base64]
        }];
        console.log(this.testData);
      });
    });
  }

  // getHeroes() {

  //   this.heroService
  //     .getHero()
  //     .subscribe(
  //       heroes => {
  //         this.heroes = heroes;
  //         this.isLoading = false;
  //       },
  //       error => {
  //         this.errorMessage = ( error as any);
  //         this.isLoading = false;
  //       }
  //     );
  // }

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
    const hero = this.findHero(id);
    hero.isUpdating = true;
    this.heroService
      .deleteHero(id)
      .subscribe(
        response => {
          const index = this.heroes.findIndex(player => player.id === id);
          this.heroes.splice(index, 1);
          hero.isUpdating = false;
        },
        error => {
          this.errorMessage = ( error as any);
          hero.isUpdating = false;
        }
      );
  }

  filetoBase64(file: Blob): Promise<string | ArrayBuffer> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
    });
  }

}
