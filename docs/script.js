document.addEventListener('DOMContentLoaded', function() {
  const loadComponent = async (containerId, componentPath, cssPath) => {
    const container = document.getElementById(containerId);
    if (container) {
      try {
        const response = await fetch(componentPath);
        container.innerHTML = await response.text();

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);
      } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
      }
    }
  };

  loadComponent('header-container', './components/header/header.html', './components/header/header.css').then(() => console.log('Header loaded'));
  loadComponent('intro-container', './components/intro/intro.html', './components/intro/intro.css').then(() => console.log('Intro loaded'));
  loadComponent('services-container', './components/services/services.html', './components/services/services.css').then(() => {
    initImageSlider("slider1", SliderImages_1);
    initImageSlider("slider2", SliderImages_2);
  });
  loadComponent('contacts-container', './components/contacts/contacts.html', './components/contacts/contacts.css').then(() => {
    console.log('Contacts loaded')
    initContactForm();
  });
  loadComponent('footer-container', './components/footer/footer.html', './components/footer/footer.css').then(() => console.log('Footer loaded'));
});


function initImageSlider(sliderId, images) {
  const slider = document.getElementById(sliderId);
  const imageElement = slider.querySelector(".rotating-image");

  if (!imageElement) {
    console.error("Element #rotating-image not found!");
    return;
  }

  const changeInterval = 10000;
  let currentIndex = 0;

  function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    imageElement.src = images[currentIndex];

    imageElement.style.opacity = 1;
    setTimeout(() => {
      imageElement.style.opacity = 0;
      imageElement.style.transition = "opacity 0.5s ease-in-out";
    }, 9500);
  }

  let intervalId = setInterval(changeImage, changeInterval);

  imageElement.addEventListener("mouseenter", () => clearInterval(intervalId));
  imageElement.addEventListener("mouseleave", () => {
    intervalId = setInterval(changeImage, changeInterval);
  });
}

const SliderImages_1 = [
  "./assets/images/service_image_1.png",
  "./assets/images/service_image_2.png",
];

const SliderImages_2 = [
  "./assets/images/service_image_2.png",
  "./assets/images/service_image_1.png",
];

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('input', function(e) {
    const field = e.target;
    if (field.id === 'name' || field.id === 'email' || field.id === 'policyCheckbox') {
      clearError(field.id);
    }
  });

  document.getElementById('policyCheckbox')?.addEventListener('change', function() {
    clearError('policyCheckbox');
  });

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const policyAccepted = document.getElementById('policyCheckbox').checked;

    if (!validateForm(name, email, policyAccepted)) {
      return;
    }

    const formData = {
      name,
      email,
      policyAccepted,
      timestamp: new Date().toISOString()
    };

    formSubmission(formData);
  });

  function validateForm(name, email, policyAccepted) {
    let isValid = true;

    if (!name) {
      showError('name', 'Please enter your name');
      isValid = false;
    } else {
      clearError('name');
    }

    if (!email) {
      showError('email', 'Please enter your email');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('email', 'Please enter a valid email');
      isValid = false;
    } else {
      clearError('email');
    }

    if (!policyAccepted) {
      showError('policyCheckbox', 'You must accept the privacy policy');
      isValid = false;
    } else {
      clearError('policyCheckbox');
    }

    return isValid;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);

    if (!field) return;

    let errorMsg;

    if (field.type !== 'checkbox') {
      errorMsg = field.nextElementSibling;

      field.style.borderColor = '#ff3333';
      field.style.borderWidth = '2px';
      field.style.borderStyle = 'solid';
      field.style.borderRadius = '4px';
      field.style.backgroundColor = '#fff0f0';
      field.style.color = '#ff3333';

      if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.textContent = message;
        return;
      }

      errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      errorMsg.textContent = message;
      errorMsg.style.color = '#ff3333';
      errorMsg.style.fontSize = '0.8rem';
      errorMsg.style.marginTop = '0.2rem';

      field.parentNode.insertBefore(errorMsg, field.nextSibling);
    }
    else {
      const label = document.querySelector(`label[for="${fieldId}"]`);
      if (label) {
        label.style.color = '#ff3333';

        errorMsg = label.nextElementSibling;

        if (errorMsg && errorMsg.classList.contains('error-message')) {
          errorMsg.textContent = message;
          return;
        }

        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = message;
        errorMsg.style.color = '#ff3333';
        errorMsg.style.fontSize = '0.8rem';
        errorMsg.style.marginTop = '0.2rem';
        label.parentNode.insertBefore(errorMsg, label.nextSibling);
      }
    }
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    if (field.type !== 'checkbox') {
      field.style.borderColor = '';
      field.style.borderWidth = '';
      field.style.borderStyle = '';
      field.style.borderRadius = '';
      field.style.backgroundColor = '';
      field.style.color = '';

      const errorMsg = field.nextElementSibling;
      if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.remove();
      }
    }
    else {
      const label = document.querySelector(`label[for="${fieldId}"]`);
      if (label) {
        label.style.color = '';
        const errorMsg = label.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
          errorMsg.remove();
        }
      }
    }
  }

  function formSubmission(formData) {
    const submitBtn = contactForm.querySelector('.submit-btn');

    submitBtn.disabled = true;

    console.log('Form data to be sent:', formData);
  }
}
