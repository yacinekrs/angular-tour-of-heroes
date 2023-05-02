import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  heroes: Hero[] = [];
  myControl = new FormControl<string | Hero>('');
  filteredOptions: Observable<Hero[]> = new Observable<Hero[]>;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.heroes.slice();
      }),
    );
  }
  displayFn(user: Hero): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Hero[] {
    const filterValue = name.toLowerCase();

    return this.heroes.filter(heroes => heroes.name.toLowerCase().includes(filterValue));
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
}


