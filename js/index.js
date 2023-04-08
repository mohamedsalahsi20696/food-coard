import * as mealDetailsModule from './mealDetails.js'
import * as searchModule from './search.js'
import * as categoryModule from './category.js'
import * as areaModule from './area.js'
import * as ingredientsModule from './ingredients.js'
import * as contactUsModule from './contactUs.js'

export class Home {
    constructor(from, url) {

        // sideBar
        this.sidebarIcon = document.getElementById('sidebarIcon');
        this.sidebarIcon.addEventListener('click', this.openCloseSideBar);
        this.sidebarElement = document.querySelectorAll('#sideBar ul li');
        const that = this;
        this.sidebarElement.forEach(function (e) {
            e.addEventListener('click', that.sections.bind(that, e));
        });
        // loading
        this.loading = document.querySelector('.loading');
        // home
        this.meals = document.getElementById('meals');
        // search
        this.searchByName = document.getElementById('searchByName');
        this.searchByName.addEventListener('input', this.srchByName.bind(this));
        this.searchByLetter = document.getElementById('searchByLetter');
        this.searchByLetter.addEventListener('input', this.srchByLetter.bind(this));

        this.page = from;
        this.url = url;

        this.CloseSideBar();

        this.getMealsFrom(this.page);
    }

    CloseSideBar() {
        let wBox = $('.box').innerWidth();
        $('#sideBar').css(`cssText`, `left:-${wBox}px`);
    }

    openCloseSideBar() {
        let wBox = $('.box').innerWidth();

        if ($('#sideBar').css('left') == '0px') {
            $('#sideBar').animate({ left: `-${wBox}` }, 800)
            $('.links ul').removeClass('animate__fadeInBottomLeft');
            $('.links ul').addClass('animate__fadeOutTopLeft');

            $('#sidebarIcon').removeClass('fa-x')
        }
        else {

            $('#sidebarIcon').addClass('fa-x')
            $('#sideBar').animate({ left: `0px` }, 800, () => {
                $('.links ul').removeClass('animate__fadeOutTopLeft');
                $('.links ul').addClass('animate__fadeInBottomLeft');
            });
        }
    }

    sections(e) {
        this.searchByName.value = '';
        this.searchByLetter.value = '';

        if (e.getAttribute('category') === 'search') {
            this.displaySearch();
        }
        else if (e.getAttribute('category') === 'category') {
            this.displayCategory();
        }
        else if (e.getAttribute('category') === 'area') {
            this.displayArea();
        }
        else if (e.getAttribute('category') === 'ingredients') {
            this.displayIngredients();
        }
        else if (e.getAttribute('category') === 'contact') {
            this.displayContact();
        }
    }

    displaySearch() {
        $('section').addClass('d-none');
        $('#home').removeClass('d-none');
        $('#search').removeClass('d-none');
        this.meals.innerHTML = '';
        this.openCloseSideBar();
    }

    displayCategory() {
        $('section').addClass('d-none');
        $('#category').removeClass('d-none');
        let category = new categoryModule.Category();
        this.openCloseSideBar();
    }

    displayArea() {
        $('section').addClass('d-none');
        $('#area').removeClass('d-none');
        let area = new areaModule.Area();
        this.openCloseSideBar();
    }

    displayIngredients() {
        $('section').addClass('d-none');
        $('#ingredients').removeClass('d-none');
        let ingredient = new ingredientsModule.Ingredient();
        this.openCloseSideBar();
    }

    displayContact() {
        $('section').addClass('d-none');
        $('#contact').removeClass('d-none');
        let contact = new contactUsModule.ContactUs();

        this.openCloseSideBar();
    }

    getMealsFrom(from) {
        if (from === undefined) {
            this.getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        }
        else if (from === 'search' || from === 'category' || from === 'area' || from === 'ingredients') {
            this.getMeals(this.url)
        }
    }

    async getMeals(url) {
        this.loading.classList.remove('d-none');

        const api = await fetch(url);

        const data = await api.json();

        this.displayMeals(data.meals);
        this.loading.classList.add('d-none');
    }

    displayMeals(data) {
        let cartona = '';

        if (data == null) {
            cartona = '';
        }
        else {
            for (let i = 0; i < data.length; i++) {
                cartona += `
            <div id-meal="${data[i].idMeal}" class="col-md-3 mb-4 ">
                   <div class="meals overflow-hidden position-relative">
                      <img class="img-fluid rounded-2" src="${data[i].strMealThumb}" alt="">
                      <div class="meal-layer d-flex align-items-center rounded-2">
                         <h2 class="fw-bold ps-2">${data[i].strMeal}</h2>
                      </div>
                   </div>
            </div>
           
            `;
            }
        }

        this.meals.innerHTML = cartona;

        this.mealsClicked = document.querySelectorAll('[id-meal]');

        const that = this;
        this.mealsClicked.forEach(function (e) {
            e.addEventListener('click', that.mealDetails.bind(that, e));
        });
    }

    mealDetails(e) {
        $('section').addClass('d-none');
        $('#mealDetails').removeClass('d-none');
        let details = new mealDetailsModule.MealDetails(e.getAttribute('id-meal'));
    }

    srchByName() {
        let search = new searchModule.Search('name', this.searchByName.value);
    }

    srchByLetter() {
        let search = new searchModule.Search('letter', this.searchByLetter.value);
    }
}

let home = new Home();


