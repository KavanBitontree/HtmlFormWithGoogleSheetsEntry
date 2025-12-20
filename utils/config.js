const CONFIG = {
    SHEETS_API_URL: "https://script.google.com/macros/s/AKfycbyUhh-_McPLu6q601QitIgrP22Uk0ZIne1imfHjEy5mMAFn4H5b26xKuKs7T6JMgG8/exec",

    REGEX: {
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        BLOCKED_EMAIL_DOMAINS: /(gmail|yahoo|outlook|hotmail)\.com$/i,
        NAME_STARTS_WITH_CAPITAL: /^[A-Z]/,
        PASSWORD: {
            ONE_UPPERCASE: /[A-Z]/,
            ONE_LOWERCASE: /[a-z]/,
            ONE_SPECIAL_CHAR: /[#@!$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
        }
    },

    PASSWORD: {
        MIN_LENGTH: 6
    }
};

// Export for ES6 modules
export { CONFIG };

// Also make it available globally for non-module scripts
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}