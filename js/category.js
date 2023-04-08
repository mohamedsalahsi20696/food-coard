import * as indexModule from './index.js'

export class Category {
    constructor() {

        // loading
        this.loading = document.querySelector('.loading');

        this.categoryMeals = document.getElementById('categoryMeals');

        this.getCategoryMeals();

    }

    async getCategoryMeals() {
        this.loading.classList.remove('d-none');

        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);

        const data = await api.json();

        this.displayCategoryMeals(data.categories);
        this.loading.classList.add('d-none');
    }

    displayCategoryMeals(data) {
        let cartona = '';

        if (data == null) {
            cartona = '';
        }
        else {
            for (let i = 0; i < data.length; i++) {
                const fullCategoryDescription = data[i].strCategoryDescription;
                const finalDescription = this.getWordStr(fullCategoryDescription);

                cartona += `
                <div str-category="${data[i].strCategory}" class="col-md-3 mb-4 ">
                <div class="meals overflow-hidden position-relative">
                   <img class="img-fluid rounded-2" src="${data[i].strCategoryThumb}" alt="">
                   <div class="meal-layer text-center px-2 rounded-2">
                      <h3 class="fw-bold ps-2">${data[i].strCategory}</h3>
                      <p>${finalDescription}</p>
                   </div>
                </div>
             </div>
            `;
            }
        }

        this.categoryMeals.innerHTML = cartona;

        this.categories = document.querySelectorAll('[str-category]');

        const that = this;
        this.categories.forEach(function (e) {
            e.addEventListener('click', that.meals.bind(that, e));
        });
    }

    getWordStr(str) {
        return str.split(/\s+/).slice(0, 15).join(" ");
    }

    meals(e) {
        $('section').addClass('d-none');
        $('#search').addClass('d-none');
        $('#home').removeClass('d-none');

        let meals = new indexModule.Home('category', `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.getAttribute('str-category')}`);
    }
}
