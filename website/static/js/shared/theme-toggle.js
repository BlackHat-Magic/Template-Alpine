function isDark() {
    return document.documentElement.classList.contains('dark');
}

function updateThemeUI() {
    var dark = isDark();
    var moonIcon = document.getElementById('theme-icon-moon');
    var sunIcon = document.getElementById('theme-icon-sun');
    var themeText = document.getElementById('theme-text');
    
    if (moonIcon) moonIcon.style.display = dark ? 'none' : 'inline';
    if (sunIcon) sunIcon.style.display = dark ? 'inline' : 'none';
    if (themeText) themeText.textContent = dark ? 'Light' : 'Dark';
}

function toggleTheme() {
    if (isDark()) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeUI();
}

updateThemeUI();
