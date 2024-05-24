function generateNoise() {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const width = 100;
	const height = 100;
	
	canvas.width = width;
	canvas.height = height;
	
	for (let x = 0; x < width; x++) {
	  for (let y = 0; y < height; y++) {
		const number = Math.floor(Math.random() * 256);
		ctx.fillStyle = `rgb(${number},${number},${number})`;
		ctx.fillRect(x, y, 1, 1);
	  }
	}
  
	return canvas.toDataURL('image/png');
  }
  
  function setNoiseBackground() {
	const noiseElement = document.getElementById('noise');
	noiseElement.style.backgroundImage = `url(${generateNoise()})`;
  }
  
  window.onload = setNoiseBackground;
  

  function filterVideos(type) {
    const videos = document.querySelectorAll('.gallery > div');

    videos.forEach(video => {
        if (type === 'all' || video.getAttribute('data-type') === type) {
            video.style.display = 'block';
        } else {
            video.style.display = 'none';
        }
    });
}
