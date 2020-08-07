import { Component, OnInit, EventEmitter, Output, NgZone, ViewChild } from '@angular/core';
import { Hero, HeroService } from '../service/hero.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  constructor(private heroService: HeroService) { }
  heroImages: Array<File>;
  errors = '';
  isLoading = false;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  @Output()
  playerAdded: EventEmitter<Hero> = new EventEmitter<Hero>();

  addHeroFields = new FormGroup({
    nickname: new FormControl('', Validators.required),
    realName: new FormControl('', Validators.required),
    catchPhrase: new FormControl('', Validators.required),
    superpowers: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  addHero(nickname): void {
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

  imageAddorDelete(imageArray): void {
    this.heroImages = imageArray;
  }
  onSubmit() {
    console.warn(this.addHeroFields.value);
  }
}
