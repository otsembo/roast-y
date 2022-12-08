// URLS
//1. Random meal
const RANDOM_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php'
// 2. Categories
const CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/categories.php'

document.addEventListener('DOMContentLoaded', () => {

    // create random meal element
    const createRandomMeal = (image, name, description) => {

        const cardDiv = document.createElement('div')
        cardDiv.classList.add('card', 'col-12')

        const rowDiv = document.createElement('div')
        rowDiv.classList.add('row')

        const imgDiv = document.createElement('div')
        imgDiv.classList.add('col-6')

        const bodyDiv = document.createElement('div')
        bodyDiv.classList.add('col-6', 'card-body')

        const mealImg = document.createElement('img')
        mealImg.classList.add('card-img')
        mealImg.src = image

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

        const cardDiv = document.createElement('div')
        cardDiv.classList.add('card', 'col-4')

        const categoryImg = document.createElement('img')
        categoryImg.classList.add('card-img-top')
        categoryImg.src = image

        const categoryTitle = document.createElement('h4')
        categoryTitle.classList.add('card-title')
        categoryTitle.innerText = name

        // append title and image to card
        cardDiv.appendChild(categoryImg)
        cardDiv.appendChild(categoryTitle)

        return cardDiv

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
                document.getElementById('random-meal').appendChild(mealElement)
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
                document.getElementById('meal-categories').append(...categoryElems)
            })
    }

    loadRandomMeal()
    loadCategories()

})