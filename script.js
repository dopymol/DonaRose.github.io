const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;
  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top < triggerBottom) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

const typingText = document.getElementById("typing-text");
const words = ["Python", "Machine Learning", "Generative AI", "RAG Systems", "Computer Vision", "Django AI Apps", "Power BI Dashboards"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => { isDeleting = true; }, 900);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 45 : 85);
}

typeEffect();

const counters = document.querySelectorAll('.counter');

const runCounter = (counter) => {
  const target = Number(counter.getAttribute('data-target'));
  let count = 0;
  const increment = Math.max(1, Math.ceil(target / 45));

  const updateCounter = () => {
    count += increment;
    if (count >= target) {
      counter.textContent = target + (target === 96 ? "%" : "+");
    } else {
      counter.textContent = count;
      requestAnimationFrame(updateCounter);
    }
  };

  updateCounter();
};

let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      counters.forEach(runCounter);
      countersStarted = true;
    }
  });
}, { threshold: 0.5 });

if (counters.length > 0) {
  counterObserver.observe(counters[0]);
}
