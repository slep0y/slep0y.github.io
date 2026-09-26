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

    function updateButton(btn) {
        if (!btn) return;
        const isDark = currentTheme() === 'dark';
        btn.textContent = isDark ? '☀️' : '🌙';
        btn.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить тёмную тему');
        btn.title = btn.getAttribute('aria-label');
    }

    document.addEventListener('click', function (e) {
        const toggle = e.target.closest('.theme-toggle');
        if (!toggle) return;
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateButton(toggle);
    });

    // синхронизация с системными настройками, когда тема не выбрана вручную
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (!localStorage.getItem('theme')) {
            document.querySelectorAll('.theme-toggle').forEach(updateButton);
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.theme-toggle').forEach(updateButton);
    });
})();
