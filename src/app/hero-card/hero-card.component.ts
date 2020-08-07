import { Component, OnInit, Input } from '@angular/core';
import { Hero } from './../service/hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input('Hero') hero: Hero;

  nickname: string;
  realName: string;
  catchPhrase: string;
  firstImage: string;

  testData = {Data: this.hero};

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.nickname = this.hero.nickname;
    this.realName = this.hero.real_name;
    this.catchPhrase = this.hero.catch_phrase;
    this.firstImage = this.hero.images[0];
  }

  openHero() {
    sessionStorage.setItem('currentHero', JSON.stringify(this.hero));
    this.router.navigate(['/single-hero']);
  }

}



