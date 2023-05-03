import { Hero } from '../hero';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();//<-- on l'appele dans ngOnInit comme ca des le debut on aura les heros dans hero
  }

  getHero(): void {//<-- elle est appelée dans le ngOnInit
    const id = Number(this.route.snapshot.paramMap.get('id'));  // <-- elle reconnait l'id avec le path qu'on a designé dans app-routing.moduls.ts
    this.heroService.getHero(id)
      .subscribe(h => this.hero = h);//<-- il va recevoir le hero qui convient a l'id et ensuite on peut utiliser cet hero dans le html
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
