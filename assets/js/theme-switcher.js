// Function to apply theme
const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
};

// Function to handle the theme toggle logic
const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }
};

// Load saved theme from local storage immediately
const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark theme
applyTheme(savedTheme);

// Wait for the DOM to be fully loaded for button interaction
document.addEventListener('DOMContentLoaded', () => {
    const desktopSwitcher = document.getElementById('desktop-theme-switcher-btn');
    const mobileSwitcher = document.getElementById('theme-switcher-mobile-btn');

    if (desktopSwitcher) {
        desktopSwitcher.addEventListener('click', toggleTheme);
    }

    if (mobileSwitcher) {
        mobileSwitcher.addEventListener('click', toggleTheme);
    }
});
