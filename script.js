// ==============================
// NAVBAR SCROLL EFFECT
// ==============================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link on scroll
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ==============================
// HAMBURGER MENU
// ==============================
const hamburger = document.getElementById('hamburger');
const navLinksList = document.querySelector('.nav-links');
hamburger && hamburger.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});
// Close on nav link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => navLinksList.classList.remove('open'));
});

// ==============================
// REVEAL ON SCROLL
// ==============================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ==============================
// HERO TYPING ANIMATION
// ==============================
const typingEl = document.getElementById('typing-name');
if (typingEl) {
  const phrases = [
    'Tanya Mahey',
    'a Data Analyst',
    'a Business Analyst',
    'a Data Enthusiast'
  ];
  let pIndex = 0;
  let cIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = phrases[pIndex];
    if (deleting) {
      cIndex--;
    } else {
      cIndex++;
    }
    typingEl.textContent = current.slice(0, cIndex);

    let delay = deleting ? 50 : 80;
    if (!deleting && cIndex === current.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && cIndex === 0) {
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
      delay = 300;
    }
    setTimeout(typeLoop, delay);
  }
  typeLoop();
}

// ==============================
// EYE TRACKING
// ==============================
document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.pupil').forEach(pupil => {
    const eye = pupil.parentElement;
    const rect = eye.getBoundingClientRect();
    const eyeX = rect.left + rect.width / 2;
    const eyeY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
    const x = Math.cos(angle) * 4;
    const y = Math.sin(angle) * 4;
    pupil.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// ==============================
// AVATAR ZOOM ON SCROLL
// ==============================
window.addEventListener('scroll', () => {
  const avatarWrapper = document.getElementById('avatar-wrapper');
  const heroSection = document.getElementById('home');
  if (!avatarWrapper || !heroSection) return;

  const heroH = heroSection.offsetHeight;
  const progress = Math.min(window.scrollY / heroH, 1);
  // Scale from 1 → 0 as user scrolls through hero
  const scale = 1 + progress * 0.3;
  const opacity = 1 - progress * 1.5;
  avatarWrapper.style.transform = `scale(${scale})`;
  avatarWrapper.style.opacity = Math.max(opacity, 0);
});

// ==============================
// SKILLS CHART
// ==============================
const skillData = {
  programming: {
    labels: ['Python', 'Java', 'SQL'],
    values: [90, 75, 85],
    color: '#38bdf8'
  },
  datatools: {
    labels: ['Excel', 'MySQL', 'Tableau', 'Scikit-learn'],
    values: [90, 80, 85, 75],
    color: '#818cf8'
  },
  concepts: {
    labels: ['Data Modelling', 'ETL', 'Data Warehousing', 'Visualisation'],
    values: [85, 80, 75, 90],
    color: '#34d399'
  },
  cloud: {
    labels: ['Azure ADF', 'Data Lake', 'PowerApps'],
    values: [70, 65, 60],
    color: '#f472b6'
  },
  collaboration: {
    labels: ['Jira', 'Confluence'],
    values: [80, 75],
    color: '#fb923c'
  },
  softskills: {
    labels: ['Analytical Thinking', 'Communication', 'Agile Mindset'],
    values: [90, 85, 80],
    color: '#a78bfa'
  }
};

let chart;

function showSkill(category, btn) {
  // Update active button
  document.querySelectorAll('.skill-cat').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const data = skillData[category];
  const ctx = document.getElementById('skillsChart');
  if (!ctx) return;

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Proficiency %',
        data: data.values,
        backgroundColor: data.color + '33',
        borderColor: data.color,
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111827',
          borderColor: data.color,
          borderWidth: 1,
          titleColor: '#e2e8f0',
          bodyColor: data.color,
          callbacks: {
            label: (ctx) => `  ${ctx.raw}%`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#64748b', font: { size: 11 }, callback: v => v + '%' },
          border: { color: 'rgba(255,255,255,0.06)' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#94a3b8', font: { size: 12, weight: '500' } },
          border: { color: 'rgba(255,255,255,0.06)' }
        }
      },
      animation: {
        duration: 600,
        easing: 'easeInOutQuart'
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('skillsChart')) {
    showSkill('programming', document.querySelector('.skill-cat'));
  }
});

// ==============================
// JOURNEY ACCORDION
// ==============================
function toggleJourney(item, id) {
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.tv-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}


