import axios from 'axios';

// Setăm cheia API în header
axios.defaults.headers.common['x-api-key'] =
  'live_Gh72RCWOJulaAMZVxMGvGKIJSZ0vxofLdrKM7cOT3EPpN62UfhLTU30cVso9eb5r';

// Funcție pentru a obține lista raselor
export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data || []; // Returnează un array de rase
  } catch (error) {
    console.error('Error fetching breeds:', error.message);
    throw error; // Dacă apare o eroare, o aruncăm pentru a o prinde mai departe
  }
}

// Funcție pentru a obține informații despre o pisică după ID
export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    if (response.data.length === 0) {
      throw new Error('No cat found for this breed');
    }
    return response.data; // Returnează detaliile pisicii
  } catch (error) {
    console.error('Error fetching cat data:', error.message);
    throw error; // Dacă apare o eroare, o aruncăm pentru a o prinde mai departe
  }
}
