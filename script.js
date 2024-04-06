let clickCount = 0;

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateClicks() {
  fetch('/click')
    .then(response => response.json())
    .then(data => {
      clickCount = data.clicks;
      document.getElementById('data').textContent = `Times clicked: ${formatNumberWithCommas(clickCount)}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
setInterval(() => {
  updateClicks();
}, 100);

document.getElementById('addcount').addEventListener('click', () => {
  fetch('/clicks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
});


const shakeElement = document.getElementById('yourShakeElementId');

let lastX = null;
let lastY = null;
let lastZ = null;

window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
  const currentX = event.beta;
  const currentY = event.gamma;
  const currentZ = event.alpha;

  if (lastX !== null && lastY !== null && lastZ !== null) {
    const deltaX = Math.abs(currentX - lastX);
    const deltaY = Math.abs(currentY - lastY);
    const deltaZ = Math.abs(currentZ - lastZ);

    if (deltaX > 15 || deltaY > 15 || deltaZ > 15) {
      handleShake();
    }
  }

  lastX = currentX;
  lastY = currentY;
  lastZ = currentZ;
}

function handleShake() {
  fetch('/clicks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

window.addEventListener('beforeunload', () => {
  window.removeEventListener('deviceorientation', handleOrientation);
});
