export class MealDetails {
    constructor(id) {

        // loading
        this.loading = document.querySelector('.loading');

        this.rowData = document.getElementById('rowData');

        this.mealId = id;

        this.getMealDetails();
    }

    async getMealDetails() {
        this.loading.classList.remove('d-none');

        let arrStrIngredient = [];
        let arrStrMeasure = [];
        let arrStrTags = [];

        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.mealId}`);
        const repo = await api.json();
        let data = repo.meals[0];

        for (Object.keys in data) {
            if (Object.keys === 'strIngredient1' || Object.keys === 'strIngredient2' ||
                Object.keys === 'strIngredient3' || Object.keys === 'strIngredient4' ||
                Object.keys === 'strIngredient5' || Object.keys === 'strIngredient6' ||
                Object.keys === 'strIngredient7' || Object.keys === 'strIngredient8' ||
                Object.keys === 'strIngredient9' || Object.keys === 'strIngredient10' ||
                Object.keys === 'strIngredient11' || Object.keys === 'strIngredient12' ||
                Object.keys === 'strIngredient13' || Object.keys === 'strIngredient14' ||
                Object.keys === 'strIngredient15' || Object.keys === 'strIngredient16' ||
                Object.keys === 'strIngredient17' || Object.keys === 'strIngredient18' ||
                Object.keys === 'strIngredient19' || Object.keys === 'strIngredient20') {
                if (data[Object.keys] != "" && data[Object.keys] != " " && data[Object.keys] != null && data[Object.keys] != undefined) {
                    arrStrIngredient.push(data[Object.keys]);
                }
            }

            if (Object.keys === 'strMeasure1' || Object.keys === 'strMeasure2' ||
                Object.keys === 'strMeasure3' || Object.keys === 'strMeasure4' ||
                Object.keys === 'strMeasure5' || Object.keys === 'strMeasure6' ||
                Object.keys === 'strMeasure7' || Object.keys === 'strMeasure8' ||
                Object.keys === 'strMeasure9' || Object.keys === 'strMeasure10' ||
                Object.keys === 'strMeasure11' || Object.keys === 'strMeasure12' ||
                Object.keys === 'strMeasure13' || Object.keys === 'strMeasure14' ||
                Object.keys === 'strMeasure15' || Object.keys === 'strMeasure16' ||
                Object.keys === 'strMeasure17' || Object.keys === 'strMeasure18' ||
                Object.keys === 'strMeasure19' || Object.keys === 'strMeasure20') {
                if (data[Object.keys] != "" && data[Object.keys] != " " && data[Object.keys] != null && data[Object.keys] != undefined) {
                    arrStrMeasure.push(data[Object.keys]);
                }
            }

            if (Object.keys === 'strTags') {
                if (data[Object.keys] != "" && data[Object.keys] != " " && data[Object.keys] != null && data[Object.keys] != undefined) {
                    let strStrTags = data[Object.keys];
                    arrStrTags = strStrTags.split(',');
                }
            }
        }

        this.displayMealDetails(data, arrStrIngredient, arrStrMeasure, arrStrTags);
        this.loading.classList.add('d-none');
    }

    displayMealDetails(data, arrStrIngredient, arrStrMeasure, arrStrTags) {
        let strIngredientBox = ``;
        let strTagsBox = ``;

        let cartona = `
            <div class="col-md-4">
               <img class="w-100 rounded-3" src="${data.strMealThumb}"
                  alt="">
               <h2>${data.strMeal}</h2>
            </div>

            <div class="col-md-8">
               <h2>Instructions</h2>
               <p>${data.strInstructions}</p>
               <h3><span class="fw-bolder">Area : </span>${data.strArea}</h3>
               <h3><span class="fw-bolder">Category : </span>${data.strCategory}</h3>
               <h3>Recipes :</h3>
               <ul id="recipes" class="list-unstyled d-flex g-3 flex-wrap">
               </ul>

               <h3>Tags :</h3>
               <ul id="tags" class="list-unstyled d-flex g-3 flex-wrap">
               </ul>

               <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
               <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
        `;

        this.rowData.innerHTML = cartona;
        const recipes = document.getElementById('recipes');
        const tags = document.getElementById('tags');


        if (arrStrIngredient.length > 0) {
            for (let i = 0; i < arrStrIngredient.length; i++) {
                strIngredientBox += `<li class="alert alert-info m-2 p-1">${arrStrMeasure[i]} ${arrStrIngredient[i]}</li> `
            }
            recipes.innerHTML = strIngredientBox;
        }

        if (arrStrTags.length > 0) {
            for (let i = 0; i < arrStrTags.length; i++) {
                strTagsBox += `<li class="alert alert-danger m-2 p-1">${arrStrTags[i]}</li> `;
            }
            tags.innerHTML = strTagsBox;
        }
    }
}

