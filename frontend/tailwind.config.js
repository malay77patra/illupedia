// tailwind.config.js
module.exports = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'var(--color-background)',
                surface: 'var(--color-surface)',
                accent: 'var(--color-accent)',
                secondary: 'var(--color-secondary)',
                text: 'var(--color-text)',
                muted: 'var(--color-muted)',
                border: 'var(--color-border)',
                component: 'var(--color-component)',
            },
            opacity: {
                'active': '0.9',
                'disabled': '0.6'
            },
        },
    },
    plugins: [],
}
