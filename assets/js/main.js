
(function() {
  const colors = {
    blue: '#4f8ef7',
    green: '#4caf50',
    amber: '#ffb300',
    purple: '#9b51e0'
  };
  const savedColor = localStorage.getItem('accent-color');
  if (savedColor && colors[savedColor]) {
    document.documentElement.style.setProperty('--accent', colors[savedColor]);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Bangalore Time Clock
  function updateBangaloreTime() {
    const clockElement = document.getElementById('bangalore-clock');
    if (!clockElement) return;
    
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    
    try {
      const formatter = new Intl.DateTimeFormat('en-US', options);
      clockElement.textContent = formatter.format(new Date());
    } catch (e) {
      const now = new Date();
      clockElement.textContent = now.toLocaleTimeString();
    }
  }

  updateBangaloreTime();
  setInterval(updateBangaloreTime, 1000);

  // 2. Interactive Line / Col Tracker
  function setupLineColTracking() {
    const lineColElement = document.getElementById('line-col');
    if (!lineColElement) return;

    window.addEventListener('mousemove', (e) => {
      const ln = Math.min(100, Math.floor((e.clientY / window.innerHeight) * 75) + 1);
      const col = Math.min(120, Math.floor((e.clientX / window.innerWidth) * 110) + 1);
      lineColElement.textContent = `Ln ${ln}, Col ${col}`;
    });
  }
  setupLineColTracking();

  // 3. Project Filter Setup
  function setupProjectFilter() {
    const searchInput = document.getElementById('project-search');
    if (!searchInput) return;

    const projectCards = document.querySelectorAll('.project-card');

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      projectCards.forEach(card => {
        const name = card.querySelector('.project-name').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const tag = card.querySelector('.project-tag').textContent.toLowerCase();
        
        const stackSpans = card.querySelectorAll('.project-stack span');
        let stack = '';
        stackSpans.forEach(span => {
          stack += span.textContent.toLowerCase() + ' ';
        });

        const matches = name.includes(query) || 
                        description.includes(query) || 
                        stack.includes(query) ||
                        tag.includes(query);

        if (matches) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
  setupProjectFilter();

  // 4. Scroll Fade-Up Animations
  function setupScrollAnimations() {
    const sections = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }
  setupScrollAnimations();

  // 5. Contact Form Submission with Email Validation
  function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const emailInput = document.getElementById('email');
      const email = emailInput ? emailInput.value.trim() : '';
      const nameInput = document.getElementById('name');
      const name = nameInput ? nameInput.value.trim() : '';
      const messageInput = document.getElementById('message');
      const message = messageInput ? messageInput.value.trim() : '';
      
      // Email Regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Error: Please enter a valid email address (e.g. name@domain.com).');
        if (emailInput) emailInput.focus();
        return;
      }

      let submitted = false;

      // 1. Try sending to local Node.js Express backend (only if served via http/https)
      if (window.location.protocol.startsWith('http')) {
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
          });
          
          if (response.ok) {
            submitted = true;

          }
        } catch (err) {
          console.warn('Local backend API is offline. Falling back to public web service...');
        }
      }

      // 2. Fallback: Send directly to Web3Forms so you are actually informed on static hosts
      if (!submitted) {
        try {
          const formData = new FormData();

          formData.append("access_key", "31a6f3ee-0fc8-4f08-b149-40d28ebee833");
          formData.append('name', name);
          formData.append('email', email);
          formData.append('message', message);
          formData.append('subject', `New message from ${name} (Portfolio)`);


          fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          }).catch(err => console.error('Fallback email delivery failed:', err));
        } catch (err) {
          console.error('Fallback email setup failed:', err);
        }
      }

      alert('Subodh is informed and will connect with you shortly.');
      form.reset();
    });
  }
  setupContactForm();

  // 6. Accent Color Customization Settings
  function setupThemeSettings() {
    const accentToggle = document.getElementById('accent-toggle');
    const colors = {
      blue: '#4f8ef7',
      green: '#4caf50',
      amber: '#ffb300',
      purple: '#9b51e0'
    };
    const colorNames = Object.keys(colors);

    // Initialize Accent Toggle UI
    const savedColor = localStorage.getItem('accent-color') || 'blue';
    if (accentToggle) {
      accentToggle.textContent = `"${savedColor}"`;
      accentToggle.style.color = colors[savedColor];
    }

    if (accentToggle) {
      accentToggle.addEventListener('click', () => {
        let currentVal = accentToggle.textContent.replace(/"/g, '').trim();
        let currentIndex = colorNames.indexOf(currentVal);
        if (currentIndex === -1) currentIndex = 0;
        
        const nextIndex = (currentIndex + 1) % colorNames.length;
        const nextColorName = colorNames[nextIndex];
        const nextColorHex = colors[nextColorName];
        
        accentToggle.textContent = `"${nextColorName}"`;
        accentToggle.style.color = nextColorHex;
        document.documentElement.style.setProperty('--accent', nextColorHex);
        localStorage.setItem('accent-color', nextColorName);
      });
    }
  }
  setupThemeSettings();

  // 7. Text Scramble Animation for Subtitle
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span style="color: var(--accent); opacity: 0.85;">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  const scrambleEl = document.getElementById('scramble-text');
  if (scrambleEl) {
    const phrases = [
      'Builds webapps & automations',
      'software tester',
      'competitive programmer',
      'chess player',
      'cricket player'
    ];
    const fx = new TextScramble(scrambleEl);
    let counter = 1; 
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 2500);
      });
      counter = (counter + 1) % phrases.length;
    };
    setTimeout(next, 2500);
  }
});


