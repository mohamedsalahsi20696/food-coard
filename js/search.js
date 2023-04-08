import * as mealDetailsModule from './mealDetails.js'
import * as indexModule from './index.js'

export class Search {
    constructor(kind, meal) {

        // loading
        this.loading = document.querySelector('.loading');

        this.kind = kind;
        this.meal = meal;

        this.search();
    }

    search() {
        if (this.meal !== "") {
            if (this.kind === 'name') {
                let search = new indexModule.Home('search', `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.meal}`);
            }
            else {
                let search = new indexModule.Home('search', `https://www.themealdb.com/api/json/v1/1/search.php?f=${this.meal}`);
            }
        }
    }

    mealDetails(e) {
        let details = new mealDetailsModule.MealDetails(e.getAttribute('id-meal-search'));
    }
}
