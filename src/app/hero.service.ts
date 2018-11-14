import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'

  constructor(private messageService: MessageService,
              private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    // obtendo os herois a partir da url com metodo get
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('obtendo os herois')),
        //captura o error
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.log(`obtendo o heroi id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
    //return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  
  /**
   * Ouvinte para capturar falha em operações HTTP
   * e dar continuidade ao app
   * @param operation - nome da operacao que falhou
   * @param result - valor opcional a ser retornado
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}