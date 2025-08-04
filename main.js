// Loading screen - Múltiplas verificações para garantir remoção
function removeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease-in-out';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    document.body.style.opacity = '1';
}

window.addEventListener('load', function() {
    // Remover tela de loading após carregamento completo
    setTimeout(removeLoadingScreen, 1000);
});

// Fallback - remover loading após 3 segundos no máximo
setTimeout(removeLoadingScreen, 3000);

// Remover loading quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(removeLoadingScreen, 1500);
});

// Ao carregar a página, verifica se há dados salvos
window.onload = function() {
    const userLogged = localStorage.getItem('userLogged');
    const userPhoto = localStorage.getItem('userPhoto');
    if (userLogged === 'true') {
        document.getElementById('auth-buttons').style.display = 'none';
        document.getElementById('user-area').style.display = 'flex';
        if (userPhoto) {
            document.getElementById('user-photo').src = userPhoto;
        }
    }
    
    // Verificar conquistas salvas
    checkSavedBadges();
    
    // Mostrar dica do dia
    mostrarDicaDoDia();
    
    // Atualizar progresso
    updateProgress();
    
    // Inicializar controles avançados dos vídeos
    setTimeout(() => {
        initTouchScroll();
        updateScrollIndicator();
        updateNavigationButtons();
        startVideoAutoplay();
        
        // Listener para scroll manual
        const container = document.getElementById('videos-container');
        if (container) {
            container.addEventListener('scroll', () => {
                updateScrollIndicator();
                updateNavigationButtons();
            });
        }
    }, 1500);
};

// Sistema de Progresso
function updateProgress() {
    const quizCompleted = localStorage.getItem('quiz-completed') || '0';
    const simulationsCompleted = localStorage.getItem('simulations-completed') || '0';
    const manualAccessed = localStorage.getItem('badge-manual') === 'true';
    
    // Atualizar contadores
    document.getElementById('quiz-completed').textContent = quizCompleted;
    document.getElementById('simulations-completed').textContent = simulationsCompleted;
    document.getElementById('manual-accessed').textContent = manualAccessed ? 'Sim' : 'Não';
    
    // Calcular porcentagem
    const totalActivities = 3; // Quiz, Simulador, Manual
    let completedActivities = 0;
    
    if (parseInt(quizCompleted) > 0) completedActivities++;
    if (parseInt(simulationsCompleted) > 0) completedActivities++;
    if (manualAccessed) completedActivities++;
    
    const percentage = Math.round((completedActivities / totalActivities) * 100);
    
    // Atualizar barra de progresso
    document.getElementById('progress-bar').style.width = percentage + '%';
    document.getElementById('progress-percentage').textContent = percentage + '%';
    
    // Atualizar mensagem
    const messageElement = document.getElementById('progress-message');
    if (percentage === 100) {
        messageElement.textContent = '🎉 Parabéns! Você completou todos os módulos!';
        messageElement.style.background = 'linear-gradient(45deg, #e8f5e8, #c8e6c9)';
    } else if (percentage >= 50) {
        messageElement.textContent = '👍 Ótimo progresso! Continue assim!';
        messageElement.style.background = 'linear-gradient(45deg, #fff3e0, #ffe0b2)';
    } else {
        messageElement.textContent = '🌟 Continue aprendendo para se tornar um especialista em trânsito!';
    }
}

// Sistema de Quiz
let currentQuestion = 1;
let score = 0;

function checkAnswer(button, isCorrect, questionNumber) {
    const questionDiv = document.getElementById(`question-${questionNumber}`);
    const buttons = questionDiv.querySelectorAll('button');
    
    // Desabilitar todos os botões
    buttons.forEach(btn => btn.style.pointerEvents = 'none');
    
    if (isCorrect) {
        button.style.background = '#4caf50';
        button.style.color = 'white';
        button.style.border = '2px solid #4caf50';
        score++;
        showNotification('✅ Resposta correta!');
    } else {
        button.style.background = '#f44336';
        button.style.color = 'white';
        button.style.border = '2px solid #f44336';
        showNotification('❌ Resposta incorreta!');
        
        // Destacar a resposta correta
        buttons.forEach(btn => {
            if (btn.onclick && btn.onclick.toString().includes('true')) {
                btn.style.background = '#4caf50';
                btn.style.color = 'white';
                btn.style.border = '2px solid #4caf50';
            }
        });
    }
    
    // Atualizar pontuação
    document.getElementById('points').textContent = score;
    
    // Próxima pergunta após 2 segundos
    setTimeout(() => {
        if (questionNumber < 3) {
            questionDiv.style.display = 'none';
            document.getElementById(`question-${questionNumber + 1}`).style.display = 'block';
            currentQuestion++;
            document.getElementById('current-question').textContent = currentQuestion;
        } else {
            // Fim do quiz
            finishQuiz();
        }
    }, 2000);
}

function finishQuiz() {
    const resultDiv = document.getElementById('quiz-result');
    const titleElement = document.getElementById('result-title');
    const messageElement = document.getElementById('result-message');
    
    // Esconder todas as perguntas
    document.querySelectorAll('.quiz-question').forEach(q => q.style.display = 'none');
    
    // Mostrar resultado
    resultDiv.style.display = 'block';
    
    if (score === 3) {
        titleElement.textContent = '🏆 Perfeito!';
        titleElement.style.color = '#4caf50';
        messageElement.textContent = 'Parabéns! Você acertou todas as perguntas e demonstra excelente conhecimento sobre trânsito!';
        resultDiv.style.background = '#e8f5e8';
        unlockBadge('quiz');
    } else if (score === 2) {
        titleElement.textContent = '👍 Muito Bom!';
        titleElement.style.color = '#ff9800';
        messageElement.textContent = 'Ótimo resultado! Você tem bom conhecimento sobre trânsito, continue estudando!';
        resultDiv.style.background = '#fff3e0';
    } else {
        titleElement.textContent = '📚 Continue Estudando!';
        titleElement.style.color = '#f44336';
        messageElement.textContent = 'É importante estudar mais sobre segurança no trânsito. Que tal revisar o manual?';
        resultDiv.style.background = '#ffebee';
    }
    
    // Salvar conclusão do quiz
    const currentCompleted = parseInt(localStorage.getItem('quiz-completed') || '0');
    localStorage.setItem('quiz-completed', (currentCompleted + 1).toString());
    
    // Atualizar progresso
    updateProgress();
}

function restartQuiz() {
    currentQuestion = 1;
    score = 0;
    
    // Reset visual
    document.querySelectorAll('.quiz-question').forEach((q, index) => {
        q.style.display = index === 0 ? 'block' : 'none';
        const buttons = q.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.background = '#fff';
            btn.style.color = '#333';
            btn.style.border = '2px solid #ddd';
            btn.style.pointerEvents = 'auto';
        });
    });
    
    // Reset counters
    document.getElementById('points').textContent = '0';
    document.getElementById('current-question').textContent = '1';
    document.getElementById('quiz-result').style.display = 'none';
}

// Simulador de Cenários
const cenarios = [
    {
        emoji: '🚦',
        titulo: 'Semáforo amarelo piscando',
        descricao: 'Você está dirigindo a 50km/h e se aproxima de um cruzamento com semáforo amarelo piscando. Há pedestres aguardando para atravessar. O que você faz?',
        acoes: {
            parar: { texto: '🛑 Parar e dar preferência', feedback: 'Correto! Semáforo amarelo piscando indica atenção redobrada e preferência aos pedestres.', correto: true },
            acelerar: { texto: '⚡ Acelerar para passar', feedback: 'Incorreto! Acelerar em cruzamentos é perigoso e pode causar acidentes graves.', correto: false },
            reduzir: { texto: '🐌 Reduzir e avaliar', feedback: 'Parcialmente correto, mas o ideal é parar completamente e dar preferência aos pedestres.', correto: false }
        }
    },
    {
        emoji: '🌧️',
        titulo: 'Pista molhada',
        descricao: 'Está chovendo e a pista está escorregadia. Um carro freia bruscamente à sua frente. Como você reage?',
        acoes: {
            parar: { texto: '🛑 Frear gradualmente', feedback: 'Correto! Em pista molhada, freadas graduais evitam derrapagens.', correto: true },
            acelerar: { texto: '⚡ Desviar rapidamente', feedback: 'Perigoso! Manobras bruscas em pista molhada podem causar perda de controle.', correto: false },
            reduzir: { texto: '🐌 Manter distância', feedback: 'Bom, mas neste caso é necessário frear para evitar colisão.', correto: false }
        }
    }
];

let cenarioAtual = 0;

function simularAcao(acao) {
    const cenario = cenarios[cenarioAtual];
    const resultado = cenario.acoes[acao];
    const resultadoDiv = document.getElementById('resultado-simulacao');
    
    resultadoDiv.innerHTML = `
        <div style="padding: 20px; border-radius: 10px; ${resultado.correto ? 'background: #e8f5e8; border-left: 5px solid #4caf50;' : 'background: #ffebee; border-left: 5px solid #f44336;'}">
            <h4 style="color: ${resultado.correto ? '#4caf50' : '#f44336'}; margin-top: 0;">
                ${resultado.correto ? '✅ Ação Correta!' : '❌ Ação Incorreta!'}
            </h4>
            <p style="margin-bottom: 15px;">${resultado.feedback}</p>
            <button onclick="proximoCenario()" style="background: #2196f3; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-right: 10px;">➡️ Próximo Cenário</button>
            <button onclick="reiniciarSimulador()" style="background: #ff9800; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">🔄 Reiniciar</button>
        </div>
    `;
    resultadoDiv.style.display = 'block';
    
    // Salvar simulação completada
    if (resultado.correto) {
        const currentCompleted = parseInt(localStorage.getItem('simulations-completed') || '0');
        localStorage.setItem('simulations-completed', (currentCompleted + 1).toString());
        unlockBadge('simulador');
        updateProgress();
    }
}

function proximoCenario() {
    cenarioAtual = (cenarioAtual + 1) % cenarios.length;
    carregarCenario();
}

function reiniciarSimulador() {
    cenarioAtual = 0;
    carregarCenario();
}

function carregarCenario() {
    const cenario = cenarios[cenarioAtual];
    const cenarioDiv = document.getElementById('cenario');
    
    cenarioDiv.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 20px;">${cenario.emoji}</div>
        <h3 style="color: #1976d2; margin-bottom: 15px;">Situação: ${cenario.titulo}</h3>
        <p style="color: #666; margin-bottom: 25px; line-height: 1.6;">${cenario.descricao}</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; max-width: 600px; margin: 0 auto;">
            ${Object.entries(cenario.acoes).map(([key, acao]) => 
                `<button onclick="simularAcao('${key}')" style="background: #f44336; color: white; border: none; padding: 15px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s;">${acao.texto}</button>`
            ).join('')}
        </div>
    `;
    
    document.getElementById('resultado-simulacao').style.display = 'none';
}

// Calculadora de Multas
function calcularMulta() {
    const select = document.getElementById('tipo-infracao');
    const valor = select.value;
    const resultadoDiv = document.getElementById('resultado-multa');
    const valorDiv = document.getElementById('valor-multa');
    
    if (valor) {
        valorDiv.textContent = `R$ ${valor}`;
        resultadoDiv.style.display = 'block';
        showNotification('💰 Multa calculada!');
    } else {
        alert('Por favor, selecione uma infração!');
    }
}

// Sistema de Conquistas
function unlockBadge(badgeType) {
    const badge = document.getElementById(`badge-${badgeType}`);
    if (badge && badge.style.opacity !== '1') {
        badge.style.opacity = '1';
        badge.querySelector('div').style.background = badgeType === 'quiz' ? '#9c27b0' : 
                                                    badgeType === 'simulador' ? '#1976d2' : '#ff9800';
        
        // Salvar no localStorage
        localStorage.setItem(`badge-${badgeType}`, 'true');
        
        // Animação de conquista
        badge.style.transform = 'scale(1.2)';
        setTimeout(() => {
            badge.style.transform = 'scale(1)';
        }, 300);
        
        showNotification(`🏆 Conquista desbloqueada: ${badge.querySelector('p').textContent}!`);
    }
}

function checkSavedBadges() {
    ['quiz', 'simulador', 'manual'].forEach(badgeType => {
        if (localStorage.getItem(`badge-${badgeType}`) === 'true') {
            const badge = document.getElementById(`badge-${badgeType}`);
            if (badge) {
                badge.style.opacity = '1';
                badge.querySelector('div').style.background = badgeType === 'quiz' ? '#9c27b0' : 
                                                            badgeType === 'simulador' ? '#1976d2' : '#ff9800';
            }
        }
    });
}

// Dicas do dia
const dicasDiarias = [
    "🔧 Sempre verifique os pneus antes de viajar!",
    "🚗 Mantenha distância segura do veículo da frente.",
    "💡 Use sempre o cinto de segurança, mesmo em trajetos curtos.",
    "📱 Nunca use o celular enquanto dirige.",
    "🌧️ Reduza a velocidade em dias chuvosos.",
    "🚦 Respeite sempre a sinalização de trânsito.",
    "👀 Mantenha atenção total ao volante."
];

function mostrarDicaDoDia() {
    const hoje = new Date().getDate();
    const dicaIndex = hoje % dicasDiarias.length;
    const dica = dicasDiarias[dicaIndex];
    
    showNotification(`💡 Dica do dia: ${dica}`);
}

function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: bold;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Sistema de Chatbot
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const isVisible = chatWindow.style.display === 'block';
    chatWindow.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        document.getElementById('chat-input').focus();
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        input.value = '';
        
        // Simular resposta do bot após um delay
        setTimeout(() => {
            const response = getChatResponse(message);
            addChatMessage(response, 'bot');
        }, 1000);
    }
}

function chatQuestion(topic) {
    const questions = {
        velocidade: "Quais são os limites de velocidade nas vias urbanas?",
        multas: "Quanto custa a multa por excesso de velocidade?",
        documentos: "Quais documentos devo portar ao dirigir?"
    };
    
    const question = questions[topic];
    if (question) {
        addChatMessage(question, 'user');
        
        setTimeout(() => {
            const response = getChatResponse(question);
            addChatMessage(response, 'bot');
        }, 1000);
    }
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    
    if (sender === 'user') {
        messageDiv.style.cssText = `
            background: #e3f2fd;
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 10px;
            margin-left: 20px;
            text-align: right;
        `;
    } else {
        messageDiv.style.cssText = `
            background: white;
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 10px;
            margin-right: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
    }
    
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getChatResponse(message) {
    const responses = {
        velocidade: "🚗 Limites de velocidade:\n• Vias urbanas: 60 km/h\n• Vias coletoras: 40 km/h\n• Vias locais: 30 km/h\n• Rodovias: 110 km/h\n• Autoestradas: 120 km/h",
        multas: "💰 Valores de multas mais comuns:\n• Excesso até 20%: R$ 130,16\n• Excesso 20-50%: R$ 195,23\n• Excesso acima 50%: R$ 880,41\n• Celular: R$ 293,47\n• Álcool: R$ 2.934,70"
    };
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('velocidade') || lowerMessage.includes('limite')) {
        return responses.velocidade;
    } else if (lowerMessage.includes('multa') || lowerMessage.includes('excesso')) {
        return responses.multas;
    } else if (lowerMessage.includes('documento') || lowerMessage.includes('cnh') || lowerMessage.includes('crlv')) {
        return responses.documentos;
    } else if (lowerMessage.includes('cinto')) {
        return "🔒 O cinto de segurança é obrigatório para todos os ocupantes do veículo. A multa por não usar é de R$ 195,23 (infração grave).";
    } else if (lowerMessage.includes('celular') || lowerMessage.includes('telefone')) {
        return "📱 Usar celular ao volante é infração gravíssima. Multa de R$ 293,47 + 7 pontos na CNH + suspensão do direito de dirigir.";
    } else if (lowerMessage.includes('álcool') || lowerMessage.includes('bebida')) {
        return "🍺 Dirigir sob efeito de álcool: multa de R$ 2.934,70 + suspensão da CNH + apreensão do veículo. Lei Seca é rigorosa!";
    } else {
        return "🤖 Olá! Sou seu assistente de trânsito. Posso ajudar com dúvidas sobre velocidade, multas, documentos e segurança viária. Digite sua pergunta ou use os botões de atalho!";
    }
}

// Sistema de Autenticação
function showForm(tipo) {
    document.getElementById('auth-buttons').style.display = 'none';
    document.getElementById('auth-form').style.display = 'block';
    document.getElementById('form-login').style.display = tipo === 'login' ? 'block' : 'none';
    document.getElementById('form-cadastro').style.display = tipo === 'cadastro' ? 'block' : 'none';
}

function submitAuth() {
    document.getElementById('auth-form').style.display = 'none';
    document.getElementById('user-area').style.display = 'flex';
    localStorage.setItem('userLogged', 'true');
    return false;
}

function trocarFoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('user-photo').src = e.target.result;
            localStorage.setItem('userPhoto', e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

function deslogar() {
    document.getElementById('user-area').style.display = 'none';
    document.getElementById('auth-buttons').style.display = 'flex';
    localStorage.removeItem('userLogged');
    localStorage.removeItem('userPhoto');
}

// Manual do Trânsito
function abrirManual() {
    // Desbloquear conquista
    unlockBadge('manual');
    
    // Atualizar progresso
    updateProgress();
    
    // Verifica se é dispositivo móvel
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        mostrarPDFNoModal();
    } else {
        window.open('docs/manual-transito-2022.pdf', '_blank');
    }
}

function mostrarPDFNoModal() {
    // Cria o conteúdo do modal com iframe do PDF
    const modalContent = document.querySelector('#manual-modal > div');
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #fbc02d;">
            <h3 style="margin: 0; color: #795548;">📖 Manual de Trânsito 2022</h3>
            <button onclick="fecharManual()" style="background: #f44336; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem;">✕</button>
        </div>
        <iframe src="docs/manual-transito-2022.pdf" style="width: 100%; height: 70vh; border: none; border-radius: 8px;"></iframe>
        <div style="text-align: center; margin-top: 15px;">
            <p style="color: #666; margin: 0;">📱 Deslize para navegar pelo manual</p>
        </div>
    `;
    
    // Mostra o modal
    document.getElementById('manual-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function fecharManual() {
    document.getElementById('manual-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura scroll da página
}

// Fechar modal clicando fora dele
document.addEventListener('click', function(event) {
    const modal = document.getElementById('manual-modal');
    if (event.target === modal) {
        fecharManual();
    }
});

// Botão voltar ao topo
window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Função para controlar o scroll dos vídeos com snap
function scrollVideos(direction) {
    const container = document.getElementById('videos-container');
    const cardWidth = 340; // Largura de um card + gap
    const totalCards = container.children.length;
    
    if (direction === 'left') {
        container.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    }
    
    // Atualizar indicador após animação
    setTimeout(() => {
        updateScrollIndicator();
        updateNavigationButtons();
    }, 400);
}

// Função aprimorada para atualizar o indicador de scroll
function updateScrollIndicator() {
    const container = document.getElementById('videos-container');
    const indicator = document.getElementById('scroll-indicator');
    const position = document.getElementById('scroll-position');
    
    if (container && indicator && position) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;
        const scrollPercentage = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
        
        // Calcular qual card está mais visível
        const cardWidth = 340;
        const currentCard = Math.round(currentScroll / cardWidth) + 1;
        const totalCards = container.children.length;
        
        // Atualizar a largura do indicador baseado na posição
        const indicatorWidth = 30 + (scrollPercentage / 100) * 70; // 30% a 100%
        indicator.style.width = indicatorWidth + '%';
        
        // Atualizar posição
        position.textContent = `${Math.min(currentCard, totalCards)} / ${totalCards}`;
        
        // Adicionar pulsação quando no final
        if (scrollPercentage > 95) {
            indicator.style.animation = 'pulse 1s infinite';
        } else {
            indicator.style.animation = 'none';
        }
    }
}

// Atualizar visibilidade dos botões de navegação
function updateNavigationButtons() {
    const container = document.getElementById('videos-container');
    const leftBtn = document.getElementById('scroll-left');
    const rightBtn = document.getElementById('scroll-right');
    
    if (container && leftBtn && rightBtn) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;
        
        // Mostrar/ocultar botões baseado na posição
        leftBtn.style.opacity = currentScroll <= 10 ? '0.5' : '1';
        leftBtn.style.pointerEvents = currentScroll <= 10 ? 'none' : 'auto';
        
        rightBtn.style.opacity = currentScroll >= maxScroll - 10 ? '0.5' : '1';
        rightBtn.style.pointerEvents = currentScroll >= maxScroll - 10 ? 'none' : 'auto';
    }
}

// Função para scroll automático por toque/swipe
function initTouchScroll() {
    const container = document.getElementById('videos-container');
    if (!container) return;
    
    let startX, startScrollLeft, isDragging = false;
    
    // Mouse events
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        startScrollLeft = container.scrollLeft;
        e.preventDefault();
    });
    
    container.addEventListener('mouseleave', () => {
        isDragging = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mouseup', () => {
        isDragging = false;
        container.style.cursor = 'grab';
        snapToNearestCard();
    });
    
    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = startScrollLeft - walk;
    });
    
    // Touch events
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startScrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('touchend', () => {
        snapToNearestCard();
    });
    
    container.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].clientX;
        const walk = (startX - x) * 2;
        container.scrollLeft = startScrollLeft + walk;
    });
}

// Função para encaixar no card mais próximo
function snapToNearestCard() {
    const container = document.getElementById('videos-container');
    const cardWidth = 340;
    const currentScroll = container.scrollLeft;
    const nearestCard = Math.round(currentScroll / cardWidth);
    
    container.scrollTo({
        left: nearestCard * cardWidth,
        behavior: 'smooth'
    });
    
    setTimeout(() => {
        updateScrollIndicator();
        updateNavigationButtons();
    }, 400);
}

// Função para auto-play dos vídeos (opcional)
function startVideoAutoplay() {
    const container = document.getElementById('videos-container');
    let autoplayInterval;
    
    function autoScroll() {
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;
        
        if (currentScroll >= maxScroll - 10) {
            // Voltar ao início
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            scrollVideos('right');
        }
    }
    
    // Iniciar autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(autoScroll, 4000);
    }
    
    // Parar autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Pausar ao hover
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
    
    // Pausar ao touch
    container.addEventListener('touchstart', stopAutoplay);
    
    // Iniciar autoplay
    startAutoplay();
}

// Event listener para o scroll do container de vídeos
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('videos-container');
    if (container) {
        container.addEventListener('scroll', updateScrollIndicator);
        
        // Inicializar o indicador
        updateScrollIndicator();
        
        // Adicionar suporte para scroll com touch/swipe em dispositivos móveis
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            container.scrollLeft = scrollLeft - walk;
        });
    }
});
