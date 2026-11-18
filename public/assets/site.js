/* naelog 공통 스크립트. <head>에서 불러야 화면이 뜨기 전에 테마가 정해진다.
   테마: 저장한 값이 있으면 그걸, 없으면 OS 설정을 따른다. 헤더에 토글 버튼을 단다.
   언어: <link rel="alternate" hreflang="..."> 가 있으면 헤더에 그 언어로 가는 링크를 단다. */
(function () {
  const KEY = 'naelog-theme';
  const root = document.documentElement;
  const media = matchMedia('(prefers-color-scheme: dark)');
  const saved = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const apply = () => { root.dataset.theme = saved() || (media.matches ? 'dark' : 'light'); };
  apply();
  media.addEventListener('change', apply);

  const en = root.lang === 'en';
  const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.site-header .nav');
    if (!nav) return;
    const tools = document.createElement('span');
    tools.className = 'nav-tools';

    const alt = document.querySelector('link[rel="alternate"][hreflang]');
    if (alt) {
      const a = document.createElement('a');
      a.href = alt.getAttribute('href');
      a.hreflang = alt.hreflang;
      a.textContent = alt.hreflang === 'en' ? 'EN' : '한국어';
      tools.append(a);
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    const label = () => {
      const dark = root.dataset.theme === 'dark';
      btn.innerHTML = dark ? SUN : MOON;
      btn.setAttribute('aria-label', dark ? (en ? 'Light mode' : '라이트 모드') : (en ? 'Dark mode' : '다크 모드'));
    };
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      root.dataset.theme = next;
      label();
    });
    media.addEventListener('change', label);
    label();
    tools.append(btn);
    nav.append(tools);
  });
})();
