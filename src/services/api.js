const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMealByName = async (name) => {
  const response = await fetch(`${API_BASE_URL}/search.php?s=${name}`);
  return response.json();
};

export const getMealById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
  return response.json();
};

export const getRandomMeal = async () => {
  const response = await fetch(`${API_BASE_URL}/random.php`);
  return response.json();
};

export const getAllCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories.php`);
  return response.json();
};

export const getMealsByCategory = async (category) => {
  const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
  return response.json();
};

export const getMealsByArea = async (area) => {
  const response = await fetch(`${API_BASE_URL}/filter.php?a=${area}`);
  return response.json();
};

export const getMealsByIngredient = async (ingredient) => {
  const response = await fetch(`${API_BASE_URL}/filter.php?i=${ingredient}`);
  return response.json();
};

export const getAllAreas = async () => {
  const response = await fetch(`${API_BASE_URL}/list.php?a=list`);
  return response.json();
};

export const getAllIngredients = async () => {
  const response = await fetch(`${API_BASE_URL}/list.php?i=list`);
  return response.json();
};
