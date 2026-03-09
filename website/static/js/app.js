(function () {
  var THEME_STORAGE_KEY = 'theme';

  function defaultThemeState() {
    return {
      mode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    };
  }

  function loadThemeState() {
    try {
      var raw = localStorage.getItem(THEME_STORAGE_KEY);
      if (!raw) return defaultThemeState();
      var parsed = JSON.parse(raw);
      var defaults = defaultThemeState();
      return {
        mode: parsed && (parsed.mode === 'dark' || parsed.mode === 'light') ? parsed.mode : defaults.mode,
      };
    } catch (err) {
      return defaultThemeState();
    }
  }

  function saveThemeState(state) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ mode: state.mode }));
    } catch (err) {}
  }

  function applyThemeState(state) {
    var root = document.documentElement;
    root.classList.toggle('dark', state.mode === 'dark');
    root.style.colorScheme = state.mode;
  }

  var themeTransitionTimeout = null;

  function applyThemeStateWithTransition(state) {
    var root = document.documentElement;

    if (themeTransitionTimeout) {
      clearTimeout(themeTransitionTimeout);
      themeTransitionTimeout = null;
    }

    root.classList.add('theme-transition');
    applyThemeState(state);

    themeTransitionTimeout = setTimeout(function () {
      root.classList.remove('theme-transition');
      themeTransitionTimeout = null;
    }, 250);
  }

  applyThemeState(loadThemeState());

  document.addEventListener('alpine:init', function () {
    Alpine.data('app', function () {
      var theme = loadThemeState();

      return {
        theme: theme,

        init: function () {
          applyThemeState(this.theme);
        },

        isDark: function () {
          return this.theme.mode === 'dark';
        },

        toggleColorMode: function () {
          this.theme.mode = this.theme.mode === 'dark' ? 'light' : 'dark';
          applyThemeStateWithTransition(this.theme);
          saveThemeState(this.theme);
        },
      };
    });
  });
})();
