const preloader = document.querySelector('#preloader h3');
const body = document.querySelector('body');

body.classList.add('preloadBody');


window.addEventListener('load', function () {
  document.querySelector('#preloader').style.display = "none";
  body.classList.remove('preloadBody');
});




setTimeout(function () {
  preloader.innerText = 'Almost There...';
}, 7000);

setTimeout(function () {
  document.querySelector('#preloader').style.display = "none";
  body.classList.remove('preloadBody');
  sessionStorage.setItem('load', 'loaded');
}, 15000);


const item = sessionStorage.getItem('load');

if (item == 'loaded') {
  document.querySelector('#preloader').style.display = "none";
  body.classList.remove('preloadBody');
}



// Function to remove CSS link tag
function removeCssLink() {
  var cssLink = document.querySelector('link[href="https://cdn.statically.io/gh/mciastek/sal/789ac41161cffee81365c94142c1a955c5118cc4/dist/sal.css"]');
  if (cssLink) {
      cssLink.parentNode.removeChild(cssLink);
  }
}

// Function to remove JS script tag
function removeJsScript() {
  var jsScript = document.querySelector('script[src="https://cdn.statically.io/gh/mciastek/sal/789ac41161cffee81365c94142c1a955c5118cc4/dist/sal.js"]');
  if (jsScript) {
      jsScript.parentNode.removeChild(jsScript);
  }
}

// Function to check viewport width and remove CSS and JS link tags if under 700px
function checkViewportWidth() {
  if (window.innerWidth < 700) {
      removeCssLink();
      removeJsScript();
  }
}

// Event listener for window resize
window.addEventListener('resize', checkViewportWidth);

// Initial check on page load
checkViewportWidth();



// Mouse 

const circleElement = document.querySelector('.circle')

const circle = {x: 0, y: 0}
const previousMouse = {x: 0, y: 0}
const mouse = {x: 0, y: 0}

const speed = .5

let currentScale = 0

document.addEventListener("mousemove", (evt) => {
	mouse.x = evt.x
	mouse.y = evt.y
})

const tick = () => {//
	circle.x += (mouse.x - circle.x) * speed
	circle.y += (mouse.y - circle.y) * speed

	const translateTransform = `translate(${circle.x}px,${circle.y}px)`
	
	const deltaMouseX = mouse.x - previousMouse.x
	const deltaMouseY = mouse.y - previousMouse.y
	previousMouse.x = mouse.x
	previousMouse.y = mouse.y
	
	const mouseSpeed = Math.min(Math.sqrt(Math.pow(deltaMouseX, 2) + Math.pow(deltaMouseY, 2)) * 4, 150)
	const scaleValue = (mouseSpeed / 150) * 0.5
	
	currentScale += (scaleValue - currentScale) * speed
	
	const scaleTransform  = `scale(${1 + currentScale}, ${1 - currentScale})`
	
	const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI
	
	const rotationTransform = `rotate(${angle}deg)`
	
	circleElement.style.transform = `${translateTransform} ${rotationTransform} ${scaleTransform}`
	
	requestAnimationFrame(tick)
}

tick()


// Counting Effect


document.addEventListener('DOMContentLoaded', function () {
  const counters = document.querySelectorAll('.counter');

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  const observerOptions = {
    threshold: 0.5, // Adjust as needed
  };

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  counters.forEach((counter) => observer.observe(counter));

  function startCounter(counterElement) {
    const maxVal = parseInt(counterElement.getAttribute('data-max'));
    const duration = parseInt(counterElement.getAttribute('data-duration')) || 3000; // Default to 3000ms if no duration specified
    let countNum = 0;

    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      countNum = Math.floor((elapsedTime / duration) * maxVal);

      if (countNum <= maxVal) {
        counterElement.textContent = countNum + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counterElement.textContent = maxVal + '+';
      }
    }

    requestAnimationFrame(updateCounter);
  }
});


// SAL
sal({
  threshold: .1,
  once: true,
});



// About Area Clock 

function updateClock() {
  const now = new Date();
  const options = { timeZone: 'Asia/Dhaka', hour: 'numeric', minute: 'numeric' };
  const timeString = now.toLocaleTimeString('en-US', options);
  document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock(); // Call it once to display the initial time


// Wavy Text anim

document.addEventListener("DOMContentLoaded", function () {
  const wavyTextElements = document.querySelectorAll('.wavy-text');

  wavyTextElements.forEach((wavyText, index) => {
    const text = wavyText.innerText;
    const letters = text.split('');

    wavyText.innerHTML = '';

    letters.forEach((letter, letterIndex) => {
      const span = document.createElement('span');
      span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
      span.style.animationDelay = `${letterIndex * 0.1 + index * 0.2}s`;
      wavyText.appendChild(span);
    });
  });
});

// Btn video more

const videoGalleryHidden = document.querySelector('.video_gallery_view_hidden');
const videoViewBtn = document.getElementById('video_gallery_view_btn');

videoViewBtn.onclick = function(e){
  videoViewBtn.style.display = 'none';
  videoGalleryHidden.classList.add('displayExtraVideo');
  
}


// Check if the browser supports service workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Register the service worker
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  });
}





const THRESHOLD = 20;

class SwipeSlider {
  constructor(slider) {
    this.startX = 0;
    this.oldX = 0;
    this.startPosition = 0;
    this.snapPosition = 0;
    this.isDown = false;
    this.userHasSwiped = false;

    // Init
    this.cacheElements(slider);
    this.setDimensions();
    this.setIndicator();
    this.bindHandlers();
  }

  cacheElements(slider) {
    this.slider = slider;
    this.items = this.slider.querySelectorAll('.js-slider-item');
    this.indicator = slider.parentNode.querySelector('.js-slider-indicator');
    this.indicatorBar = slider.parentNode.querySelector('.js-slider-indicator-bar');
    this.arrows = slider.parentNode.querySelectorAll('.js-slider-arrow');
  }

  setDimensions() {
    const spacing = 20;
    const sliderWidth = this.slider.offsetWidth;
    const itemWidth = this.items[0].offsetWidth;
    const itemsWidth = this.items.length * itemWidth;

    this.itemWidth = itemWidth;
    this.maxAllowedW = sliderWidth < itemsWidth ? sliderWidth - itemsWidth - spacing : 0;
  }

  setIndicator() {
    if (!this.indicator) return;

    const times = (this.items.length * this.itemWidth) / this.slider.offsetWidth;
    
    const length = this.indicatorBar.offsetWidth / times;

    this.indicator.style.width = `${length}px`;
  }

  // Calculate

  calculateBoundaries(position, bounce = true) {
    const bounceMargin = bounce ? this.itemWidth / 4 : 0;

    if (position > bounceMargin) return bounceMargin;
    if (position < this.maxAllowedW - bounceMargin) return this.maxAllowedW - bounceMargin;

    return position;
  }

  calculateNextSnap(position, swipeNext) {
    let snapPosition = (parseInt((position / this.itemWidth), 10) - swipeNext) * this.itemWidth;

    if (snapPosition < this.maxAllowedW) snapPosition = this.maxAllowedW;
    return snapPosition;
  }

  moveIndicator(currPos) {
    if (!this.indicator) return;

    const indicatorPos = this.indicatorBar.offsetWidth - this.indicator.offsetWidth;
    const position = this.mapToRange(currPos, 0, this.maxAllowedW, 0, indicatorPos);

    this.indicator.style.left = `${position}px`;
  }

  moveSlider(position, snapPosition = null) {
    // When dragging we need 2 positions: current and snap on end
    this.snapPosition = snapPosition != null ? snapPosition : position;

    this.slider.setAttribute('style', `transform: translate3d(${position}px, 0, 0)`);
  }

  // Helpers

  mapToRange(num, inMin, inMax, outMin, outMax) {
    return ((num - inMin) * (outMax - outMin)) / ((inMax - inMin) + outMin);
  }

  toggleArrowDisable() {
    this.arrows.forEach((el) => el.classList.remove('disabled'));

    if (this.snapPosition === 0) this.arrows[0].classList.add('disabled');
    else if (this.snapPosition === this.maxAllowedW) this.arrows[1].classList.add('disabled');
  }

  // Handlers

  bindHandlers() {
    // TODO: maybe add mousedwon and touchstart listeners here. Then add inside them
    // only the relevant move / end listeners (touch or mouse), and remove them on end
    this.slider.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.slider.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.slider.addEventListener('touchend', (e) => this.handleEnd(e));

    this.slider.addEventListener('mousedown', (e) => this.handleMouseStart(e));
    this.slider.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.slider.addEventListener('mouseup', (e) => this.handleEnd(e));
    this.slider.addEventListener('mouseleave', (e) => this.handleEnd(e));

    this.slider.addEventListener('wheel', (e) => this.handleWheel(e));

    this.slider.addEventListener('click', (e) => this.handleClick(e));
    window.addEventListener('resize', () => this.handleResize());

    if (!this.arrows.length) return;

    this.arrows[0].addEventListener('click', (e) => this.handleArrowClick(e)); // left
    this.arrows[1].addEventListener('click', (e) => this.handleArrowClick(e)); // right
  }

  // Start

  handleTouchStart(e) {
    if (e.touches.length > 1) return;

    this.handleStart(e);
  }

  handleMouseStart(e) {
    e.preventDefault();

    this.handleStart(e);
  }

  handleStart(e) {
    this.isDown = true;
    this.userHasSwiped = false;
    this.startPosition = this.snapPosition;
    this.startX = (e.pageX || e.touches[0].pageX) - this.slider.offsetLeft;

    this.slider.classList.add('active');
  }

  // Move

  handleTouchMove(e) {
    if (e.touches.length > 1 || !this.isDown) return;

    this.handleMove(e);
  }

  handleMouseMove(e) {
    if (!this.isDown) return;

    e.preventDefault();
    this.handleMove(e);
  }

  handleMove(e) {
    const pageX = e.pageX || e.touches[0].pageX;
    const currX = pageX - this.slider.offsetLeft;
    const dist = currX - this.startX;

    if (Math.abs(dist) < THRESHOLD) return;

    const swipeNext = this.oldX - currX < 0 ? 0 : 1; // Swipe direction
    const accelerate = this.mapToRange(Math.abs(dist), THRESHOLD, window.innerWidth, 1, 3);
    const position = this.calculateBoundaries(this.startPosition + (dist * accelerate));

    e.preventDefault();

    this.userHasSwiped = true;
    this.oldX = currX;

    this.moveSlider(position, this.calculateNextSnap(position, swipeNext));
    this.moveIndicator(position);
  }

  // End

  handleEnd() {
    if (!this.isDown) return;

    this.isDown = false;
    this.slider.classList.remove('active');

    this.moveSlider(this.snapPosition);
    this.moveIndicator(this.snapPosition);

    if (this.arrows.length > 0) this.toggleArrowDisable();
  }

  // Other Handlers

  handleWheel(e) {
    if (Math.abs(e.deltaX) < THRESHOLD) return;

    const step = 40;
    const snapPosition = this.snapPosition + (step * Math.sign(e.deltaX));

    this.slider.classList.add('active'); // Will be removed on mouseleave
    this.moveSlider(this.calculateBoundaries(snapPosition, false));
    this.moveIndicator(snapPosition);
    this.toggleArrowDisable();
  }

  handleArrowClick(e) {
    const direction = e.target.classList.contains('left') ? 1 : -1;
    const position = this.calculateBoundaries(
      this.snapPosition + (direction * this.itemWidth), false
    );

    this.slider.classList.remove('active');
    this.moveSlider(position);
    this.moveIndicator(position);
    this.toggleArrowDisable();
  }

  handleResize() {
    this.setIndicator();
    this.setDimensions();

    if (this.maxAllowedW > this.snapPosition) {
      this.moveSlider(this.maxAllowedW);
      this.moveIndicator(this.maxAllowedW);
    }
  }

  handleClick(e) {
    if (!this.userHasSwiped) return;

    e.preventDefault(); // Disallow click while swiping
    this.userHasSwiped = false;
  }
}


const sliders = document.querySelectorAll('.slider');
sliders.forEach((slider) => { new SwipeSlider(slider) });
