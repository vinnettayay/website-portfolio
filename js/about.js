/**
 * About Page Specific Interactions
 * Handles playground skill card hover triggers and contact auto-scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
    initPlaygroundHoverEffects();
});

function initPlaygroundHoverEffects() {
    const cards = document.querySelectorAll('.playground-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--red-accent)';
        });
        card.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    });
}