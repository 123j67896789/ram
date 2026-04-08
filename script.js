const shortcuts = [
  { title: 'Awwwards', note: 'Design inspiration and motion-heavy sites.' },
  { title: 'CSS Tricks', note: 'Daily front-end tips and browser APIs.' },
  { title: 'Chromium Blog', note: 'Platform notes and release summaries.' },
  { title: 'UI Patterns', note: 'Component examples for modern products.' },
  { title: 'Font Library', note: 'High-contrast type pairings.' },
  { title: 'Color Lab', note: 'Monochrome ramp previews and gradients.' }
];

const quickGrid = document.getElementById('quickGrid');

for (const site of shortcuts) {
  const card = document.createElement('article');
  card.className = 'quick-card';
  card.innerHTML = `<h3>${site.title}</h3><p>${site.note}</p>`;
  quickGrid.append(card);
}

const tabs = document.querySelectorAll('.tab');
for (const tab of tabs) {
  tab.addEventListener('click', () => {
    tabs.forEach((el) => el.classList.remove('active'));
    tab.classList.add('active');
  });
}

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === 'l') {
    event.preventDefault();
    document.getElementById('urlInput').focus();
    document.getElementById('urlInput').select();
  }
});
