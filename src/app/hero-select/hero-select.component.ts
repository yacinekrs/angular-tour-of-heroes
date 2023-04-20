import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-hero-select',
  templateUrl: './hero-select.component.html',
  styleUrls: ['./hero-select.component.css']
})
export class HeroSelectComponent implements OnInit{

  constructor(private heroService: HeroService) {}

  myControl = new FormControl<string | Hero>('');
  options: Hero[] = [];
  filteredOptions: Observable<Hero[]> = new Observable<Hero []>;

  ngOnInit() {
    this.getHeroes()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
      const name = typeof value === 'string' ? value : value?.name;
      return name ? this._filter(name as string) : this.options.slice();
      }
      ),
    );
  }

  displayFn(user: Hero): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Hero[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.options = heroes);
  }
}
