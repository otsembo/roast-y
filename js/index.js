// URLS
//1. Random meal
const RANDOM_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php'
// 2. Categories
const CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/categories.php'
// 3. Countries
const COUNTRIES = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
// 4. Search
const SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

document.addEventListener('DOMContentLoaded', () => {


    // ROWS DATA
    const randomMealRow = document.getElementById('random-meal')
    const mealCategoryRow = document.getElementById('meal-categories')
    const countriesRow = document.getElementById('meal-countries')
    const searchRow = document.getElementById('search-result')

    // LINKS DATA
    const categoriesLink = document.getElementById('category-link')
    const countriesLink = document.getElementById('countries-link')
    const homeLink = document.getElementById('home-link')

    // search form
    const searchForm = document.getElementById('search-form')
    const searchInput = document.getElementById('search')

    // CLICK EVENTS FOR LINKS
    categoriesLink.addEventListener('click', () => {
        // hide random meal
        randomMealRow.style.display = "none"
        // hide countries
        countriesRow.style.display = "none"
        // hide search page
        searchRow.style.display = "none"
        // show categories
        mealCategoryRow.removeAttribute('hidden')
        mealCategoryRow.style.display = "flex"

    })

    countriesLink.addEventListener('click', () => {
        // hide random meal
        randomMealRow.style.display = "none"
        // hide categories
        mealCategoryRow.style.display = "none"
        // hide search page
        searchRow.style.display = "none"
        // show countries
        countriesRow.removeAttribute('hidden')
        countriesRow.style.display = "flex"
    })

    homeLink.addEventListener('click', () => {
        // hide categories, search and countries
        randomMealRow.style.display = "flex"
        mealCategoryRow.style.display = "none"
        countriesRow.style.display = "none"
        searchRow.style.display = "none"

    })

    // search form submit listener
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const query = searchInput.value
        searchMeal(query)
        randomMealRow.style.display = "none"
        mealCategoryRow.style.display = "none"
        countriesRow.style.display = "none"
        searchRow.style.display = "flex"
        searchRow.removeAttribute('hidden')
    })

    // create random meal element
    const createRandomMeal = (image, name, description) => {

        const cardDiv = document.createElement('div')
        cardDiv.classList.add('card', 'col-12', 'px-0', 'mb-3')

        const rowDiv = document.createElement('div')
        rowDiv.classList.add('row')

        const imgDiv = document.createElement('div')
        imgDiv.classList.add('col-6')

        const bodyDiv = document.createElement('div')
        bodyDiv.classList.add('col-6', 'card-body')

        const mealImg = document.createElement('img')
        mealImg.classList.add('card-img', 'h-100')
        mealImg.src = image
        mealImg.objectFit = 'cover'

        const mealTitle = document.createElement('h5')
        mealTitle.classList.add('card-title')
        mealTitle.innerText = name

        const mealDescription = document.createElement('p')
        mealDescription.classList.add('card-text')
        mealDescription.innerText = description

        // append body elements
        bodyDiv.appendChild(mealTitle)
        bodyDiv.appendChild(mealDescription)

        // append image elements
        imgDiv.appendChild(mealImg)

        // append divs to row
        rowDiv.appendChild(imgDiv)
        rowDiv.appendChild(bodyDiv)

        // append row to card
        cardDiv.appendChild(rowDiv)

        // return the cardDiv
        return cardDiv
    }

    // create category element
    const createCategory = (image, name) => {

        const rootDiv = document.createElement('div')
        rootDiv.classList.add('col-4', 'p-1')

        const cardDiv = document.createElement('div')
        cardDiv.classList.add('card', 'col-12', 'p-2')

        const categoryImg = document.createElement('img')
        categoryImg.classList.add('card-img-top')
        categoryImg.src = image

        const categoryTitle = document.createElement('h4')
        categoryTitle.classList.add('card-title')
        categoryTitle.innerText = name

        // append title and image to card
        cardDiv.appendChild(categoryImg)
        cardDiv.appendChild(categoryTitle)

        rootDiv.appendChild(cardDiv)

        return rootDiv

    }

    // create countries element
    const createCountries = (country) => {
        const rootDiv = document.createElement('div')
        rootDiv.classList.add('col-3', 'p-1')

        const spanData = document.createElement('span')
        spanData.classList.add('col-12', 'badge', 'text-bg-success', 'p-2')
        spanData.innerText = country

        rootDiv.appendChild(spanData)
        return rootDiv
    }

    // create search results
    const createSearchResults = (name, image, link) => {
        const rootDiv = document.createElement('div')
        rootDiv.classList.add('col-3', 'p-1')

        const cardDiv = document.createElement('div')
        cardDiv.classList.add('card', 'px-0', 'h-100')

        const mealImg = document.createElement('img')
        mealImg.classList.add('card-img-top')
        mealImg.src = image

        const mealTitle = document.createElement('h6')
        mealTitle.classList.add('p-2')
        mealTitle.innerText = name

        const mealLink = document.createElement('a')
        mealLink.classList.add('mt-1', 'mb-2', 'me-3', 'ms-3', 'btn', 'btn-warning')
        mealLink.innerText = 'VISIT ...'
        mealLink.href = link
        mealLink.target = '_blank'

        cardDiv.appendChild(mealImg)
        cardDiv.appendChild(mealTitle)
        cardDiv.appendChild(mealLink)

        rootDiv.appendChild(cardDiv)
        return rootDiv
    }

   

    // load random meal
    const loadRandomMeal = () => {
        fetch(RANDOM_MEAL)
            .then((response) => response.json())
            .then((data) => {
                const mealData = data.meals[0]
                const name = mealData.strMeal
                const description = mealData.strInstructions
                const image = mealData.strMealThumb
                const mealElement = createRandomMeal(image, name, description)
                randomMealRow.appendChild(mealElement)
            })
    }

    // load meal categories
    const loadCategories = () => {
        fetch(CATEGORIES)
            .then((response) => response.json())
            .then((data) => {
                const categoriesData = data.categories
                const categoryElems = categoriesData.map(
                    cat => createCategory(cat.strCategoryThumb, cat.strCategory)
                )
                mealCategoryRow.append(...categoryElems)
            })
    }

    // load countries
    const loadCountries = () => {
        fetch(COUNTRIES)
            .then((response) => response.json())
            .then((countries) => {
                const mealCountries = countries.meals

                const mealElems = mealCountries.map(
                    area =>  createCountries(area.strArea)
                )
                countriesRow.append(...mealElems)
            })
    }

    // search data
    const searchMeal = (meal) => {
        fetch(`${SEARCH}${meal}`)
            .then((response) => response.json())
            .then((data) => {
                const mealDataList = data.meals
                const searchResults = mealDataList.map(
                    mealData => {
                        const name = mealData.strMeal
                        const image = mealData.strMealThumb
                        const link = mealData.strYoutube
                        console.log(name)
                        return createSearchResults(name, image, link)
                    }
                )
                // replace all children
                searchRow.replaceChildren(...searchResults)
            })
    }

    // load data to UI
    loadRandomMeal()
    loadCategories()
    loadCountries()

})