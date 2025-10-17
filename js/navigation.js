// ========================================
// NAVIGATION.JS - Sistema de Navegação
// ========================================

import { storage } from './utils.js';

class Navigation {
    constructor() {
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupActiveLinks();
        this.setupLayoutToggle();
        this.loadSavedLayout();
    }

    // Menu Mobile
    setupMobileMenu() {
        const burger = document.getElementById('navbarBurger');
        const menu = document.getElementById('navbarMenu');

        if (burger && menu) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('active');
                menu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Fechar ao clicar fora
            document.addEventListener('click', (e) => {
                if (!burger.contains(e.target) && !menu.contains(e.target)) {
                    burger.classList.remove('active');
                    menu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });

            // Fechar ao clicar em link
            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    burger.classList.remove('active');
                    menu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }
    }

    // Scroll Suave
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offset = 80; // Altura do navbar
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Links Ativos
    setupActiveLinks() {
        const links = document.querySelectorAll('.navbar-link, .sidebar-link, .bottom-nav-item');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Toggle Layout PC/Mobile
    setupLayoutToggle() {
        window.addEventListener('resize', this.handleResize.bind(this));
        this.handleResize();
    }

    handleResize() {
        const width = window.innerWidth;
        const body = document.body;

        // Remove classes existentes
        body.classList.remove('mobile-layout', 'tablet-layout', 'desktop-layout');

        // Adiciona classe baseada no tamanho
        if (width < 768) {
            body.classList.add('mobile-layout');
            this.enableMobileLayout();
        } else if (width < 1024) {
            body.classList.add('tablet-layout');
            this.enableTabletLayout();
        } else {
            body.classList.add('desktop-layout');
            this.enableDesktopLayout();
        }
    }

    enableMobileLayout() {
        // Ativar navegação inferior
        this.createBottomNavigation();
        // Desativar sidebar
        this.removeSidebar();
    }

    enableTabletLayout() {
        // Layout intermediário
        this.createBottomNavigation();
        this.removeSidebar();
    }

    enableDesktopLayout() {
        // Ativar sidebar
        this.createSidebar();
        // Remover navegação inferior
        this.removeBottomNavigation();
    }

    createBottomNavigation() {
        if (document.querySelector('.bottom-nav')) return;

        const nav = document.createElement('nav');
        nav.className = 'bottom-nav';
        nav.innerHTML = `
            <a href="dashboard.html" class="bottom-nav-item ${this.currentPage === 'dashboard.html' ? 'active' : ''}">
                <span class="material-symbols-outlined">home</span>
                <span>Início</span>
            </a>
            <a href="workouts.html" class="bottom-nav-item ${this.currentPage === 'workouts.html' ? 'active' : ''}">
                <span class="material-symbols-outlined">fitness_center</span>
                <span>Treinos</span>
            </a>
            <a href="store.html" class="bottom-nav-item ${this.currentPage === 'store.html' ? 'active' : ''}">
                <span class="material-symbols-outlined">storefront</span>
                <span>Loja</span>
            </a>
            <a href="profile.html" class="bottom-nav-item ${this.currentPage === 'profile.html' ? 'active' : ''}">
                <span class="material-symbols-outlined">person</span>
                <span>Perfil</span>
            </a>
        `;
        document.body.appendChild(nav);
    }

    removeBottomNavigation() {
        const nav = document.querySelector('.bottom-nav');
        if (nav) nav.remove();
    }

    createSidebar() {
        if (document.querySelector('.sidebar')) return;

        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;

        const sidebar = document.createElement('aside');
        sidebar.className = 'sidebar';
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <div class="sidebar-logo">
                    <span class="material-symbols-outlined">fitness_center</span>
                    <span class="logo-text">FitApp</span>
                </div>
            </div>
            
            <nav class="sidebar-nav">
                <a href="dashboard.html" class="sidebar-link ${this.currentPage === 'dashboard.html' ? 'active' : ''}">
                    <span class="material-symbols-outlined">dashboard</span>
                    <span>Dashboard</span>
                </a>
                <a href="workouts.html" class="sidebar-link ${this.currentPage === 'workouts.html' ? 'active' : ''}">
                    <span class="material-symbols-outlined">fitness_center</span>
                    <span>Meus Treinos</span>
                </a>
                <a href="attendance.html" class="sidebar-link ${this.currentPage === 'attendance.html' ? 'active' : ''}">
                    <span class="material-symbols-outlined">event_available</span>
                    <span>Frequência</span>
                </a>
                <a href="ranking.html" class="sidebar-link ${this.currentPage === 'ranking.html' ? 'active' : ''}">
                    <span class="material-symbols-outlined">emoji_events</span>
                    <span>Ranking</span>
                </a>
                <a href="store.html" class="sidebar-link ${this.currentPage === 'store.html' ? 'active' : ''}">
                    <span class="material-symbols-outlined">storefront</span>
                    <span>Loja</span>
                </a>
                <a href="my-plan.html" class="sidebar-link ${this.currentPage === 'my-plan.html' ? 'active' : ''}">
                    <span class="material-symbols-outlined">card_membership</span>
                    <span>Meu Plano</span>
                </a>
            </nav>
            
            <div class="sidebar-footer">
                <a href="settings.html" class="sidebar-link">
                    <span class="material-symbols-outlined">settings</span>
                    <span>Configurações</span>
                </a>
                <a href="#" onclick="logout()" class="sidebar-link">
                    <span class="material-symbols-outlined">logout</span>
                    <span>Sair</span>
                </a>
            </div>
        `;

        mainContent.parentNode.insertBefore(sidebar, mainContent);
        mainContent.classList.add('with-sidebar');
    }

    removeSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.remove();
        
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.classList.remove('with-sidebar');
    }

    loadSavedLayout() {
        const savedLayout = storage.get('preferredLayout');
        if (savedLayout) {
            this.applyLayout(savedLayout);
        }
    }

    applyLayout(layout) {
        switch(layout) {
            case 'mobile':
                this.enableMobileLayout();
                break;
            case 'tablet':
                this.enableTabletLayout();
                break;
            case 'desktop':
                this.enableDesktopLayout();
                break;
        }
    }

    saveLayoutPreference(layout) {
        storage.set('preferredLayout', layout);
    }
}

// Função de logout global
window.logout = async function() {
    if (confirm('Tem certeza que deseja sair?')) {
        try {
            const { logoutUser } = await import('./auth.js');
            await logoutUser();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            window.location.href = 'index.html';
        }
    }
}

// Inicializar navegação
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

export default Navigation;
