// Переключатель светлой/тёмной темы
(function () {
    const root = document.documentElement;
    const stored = localStorage.getItem('theme'); // 'light' | 'dark' | null (авто)

    if (stored === 'light' || stored === 'dark') {
        root.setAttribute('data-theme', stored);
    }

    function currentTheme() {
        return root.getAttribute('data-theme')
            || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    // SVG-иконки: луна (для перехода в тёмную) и солнце (для возврата в светлую)
    const ICON_MOON = '<svg class="theme-toggle__icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    const ICON_SUN = '<svg class="theme-toggle__icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';

    function updateButton(btn) {
        if (!btn) return;
        const isDark = currentTheme() === 'dark';
        btn.innerHTML = isDark ? ICON_SUN : ICON_MOON;
        btn.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить тёмную тему');
        btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        btn.title = btn.getAttribute('aria-label');
    }

    function updateAllButtons() {
        document.querySelectorAll('.theme-toggle').forEach(updateButton);
    }

    document.addEventListener('click', function (e) {
        const toggle = e.target.closest('.theme-toggle');
        if (!toggle) return;
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateAllButtons();
    });

    // синхронизация с системными настройками, когда тема не выбрана вручную
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (!localStorage.getItem('theme')) {
            updateAllButtons();
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateAllButtons);
    } else {
        updateAllButtons();
    }
})();
