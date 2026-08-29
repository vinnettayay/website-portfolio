/**
 * Shared Portfolio Router & UI Logic
 * Handles dynamic navigation, hash scrolling, page transitions, and lightbox.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initPageTransitions();
    initBackToTop();

    // Contextual Page Rendering
    const pageType = document.body.getAttribute('data-page');
    if (pageType === 'home' && document.getElementById('projects-container')) {
        renderProjectsGrid();
    } else if (pageType === 'project') {
        loadProjectDetails();
        initLightbox();
    }

    // Process deep hash link (e.g. index.html or about.html#contact)
    handleHashNavigation();
});

/* --- Navbar & Active State Routing --- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('active');
        });
    }

    // Hash change dynamic navbar updates
    window.addEventListener('hashchange', updateNavActiveState);
    updateNavActiveState();
}

function updateNavActiveState() {
    const links = document.querySelectorAll('.nav-link');
    const currentHash = window.location.hash;
    const pageType = document.body.getAttribute('data-page');

    links.forEach(link => link.classList.remove('active'));

    if (currentHash === '#contact') {
        const contactNav = document.querySelector('.nav-link[data-nav="contact"]');
        if (contactNav) contactNav.classList.add('active');
    } else if (pageType === 'about') {
        const aboutNav = document.querySelector('.nav-link[data-nav="about"]');
        if (aboutNav) aboutNav.classList.add('active');
    } else {
        const homeNav = document.querySelector('.nav-link[data-nav="home"]');
        if (homeNav) homeNav.classList.add('active');
    }
}

/* --- Page Transition Curtain --- */
function initPageTransitions() {
    const curtain = document.getElementById('page-curtain');
    if (!curtain) return;

    // Fade curtain out on load
    setTimeout(() => {
        curtain.classList.remove('active');
    }, 100);

    // Intercept navigation links for smooth curtain fade-out
    document.querySelectorAll('a').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (!href || href.startsWith('http') || anchor.hasAttribute('download')) return;

        anchor.addEventListener('click', (e) => {
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const [targetPage, targetHash] = href.split('#');
            
            // Fix: If clicking a link pointing to the CURRENT page (e.g., about.html -> about.html#contact)
            const isSamePage = !targetPage || targetPage === currentPath;

            if (isSamePage && targetHash) {
                // Do not trigger page curtain reload; perform smooth scroll instead
                e.preventDefault();
                const targetEl = document.getElementById(targetHash);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                    history.pushState(null, null, `#${targetHash}`);
                    updateNavActiveState();
                }
            } else if (!href.startsWith('#')) {
                // Trigger curtain transition for actual page changes
                e.preventDefault();
                curtain.classList.add('active');
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            }
        });
    });
}

/* --- Render Homepage Asymmetric Projects --- */
function renderProjectsGrid() {
    const container = document.getElementById('projects-container');
    if (!container || typeof projectsData === 'undefined') return;

    container.innerHTML = projectsData.map(project => {
        const cardClass = project.featured ? 'project-card-featured' : 'project-card-standard';
        return `
            <article class="${cardClass}">
                <div class="project-thumb-box">
                    <img src="${project.thumbnail}" alt="${project.title} Screenshot" class="project-thumb-img" onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'">
                    <span class="project-year">${project.year}</span>
                </div>
                <div class="project-info-box">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.shortDescription}</p>
                    
                    <div class="project-meta-tags">
                        <span class="tag-item">${project.engine}</span>
                        <span class="tag-item">${project.genre}</span>
                    </div>

                    <a href="project.html?id=${project.id}" class="project-link-action">
                        View System Details <span>→</span>
                    </a>
                </div>
            </article>
        `;
    }).join('');
}

/* --- Load Dynamic Project Detail Page --- */
function loadProjectDetails() {
    const container = document.getElementById('project-detail-content');
    if (!container || typeof projectsData === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const project = projectsData.find(p => p.id === projectId) || projectsData[0];

    document.title = `${project.title} — Game Details`;

    const githubBtnHtml = project.github ? `
        <a href="${project.github}" target="_blank" class="btn btn-secondary" rel="noopener">
            View on GitHub <span class="btn-icon">💻</span>
        </a>
    ` : '';

    const itchBtnHtml = project.itch ? `
        <a href="${project.itch}" target="_blank" class="btn btn-primary" rel="noopener">
            Play on itch.io <span class="btn-icon">🎮</span>
        </a>
    ` : '';

    const galleryHtml = project.gallery && project.gallery.length > 0 ? `
        <section class="section" style="margin-top: 3rem;">
            <div class="section-tag">DEV GALLERY & ARTWORK</div>
            <h2 class="section-title">Artwork &amp; Development</h2>
            <div class="gallery-grid">
                ${project.gallery.map(imgSrc => `
                    <div class="gallery-item" data-src="${imgSrc}">
                        <img src="${imgSrc}" alt="Development screenshot" onerror="this.src='https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'">
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';

    const rolesHtml = project.roles.map(role => `
        <div class="role-card">${role}</div>
    `).join('');

    container.innerHTML = `
        <div class="container">
            <div class="project-hero-header">
                <div class="section-tag">${project.genre} • ${project.year}</div>
                <h1 class="project-hero-title">${project.title}</h1>
                <p class="project-hero-tagline">${project.shortDescription}</p>
            </div>

            <img src="${project.bannerImage}" alt="${project.title} Banner" class="project-main-banner" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'">

            <div class="project-details-grid">
                <div class="project-left-col">
                    <section>
                        <h2 class="section-title">Gameplay Video</h2>
                        <div class="video-container">
                            <iframe src="https://www.youtube-nocookie.com/embed/${project.youtube}" title="${project.title} Video" allowfullscreen></iframe>
                        </div>
                    </section>

                    <section style="margin-top: 3rem;">
                        <h2 class="section-title">About the Game</h2>
                        <p style="color: var(--cream-text); line-height: 1.7; white-space: pre-line;">${project.description}</p>
                        
                        <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
                            ${itchBtnHtml}
                            ${githubBtnHtml}
                        </div>
                    </section>

                    <section style="margin-top: 3rem;">
                        <h2 class="section-title">My Technical Role</h2>
                        <div class="role-cards-grid">
                            ${rolesHtml}
                        </div>
                    </section>
                </div>

                <div class="project-right-col">
                    <div class="meta-box">
                        <div class="meta-item">
                            <span class="meta-label">ENGINE & ARCHITECTURE</span>
                            <span class="meta-value">${project.engine}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">PLATFORM</span>
                            <span class="meta-value">${project.platform}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">GENRE</span>
                            <span class="meta-value">${project.genre}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">TEAM SIZE</span>
                            <span class="meta-value">${project.teamSize}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">YEAR</span>
                            <span class="meta-value">${project.year}</span>
                        </div>
                    </div>
                </div>
            </div>

            ${galleryHtml}
        </div>
    `;
}

/* --- Gallery Lightbox --- */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');

    if (!lightbox) return;

    document.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            const imgSrc = item.getAttribute('data-src') || e.target.src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
        }
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

/* --- Hash Routing & Cross-Page Scroll Logic --- */
function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }, 150);
    }
}

/* --- Back To Top --- */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (btn) {
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}