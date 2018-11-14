import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    const heroes= [
      { id: 1, name: 'Hulk' },
      { id: 2, name: 'Capitão America' },
      { id: 3, name: 'Home de Ferro' },
      { id: 4, name: 'Thor' },
      { id: 5, name: 'Viuva Negra' },
      { id: 6, name: 'Homem formiga' },
      { id: 7, name: 'Pantera Negra' },
      { id: 8, name: 'Homem Aranha' },
      { id: 9, name: 'Mulher Vespa' },
      { id: 10, name: 'Arqueiro Verde' }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
