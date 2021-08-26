// Search Food Function
const searchItem = async () => {
    // For Show Spinner
    handleSpinner(true);
    const singleFoodContainer = document.getElementById("single-food");
    singleFoodContainer.innerHTML = "";

    const searchText = document.getElementById("search-text");

    if (searchText.value === "") {
        handleSpinner(false);
        handleError("Please write your favorite food name");
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText.value}`;

        try {
            const response = await fetch(url);

            // For Remove Spinner
            if (response.status === 200) {
                handleSpinner(false);
            };

            const data = await response.json();
            const { meals } = data;

            searchText.value = "";
            showFoods(meals);
        }

        catch (error) {
            handleError("Something went wrong please try again!");
        };
    };
};

// Error Handle Function
const handleError = (message) => {
    const errorContainer = document.getElementById("error-container");
    const div = document.createElement("div");
    div.classList.add("alert");
    div.classList.add("alert-danger");
    div.classList.add("mt-4");
    div.innerText = message;
    errorContainer.appendChild(div);

    // For Remove Alert
    setTimeout(() => {
        errorContainer.removeChild(div);
    }, 2000);
};

// Show Foods Function
const showFoods = (foods) => {
    const foodContainer = document.getElementById("food-container");
    foodContainer.innerHTML = "";

    foods.forEach(({ idMeal, strMeal, strMealThumb, strInstructions }) => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card h-100" onclick="openFood(${idMeal})">
                <img src="${strMealThumb}" class="card-img-top" alt="${strMeal}">
                <div class="card-body">
                    <h5 class="card-title text-center">${strMeal}</h5>
                    <p class="card-text">
                        ${strInstructions.slice(0, 200)}.
                    </p>
                </div>
            </div>`;
        foodContainer.appendChild(div);
    });
};

// Handle Spinner Function
const handleSpinner = (show) => {
    const spinner = document.getElementById("spinner");
    if (show) {
        spinner.classList.remove("d-none");
    } else {
        spinner.classList.add("d-none");
    };
};

// Open Food Function
const openFood = async (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    const response = await fetch(url);
    const data = await response.json();
    const { strMeal, strMealThumb, strInstructions } = data.meals[0]

    const singleFoodContainer = document.getElementById("single-food");
    singleFoodContainer.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `
            <div class="card h-100")>
                <img src="${strMealThumb}" class="card-img-top w-50 m-auto" alt="${strMeal}">
                <div class="card-body">
                    <h5 class="card-title text-center">${strMeal}</h5>
                    <p class="card-text">
                        ${strInstructions}
                    </p>
                </div>
            </div>`;
    singleFoodContainer.appendChild(div);
};

// Search Button Event Listener
document.getElementById("search-btn").addEventListener("click", searchItem);