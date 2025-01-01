let autoplayInterval;
const templeContainer = document.querySelector('#temple');

// Adjust container to scroll horizontally
templeContainer.style.display = 'flex';
templeContainer.style.overflowX = 'hidden';

templeContainer.style.scrollBehavior = 'smooth';
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        const firstItem = templeContainer.firstElementChild;
        templeContainer.appendChild(firstItem);
        templeContainer.scrollBy({ left: firstItem.offsetWidth, behavior: 'smooth' });

        currentIndex = (currentIndex + 1) % paginationDots.length;
        updatePagination();
    }, 3000);

    autoplayStartDot.style.backgroundColor = '#999';
    autoplayStopDot.style.backgroundColor = '#ccc';
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
    autoplayStartDot.style.backgroundColor = '#ccc';
    autoplayStopDot.style.backgroundColor = '#999';
}

// Add pagination functionality
const paginationContainer = document.querySelector('.pagination');
const paginationDots = paginationContainer.querySelectorAll('span');
let currentIndex = 0;

function updatePagination() {
    paginationDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Add click event for pagination dots
paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updatePagination();
        const scrollToItem = templeContainer.children[index];
        templeContainer.scrollTo({ left: scrollToItem.offsetLeft, behavior: 'smooth' });
    });
});

// Initialize pagination
updatePagination();

// Add custom buttons for autoplay control
const autoplayControls = document.createElement('div');
autoplayControls.classList.add('autoplay-controls');

const autoplayStartDot = document.createElement('span');
autoplayStartDot.classList.add('autoplay-dot', 'start');
autoplayStartDot.addEventListener('click', startAutoplay);

autoplayControls.appendChild(autoplayStartDot);

const autoplayStopDot = document.createElement('span');
autoplayStopDot.classList.add('autoplay-dot', 'stop');
autoplayStopDot.addEventListener('click', stopAutoplay);

autoplayControls.appendChild(autoplayStopDot);

document.body.appendChild(autoplayControls);

// Add styles for autoplay dots
const style = document.createElement('style');
style.textContent = `
  .autoplay-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  .autoplay-dot {
    width: 15px;
    height: 15px;
    background-color: #ccc;
    border-radius: 50%;
    cursor: pointer;
  }

  .autoplay-dot.start {
    background-color: #ccc;
  }

  .autoplay-dot.stop {
    background-color: #ccc;
  }

  .autoplay-dot:hover {
    background-color: #888;
  }
`;
document.head.appendChild(style);

// Start autoplay by default
startAutoplay();
