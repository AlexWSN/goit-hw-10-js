import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import './style.css';

// Selectăm elementele HTML
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Afișează loaderul și ascunde informațiile de pisică și eroarea
function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

function toggleError(show) {
  error.style.display = show ? 'block' : 'none';
}

// Funcție pentru a actualiza selectorul cu rase
async function updateBreedSelect() {
  toggleLoader(true);
  toggleError(false);

  try {
    const breeds = await fetchBreeds();
    breedSelect.innerHTML =
      breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('') || 
      '<option disabled>No breeds available</option>';
  } catch {
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
}

// Funcție pentru a afișa informațiile despre pisică
async function displayCatInfo(breedId) {
  toggleLoader(true);
  toggleError(false);

  try {
    const catData = await fetchCatByBreed(breedId);
    const cat = catData[0];

    // Verificăm dacă datele sunt valide
    if (!cat || !cat.breeds || cat.breeds.length === 0) {
      throw new Error('Invalid cat data');
    }

    // Actualizează UI-ul cu informațiile pisicii
    catInfo.innerHTML = `
      <h2>${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
      <img src="${cat.url}" alt="Cat image" width="300" />
    `;
  } catch {
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
}

// Event listener pentru schimbarea selecției
breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  if (breedId) {
    displayCatInfo(breedId); // Afișează informațiile pisicii selectate
  }
});

// Inițializează aplicația
updateBreedSelect();
