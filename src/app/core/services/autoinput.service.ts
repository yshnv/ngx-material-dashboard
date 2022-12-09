import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { map } from "rxjs/internal/operators/map";
import { HttpApi } from "../http/http-api";

@Injectable({
  providedIn: "root"
})
export class AutoinputService {
  private restaurants: any[] = [];
  constructor(private http: HttpClient) {}
  getResults(keyword: string) {
    let observable: Observable<any>;

    if (this.restaurants.length === 0) {
      observable = this.http.get(HttpApi.getAllRestaurants);
    } else {
      observable = of(this.restaurants);
    }

    return observable.pipe(
      map((result) => {
        console.log(
          "🚀 ~ file: autoinput.service.ts ~ line 25 ~ AutoinputService ~ map ~ result",
          result
        );
        return result.results.filter((item) => {
          return item.title.toLowerCase().startsWith(keyword.toLowerCase());
        });
      })
    );
  }
}
