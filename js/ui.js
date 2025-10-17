// ========================================
// UI.JS - Interface do Usuário
// ========================================

import { storage } from './utils.js';

class UI {
    constructor() {
        this.theme = storage.get('theme') || 'dark';
        this.primaryColor = storage.get('primaryColor') || '#38e07b';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupThemeToggle();
        this.setupModals();
        this.setupToasts();
        this.setupDropdowns();
        this.setupTabs();
    }

    // Sistema de Temas
    applyTheme(theme = this.theme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(`${theme}-theme`);
        this.theme = theme;
        storage.set('theme', theme);
    }

    setupThemeToggle() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const newTheme = this.theme === 'dark' ? 'light' : 'dark';
                this.applyTheme(newTheme);
            });
        }
    }

    setPrimaryColor(color) {
        document.documentElement.style.setProperty('--primary', color);
        this.primaryColor = color;
        storage.set('primaryColor', color);
    }

    // Modals
    setupModals() {
        // Abrir modal
        document.querySelectorAll('[data-modal]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });

        // Fechar modal
        document.querySelectorAll('[data-modal-close]').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.closeModal(closeBtn.closest('.modal-overlay'));
            });
        });

        // Fechar ao clicar no overlay
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeModal(overlay);
                }
            });
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            setTimeout(() => modal.classList.add('active'), 10);
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Toast Notifications
    setupToasts() {
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    }

    showToast(message, type = 'info', duration = 3000) {
        const container = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: 'check_circle',
            error: 'error',
            warning: 'warning',
            info: 'info'
        };

        toast.innerHTML = `
            <span class="material-symbols-outlined toast-icon">${icons[type]}</span>
            <div class="toast-content">
                <p class="toast-message">${message}</p>
            </div>
            <span class="material-symbols-outlined toast-close" onclick="this.parentElement.remove()">
                close
            </span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // Dropdowns
    setupDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const trigger = dropdown.querySelector('[data-dropdown-trigger]');
            
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                });
            }
        });

        // Fechar ao clicar fora
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    }

    // Tabs
    setupTabs() {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabGroup = tab.closest('.tabs');
                const contentId = tab.getAttribute('data-tab');

                // Remover active de todas as tabs
                tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Mostrar conteúdo correspondente
                const contents = document.querySelectorAll('.tab-content');
                contents.forEach(content => {
                    if (content.id === contentId) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }

    // Loading
    showLoading(message = 'Carregando...') {
        if (!document.querySelector('.loading-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'loading-overlay';
            overlay.innerHTML = `
                <div class="loading-spinner"></div>
                <p style="margin-top: var(--spacing-md); color: var(--text-secondary);">${message}</p>
            `;
            document.body.appendChild(overlay);
        }
    }

    hideLoading() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    // Confirmação
    async confirm(message, title = 'Confirmar') {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.style.display = 'flex';
            modal.innerHTML = `
                <div class="modal">
                    <div class="modal-header">
                        <h3 class="modal-title">${title}</h3>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-ghost" data-action="cancel">Cancelar</button>
                        <button class="btn btn-primary" data-action="confirm">Confirmar</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            modal.querySelector('[data-action="confirm"]').addEventListener('click', () => {
                modal.remove();
                resolve(true);
            });

            modal.querySelector('[data-action="cancel"]').addEventListener('click', () => {
                modal.remove();
                resolve(false);
            });
        });
    }

    // Progress Bar
    updateProgress(percentage, elementId = 'progressBar') {
        const progressBar = document.getElementById(elementId);
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    }
}

// Instância global
const ui = new UI();

// Exportar funções úteis
export const showToast = (message, type, duration) => ui.showToast(message, type, duration);
export const showLoading = (message) => ui.showLoading(message);
export const hideLoading = () => ui.hideLoading();
export const confirm = (message, title) => ui.confirm(message, title);
export const updateProgress = (percentage, elementId) => ui.updateProgress(percentage, elementId);
export const setTheme = (theme) => ui.applyTheme(theme);
export const setPrimaryColor = (color) => ui.setPrimaryColor(color);

export default ui;
