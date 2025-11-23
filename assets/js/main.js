// ArtWear Main JS
(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const yearSpan = document.getElementById('year');
  const loader = document.getElementById('loader');
  const tshirt3dImage = document.getElementById('tshirt3dImage');

  // Loader hide
  // Parallax/Tilt effect for style cards (desktop only)
  const tiltCards = document.querySelectorAll('.style-card');
  if(tiltCards.length){
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left; const y = e.clientY - r.top;
        const rx = (y / r.height - 0.5) * 8; // rotateX
        const ry = (x / r.width - 0.5) * 8;  // rotateY
        card.style.transform = `translateY(-10px) scale(1.02) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
 
  window.addEventListener('load', () => {
    setTimeout(()=> {
      if(loader) loader.classList.add('hidden');
      document.body.classList.add('ready');
    }, 600);
  });

  // Dynamic year
  if(yearSpan){ yearSpan.textContent = new Date().getFullYear(); }

  // Mobile nav toggle
  if(navToggle){
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Smooth scroll for internal anchors
  document.addEventListener('click', e => {
    const target = e.target.closest('a[href^="#"]');
    if(!target) return;
    const id = target.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({ behavior:'smooth' });
      if(navLinks.classList.contains('open')) navLinks.classList.remove('open');
    }
  });

  // Reveal on Scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r=> io.observe(r));
  } else {
    // Fallback
    reveals.forEach(r=> r.classList.add('in'));
  }

  // Interactive 3D tilt for T-Shirt image
  if(tshirt3dImage){
    let isDown = false;
    let startX = 0, startY = 0;
    let rotX = 0, rotY = 0;

    const applyTransform = ()=> {
      tshirt3dImage.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    };

    const down = (x, y)=> {
      isDown = true; 
      startX = x; 
      startY = y; 
      tshirt3dImage.classList.add('dragging');
    };

    const move = (x, y)=> {
      if(!isDown) return;
      const deltaX = x - startX;
      const deltaY = y - startY;
      startX = x;
      startY = y;
      rotY += deltaX * 0.5;
      rotX -= deltaY * 0.3;
      rotX = Math.max(-30, Math.min(30, rotX));
      applyTransform();
    };

    const up = ()=> {
      if(!isDown) return;
      isDown = false;
      tshirt3dImage.classList.remove('dragging');
    };

    tshirt3dImage.addEventListener('mousedown', e=> down(e.clientX, e.clientY));
    window.addEventListener('mousemove', e=> move(e.clientX, e.clientY));
    window.addEventListener('mouseup', up);
    tshirt3dImage.addEventListener('touchstart', e=> down(e.touches[0].clientX, e.touches[0].clientY), { passive:true });
    window.addEventListener('touchmove', e=> move(e.touches[0].clientX, e.touches[0].clientY), { passive:true });
    window.addEventListener('touchend', up);
  }

  // Active nav highlight (basic by path)
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === path || (path === '' && href.startsWith('index'))){ a.classList.add('active'); }
  });

  // Subscription form validation
  const subscribeForm = document.getElementById('subscribeForm');
  if(subscribeForm){
    subscribeForm.addEventListener('submit', async e => {
      e.preventDefault();
      const emailInput = document.getElementById('subscribeEmail');
      const mobileInput = document.getElementById('subscribeMobile');
      const msg = subscribeForm.querySelector('.form-msg');
      const emailVal = emailInput.value.trim();
      const mobileVal = mobileInput.value.trim();
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailVal)){
        msg.textContent = 'Please enter a valid email.';
        msg.style.color = '#ff6b6b';
        emailInput.focus();
        return;
      }
      if(!/^\+?[0-9]{10,15}$/.test(mobileVal)){
        msg.textContent = 'Please enter a valid mobile number.';
        msg.style.color = '#ff6b6b';
        mobileInput.focus();
        return;
      }
      // Send to Node.js backend
      try {
        await fetch('http://localhost:3001/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailVal, mobile: mobileVal })
        });
      } catch (err) {
        // Ignore error for user experience
      }
      alert('You are added in our Discord!');
      msg.textContent = '';
      emailInput.value='';
      mobileInput.value='';
    });
  }

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const fullName = contactForm.fullName.value.trim();
      const email = contactForm.email.value.trim();
      const mobile = contactForm.mobile.value.trim();
      const message = contactForm.message.value.trim();
      const msgEl = contactForm.querySelector('.form-msg');
      if(fullName.length < 2){
        msgEl.textContent = 'Name must be at least 2 characters.';
        msgEl.style.color = '#ff6b6b';
        contactForm.fullName.focus();
        return;
      }
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
        msgEl.textContent = 'Invalid email address.';
        msgEl.style.color = '#ff6b6b';
        contactForm.email.focus();
        return;
      }
      if(!/^\+?[0-9]{10,15}$/.test(mobile)){
        msgEl.textContent = 'Please enter a valid mobile number.';
        msgEl.style.color = '#ff6b6b';
        contactForm.mobile.focus();
        return;
      }
      if(message.length < 10){
        msgEl.textContent = 'Message should be at least 10 characters.';
        msgEl.style.color = '#ff6b6b';
        contactForm.message.focus();
        return;
      }
      // Send to Node.js backend
      try {
        await fetch('http://localhost:3001/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, mobile, message })
        });
        msgEl.textContent = 'Message sent! We will respond soon.';
        msgEl.style.color = '#4ade80';
        contactForm.reset();
      } catch (err) {
        msgEl.textContent = 'Failed to send message.';
        msgEl.style.color = '#ff6b6b';
      }
    });
  }

  // FAQ Accordion Interaction
  const accordion = document.getElementById('faqAccordion');
  if(accordion){
    accordion.addEventListener('click', e => {
      const header = e.target.closest('.acc-header');
      if(!header) return;
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');
      // Close others
      accordion.querySelectorAll('.acc-item.open').forEach(i=>{ if(i!==item) i.classList.remove('open'); });
      item.classList.toggle('open', !isOpen);
    });
  }
})();