import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Hero } from '../service/hero.service';

@Component({
  selector: 'app-single-hero',
  templateUrl: './single-hero.component.html',
  styleUrls: ['./single-hero.component.scss']
})
export class SingleHeroComponent implements OnInit {

  slides = [];

  hero: Hero;
  superpowers: string;
  constructor() { }

  ngOnInit(): void {
    this.hero = JSON.parse(sessionStorage.getItem('currentHero'));
    this.hero.images.forEach(image => {
      this.slides.push({'image': image});
    });
    this.superpowers = this.hero.superpowers;
  }

}
