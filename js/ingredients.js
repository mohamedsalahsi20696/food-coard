import * as indexModule from './index.js'

export class Ingredient {
    constructor() {

        // loading
        this.loading = document.querySelector('.loading');

        this.ingredientsMeal = document.getElementById('ingredientsMeal');

        this.getIngredients();
    }

    async getIngredients() {
        this.loading.classList.remove('d-none');

        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);

        const data = await api.json();

        this.displayIngredients(data.meals);
        this.loading.classList.add('d-none');
    }

    displayIngredients(data) {
        let cartona = '';

        if (data == null) {
            cartona = '';
        }
        else {
            for (let i = 0; i < 20; i++) {
                const fullDescription = data[i].strDescription;
                const finalDescription = this.getWordStr(fullDescription);

                cartona += `
                <div str-ingredient="${data[i].strIngredient}" class="col-md-3">
                    <div class="rounded-2 text-center cursor-pointer">
                         <i class="fa-solid fa-house-laptop fa-4x"></i>
                         <h3>${data[i].strIngredient}</h3>
                         <p>${finalDescription}</p>
                    </div>
                </div>
            `;
            }
        }

        this.ingredientsMeal.innerHTML = cartona;

        this.ingredient = document.querySelectorAll('[str-ingredient]');

        const that = this;
        this.ingredient.forEach(function (e) {
            e.addEventListener('click', that.ingredients.bind(that, e));
        });
    }

    getWordStr(str) {
        return str.split(/\s+/).slice(0, 15).join(" ");
    }

    ingredients(e) {
        $('section').addClass('d-none');
        $('#search').addClass('d-none');
        $('#home').removeClass('d-none');

        let area = new indexModule.Home('area', `https://www.themealdb.com/api/json/v1/1/filter.php?i=${e.getAttribute('str-ingredient')}`);
    }
}
