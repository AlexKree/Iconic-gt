
(function(){
  const defaultLang = 'fr';
  const stored = localStorage.getItem('iconicgt_lang');
  const lang = stored || defaultLang;

  function setLang(l){
    document.documentElement.setAttribute('lang', l);
    document.querySelectorAll('.lang').forEach(el=>{
      el.classList.toggle('active', el.dataset.lang === l);
    });
    document.querySelectorAll('[data-langbtn]').forEach(btn=>{
      btn.textContent = (l === 'fr') ? 'EN' : 'FR';
      btn.setAttribute('aria-label', (l === 'fr') ? 'Switch to English' : 'Passer en français');
    });
    localStorage.setItem('iconicgt_lang', l);
  }

  window.__iconicSetLang = setLang;
  setLang(lang);

  document.addEventListener('click', (e)=>{
    const t = e.target.closest('[data-langbtn]');
    if(t){
      const current = document.documentElement.getAttribute('lang') || defaultLang;
      setLang(current === 'fr' ? 'en' : 'fr');
    }
  });

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbTxt = document.getElementById('lightboxTxt');

  function openLb(src, label){
    if(!lb) return;
    lbImg.src = src;
    lbTxt.textContent = label || '';
    lb.classList.add('active');
  }
  function closeLb(){
    if(!lb) return;
    lb.classList.remove('active');
    lbImg.src = '';
  }

  document.addEventListener('click', (e)=>{
    const th = e.target.closest('[data-lightbox]');
    if(th){
      const src = th.getAttribute('data-src');
      const label = th.getAttribute('data-label');
      openLb(src, label);
    }
    if(e.target.matches('[data-lbclose]') || e.target === lb){
      closeLb();
    }
  });

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeLb();
  });
})();
