async function fetchMeals() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    const data = await response.json();
    const meals = data.meals;

    const sortedMeals = meals.sort(function(a, b) {
      return a.strMeal.localeCompare(b.strMeal);
    });
    const mealNames = sortedMeals.map(function(meal) {
      return meal.strMeal;
    });
    const firstFiveNames = mealNames.slice(0, 5);
    console.log(firstFiveNames);

    const chosenCategory = "Seafood";
    const filteredMeals = meals.filter(function(meal) {
      return meal.strCategory.toLowerCase() === chosenCategory.toLowerCase();
    });
    filteredMeals.forEach(function(meal) {
      console.log(meal.strMeal + " (" + meal.strCategory + ")");
    });

    const categoryCount = meals.reduce(function(acc, meal) {
      const category = meal.strCategory;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category]++;
      return acc;
    }, {});
    console.log(categoryCount);

  } catch (error) {
    console.error(error);
  }
}

fetchMeals();
