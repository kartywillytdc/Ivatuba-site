// ========================================
// UTILS.JS - Funções Utilitárias
// ========================================

// Formatar moeda
export function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Formatar data
export function formatDate(date, format = 'short') {
    const options = format === 'long' 
        ? { year: 'numeric', month: 'long', day: 'numeric' }
        : { year: 'numeric', month: '2-digit', day: '2-digit' };
    
    return new Intl.DateTimeFormat('pt-BR', options).format(new Date(date));
}

// Calcular nível baseado em foguinhos
export function calculateLevel(foguinhos) {
    if (foguinhos < 100) return 1;
    if (foguinhos < 250) return 2;
    if (foguinhos < 500) return 3;
    if (foguinhos < 1000) return 4;
    return 5;
}

// Validar email
export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Gerar ID único
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Debounce function
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Detectar dispositivo
export function isMobile() {
    return window.innerWidth < 768;
}

export function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function isDesktop() {
    return window.innerWidth >= 1024;
}

// Local Storage helpers
export const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage', e);
            return false;
        }
    },
    
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage', e);
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage', e);
            return false;
        }
    },
    
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Error clearing localStorage', e);
            return false;
        }
    }
};

// Copiar para clipboard
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
}

// Scroll suave
export function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Truncar texto
export function truncate(str, length = 50) {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

// Delay
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Random entre range
export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Capitalize
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Remove acentos
export function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
