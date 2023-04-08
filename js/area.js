import * as indexModule from './index.js'

export class Area {
    constructor() {

        // loading
        this.loading = document.querySelector('.loading');

        this.areaMeal = document.getElementById('areaMeal');

        this.getArea();

    }

    async getArea() {
        this.loading.classList.remove('d-none');

        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);

        const data = await api.json();

        this.displayArea(data.meals);
        this.loading.classList.add('d-none');
    }

    displayArea(data) {
        let cartona = '';

        if (data == null) {
            cartona = '';
        }
        else {
            for (let i = 0; i < data.length; i++) {
                cartona += `
                <div str-area="${data[i].strArea}" class="col-md-3">
                    <div class="rounded-2 text-center cursor-pointer">
                         <i class="fa-solid fa-house-laptop fa-4x"></i>
                         <h3>${data[i].strArea}</h3>
                    </div>
                </div>
            `;
            }
        }

        this.areaMeal.innerHTML = cartona;

        this.area = document.querySelectorAll('[str-area]');

        const that = this;
        this.area.forEach(function (e) {
            e.addEventListener('click', that.areas.bind(that, e));
        });
    }

    areas(e) {
        $('section').addClass('d-none');
        $('#search').addClass('d-none');
        $('#home').removeClass('d-none');

        let area = new indexModule.Home('area', `https://www.themealdb.com/api/json/v1/1/filter.php?a=${e.getAttribute('str-area')}`);
    }
}
