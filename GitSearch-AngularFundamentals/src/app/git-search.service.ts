import { Injectable, Inject } from '@angular/core';
import { GitSearch } from './git-search';
import { GitSearchuser} from './git-searchuser'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GitSearchService {
  cachedValues: Array<{
    [query: string]: GitSearch
  }> = [];
  cachedUserValues: Array<{
    [query: string]: GitSearchuser
  }> = [];
  constructor(private http: HttpClient) {
      
  }

  gitSearch = (query: string): Promise<GitSearch> => {
    let promise = new Promise<GitSearch>((resolve, reject) => {
        if (this.cachedValues[query]) {
            resolve(this.cachedValues[query])
        }
        else {
            this.http.get('https://api.github.com/search/repositories?q=' + query)
            .toPromise()
            .then( (response) => {
                resolve(response as GitSearch)
            }, (error) => {
                reject(error);
            })
        }
    })
    return promise;
  }

    gitSearchuser = (query: string): Promise<GitSearchuser> => {
      let promise = new Promise<GitSearchuser>((resolve, reject) => {
          if (this.cachedUserValues[query]) {
              resolve(this.cachedUserValues[query])
          }
          else {
              this.http.get('https://api.github.com/search/users?q=' + query)
              .toPromise()
              .then( (response) => {
                  resolve(response as GitSearchuser)
              }, (error) => {
                  reject(error);
              })
          }
      })
      return promise;
  }
}