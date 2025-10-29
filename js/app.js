async function fetchMeals(){
  try {
    const response= await fetch("https://www.themealbd.com/api/json/v1/1/search.php?s=");
    const data = await response.json();
    const meals = data.meals;
    console.log("Alla måltider:", meals);

    const firstFiveMeals=meals
      .sort((a, b)=> a.strMeal.localeCompare(b.strMeal))
      .slice(0, 5)
      .map(meal=> meal.strMeal);

    console.log("Första 5 måltider (alfabetiskt):", firstFiveMeals);

    const chosenCategory = "Seafood";

    const mealsInCategory = meals.filter(
      meal => meal.strCategory.toLowerCase() === chosenCategory.toLowerCase()
    );

    console.log(`Måltider i kategorin ${chosenCategory}:`,
      mealsInCategory.map(meal => `${meal.strMeal} (${meal.strCategory})`)
    );

    const categoryCount = meals.reduce ((acc, meal)=> {
      const category=meal.strCategory;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {};

    console.log("Antal måltider per kategori:", categoryCount);
  } catch (error) {
    console.error("Fel vid hämtning av data:", error);
  }
}
