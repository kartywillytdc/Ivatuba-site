// ========================================
// COMPONENTS.JS - Componentes Dinâmicos
// ========================================

// Card de Exercício
export function createExerciseCard(exercise) {
    return `
        <div class="exercise-card" data-exercise-id="${exercise.id}">
            <div class="exercise-icon">
                <span class="material-symbols-outlined">fitness_center</span>
            </div>
            <div class="exercise-info">
                <h4 class="exercise-name">${exercise.name}</h4>
                <p class="exercise-details">
                    ${exercise.sets} séries x ${exercise.reps} repetições
                </p>
                <p class="exercise-rest">Descanso: ${exercise.rest}s</p>
            </div>
            <div class="exercise-actions">
                <button class="btn-icon" onclick="editExercise('${exercise.id}')">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="btn-icon" onclick="deleteExercise('${exercise.id}')">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
            <div class="exercise-checkbox">
                <input type="checkbox" id="ex-${exercise.id}" ${exercise.completed ? 'checked' : ''}>
                <label for="ex-${exercise.id}"></label>
            </div>
        </div>
    `;
}

// Card de Produto
export function createProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
                <button class="btn-favorite" onclick="toggleFavorite('${product.id}')">
                    <span class="material-symbols-outlined">favorite_border</span>
                </button>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <div class="product-rating">
                    ${'⭐'.repeat(5)}
                    <span>(${product.reviews || 0})</span>
                </div>
            </div>
            <div class="product-footer">
                <button class="btn btn-primary btn-block" onclick="addToCart('${product.id}')">
                    <span class="material-symbols-outlined">add_shopping_cart</span>
                    Adicionar
                </button>
            </div>
        </div>
    `;
}

// Card de Usuário no Ranking
export function createRankingCard(user, position) {
    const colors = {
        1: '#FF6B6B',
        2: '#FFC145',
        3: '#F9F871',
        4: '#5BCEAE',
        5: '#5D5FEF'
    };

    const color = colors[position] || '#gray-500';
    const borderClass = position <= 5 ? `border-[${color}]/50` : '';
    const glowClass = position === 1 ? 'animate-rainbow-glow' : '';

    return `
        <div class="ranking-card ${borderClass} ${glowClass}" data-user-id="${user.id}">
            ${position === 1 ? `
                <div class="ranking-badge">
                    <span class="material-symbols-outlined">workspace_premium</span>
                </div>
            ` : ''}
            <div class="ranking-position" style="color: ${color};">
                #${position}
            </div>
            <div class="ranking-avatar">
                <img src="${user.avatarUrl || `https://ui-avatars.com/api/?name=${user.fullName}&background=random`}" 
                     alt="${user.fullName}"
                     style="border-color: ${color};">
            </div>
            <div class="ranking-info">
                <h4 class="ranking-name">${user.fullName}</h4>
                <p class="ranking-level" style="color: ${color};">Nível ${user.nivel}</p>
            </div>
            <div class="ranking-score">
                <span class="score-value">${user.foguinhos}</span>
                <span class="score-icon">🔥</span>
            </div>
        </div>
    `;
}

// Card de Plano
export function createPlanCard(plan, isCurrent = false) {
    return `
        <div class="plan-card ${isCurrent ? 'current-plan' : ''}">
            <div class="plan-image">
                <img src="${plan.imageUrl}" alt="${plan.name}">
            </div>
            <div class="plan-content">
                <h3 class="plan-name">${plan.name}</h3>
                <p class="plan-price">R$ ${plan.price.toFixed(2)}/mês</p>
                <div class="plan-features">
                    <div class="plan-feature">
                        <span class="material-symbols-outlined">local_fire_department</span>
                        <span>${plan.frequency}</span>
                    </div>
                    <div class="plan-feature">
                        <span class="material-symbols-outlined">event_available</span>
                        <span>Válido até ${plan.validUntil}</span>
                    </div>
                </div>
                ${isCurrent ? `
                    <button class="btn btn-outline btn-block">Renovar Plano</button>
                ` : `
                    <button class="btn btn-primary btn-block">Assinar</button>
                `}
            </div>
        </div>
    `;
}

// Skeleton Loader
export function createSkeleton(type = 'card') {
    const skeletons = {
        card: `
            <div class="skeleton-card">
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
            </div>
        `,
        list: `
            <div class="skeleton-list">
                <div class="skeleton skeleton-avatar"></div>
                <div style="flex: 1;">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-text"></div>
                </div>
            </div>
        `,
        text: `<div class="skeleton skeleton-text"></div>`
    };

    return skeletons[type] || skeletons.card;
}

// Empty State
export function createEmptyState(message, icon = 'inbox', actionText = null, actionCallback = null) {
    return `
        <div class="empty-state">
            <span class="empty-state-icon material-symbols-outlined">${icon}</span>
            <h3 class="empty-state-title">Nada por aqui ainda</h3>
            <p class="empty-state-description">${message}</p>
            ${actionText ? `
                <button class="btn btn-primary" onclick="${actionCallback}">
                    ${actionText}
                </button>
            ` : ''}
        </div>
    `;
}

// Pagination
export function createPagination(currentPage, totalPages, onPageChange) {
    let html = '<div class="pagination">';
    
    // Previous
    html += `
        <div class="pagination-item ${currentPage === 1 ? 'disabled' : ''}" 
             onclick="${currentPage > 1 ? `${onPageChange}(${currentPage - 1})` : ''}">
            <span class="material-symbols-outlined">chevron_left</span>
        </div>
    `;
    
    // Pages
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `
                <div class="pagination-item ${i === currentPage ? 'active' : ''}"
                     onclick="${onPageChange}(${i})">
                    ${i}
                </div>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += '<div class="pagination-item disabled">...</div>';
        }
    }
    
    // Next
    html += `
        <div class="pagination-item ${currentPage === totalPages ? 'disabled' : ''}"
             onclick="${currentPage < totalPages ? `${onPageChange}(${currentPage + 1})` : ''}">
            <span class="material-symbols-outlined">chevron_right</span>
        </div>
    `;
    
    html += '</div>';
    return html;
}

// Breadcrumb
export function createBreadcrumb(items) {
    return `
        <nav class="breadcrumb">
            ${items.map((item, index) => `
                <div class="breadcrumb-item ${index === items.length - 1 ? 'active' : ''}">
                    ${index < items.length - 1 ? `<a href="${item.url}">${item.label}</a>` : item.label}
                </div>
            `).join('')}
        </nav>
    `;
}

// Stats Card
export function createStatsCard(title, value, icon, trend = null) {
    return `
        <div class="stats-card">
            <div class="stats-icon">
                <span class="material-symbols-outlined">${icon}</span>
            </div>
            <div class="stats-content">
                <p class="stats-label">${title}</p>
                <h3 class="stats-value">${value}</h3>
                ${trend ? `
                    <p class="stats-trend ${trend.direction}">
                        <span class="material-symbols-outlined">
                            ${trend.direction === 'up' ? 'trending_up' : 'trending_down'}
                        </span>
                        ${trend.value}%
                    </p>
                ` : ''}
            </div>
        </div>
    `;
}
