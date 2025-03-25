const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng'; 
const API_KEY = 'live_KZkpB4UMq5Y5nG9hsayJx6RZ2HpvFG2yZnkFiLQBRuqjrQ65zE6LGF6D7DFbV5a5'; 
const container = document.querySelector('.slideshow-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let slideIndex = 0; 
let slides = [];

async function getCatImages() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'api-key': API_KEY, 
      },
    });

    if (!response.ok) {
      throw new Error('Something went wrong with fetching images.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
} 

getCatImages()
  .then((data) => {
    slides = data;
    showSlides(slideIndex); 
  })
  .catch((error) => {
    console.error('Error loading cat images:', error);
  });

async function showSlides(n) {
  if (n >= slides.length) {
    slideIndex = 0; 
  }
  if (n < 0) {
    slideIndex = slides.length - 1; 
  }

  container.innerHTML = '';
  const slide = slides[slideIndex];
  const imgElement = document.createElement('img');
  imgElement.classList.add('slides');
  imgElement.src = slide.url;
  imgElement.alt = 'Bengal Cat Image';

  container.appendChild(imgElement);

  const infoElement = document.createElement('p');
  infoElement.innerText = 'Breed: Bengal';
  container.appendChild(infoElement);

  imgElement.style.display = 'block';
}

function plusSlides(n) {
  showSlides(slideIndex += n); 
}

function nextSlide() {
  plusSlides(1); 
}

function prevSlide() {
  plusSlides(-1); 
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);