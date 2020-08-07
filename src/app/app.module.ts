import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HttpModule } from '@angular/http';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {ProgressComponent} from './progress/progress.component';
import { DndDirective } from './direcitves/dnd.directive';
import { DndComponent } from './dnd/dnd.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { SingleHeroComponent } from './single-hero/single-hero.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';


const routes: Routes = [
  { path: 'single-hero', component: SingleHeroComponent },
  { path: '', component: HeroesComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroFormComponent,
    ProgressComponent,
    DndDirective,
    DndComponent,
    HeroCardComponent,
    SingleHeroComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCarouselModule.forRoot(),
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
