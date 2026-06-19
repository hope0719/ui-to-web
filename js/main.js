document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
  const panels = Array.from(document.querySelectorAll('.panel'));
  const titleEl = document.querySelector('#panel-title');
  const prevBtn = document.querySelector('#prevTab');
  const nextBtn = document.querySelector('#nextTab');

  function activatePanel(panelKey) {
    const targetPanel = document.querySelector(`#panel-${panelKey}`);
    const targetButton = document.querySelector(`.tab-btn[data-panel="${panelKey}"]`);
    if (!targetPanel || !targetButton) return;

    tabButtons.forEach((button) => button.classList.toggle('active', button === targetButton));
    panels.forEach((panel) => panel.classList.toggle('active', panel === targetPanel));

    if (titleEl) titleEl.textContent = targetPanel.dataset.title || targetButton.textContent.trim();

    const index = tabButtons.indexOf(targetButton);
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === tabButtons.length - 1;
  }

  function movePanel(direction) {
    const activeIndex = tabButtons.findIndex((button) => button.classList.contains('active'));
    const nextIndex = Math.min(Math.max(activeIndex + direction, 0), tabButtons.length - 1);
    const nextKey = tabButtons[nextIndex]?.dataset.panel;
    if (nextKey) activatePanel(nextKey);
  }

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => activatePanel(button.dataset.panel));
  });

  prevBtn?.addEventListener('click', () => movePanel(-1));
  nextBtn?.addEventListener('click', () => movePanel(1));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') movePanel(1);
    if (event.key === 'ArrowLeft') movePanel(-1);
  });

  window.activateTutorialPanel = activatePanel;
  activatePanel('overview');
});
