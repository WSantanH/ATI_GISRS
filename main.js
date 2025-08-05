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

// Detectar se é mobile
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Função para prevenir zoom no iOS em inputs
function preventIOSZoom() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            });
            input.addEventListener('blur', function() {
                document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            });
        });
    }
}

// Função para otimizar toques em mobile
function optimizeTouchEvents() {
    if (isMobile()) {
        // Adicionar classe para identificar dispositivos móveis
        document.body.classList.add('mobile-device');
        
        // Melhorar a experiência de toque nos botões
        const buttons = document.querySelectorAll('button, .nav-button');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            button.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Otimizar scroll dos vídeos para mobile
        const videosContainer = document.getElementById('videos-container');
        if (videosContainer) {
            let isScrolling = false;
            videosContainer.addEventListener('touchstart', function() {
                isScrolling = true;
            });
            videosContainer.addEventListener('touchend', function() {
                setTimeout(() => {
                    isScrolling = false;
                }, 100);
            });
        }
    }
}

window.addEventListener('load', function() {
    // Remover tela de loading após carregamento completo
    setTimeout(removeLoadingScreen, 1000);
    // Inicializar otimizações para mobile
    optimizeTouchEvents();
    preventIOSZoom();
});

// Fallback - remover loading após 3 segundos no máximo
setTimeout(removeLoadingScreen, 3000);

// Remover loading quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(removeLoadingScreen, 1500);
    
    // Inicializar todos os event listeners
    initializeEventListeners();
    
    // Inicializar otimizações para mobile
    optimizeTouchEvents();
    preventIOSZoom();
});

// Função para inicializar todos os event listeners
function initializeEventListeners() {
    // Event listeners para o chatbot
    const chatToggle = document.getElementById('chat-toggle');
    if (chatToggle) {
        chatToggle.addEventListener('click', toggleChat);
        chatToggle.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
            this.style.animation = 'none';
        });
        chatToggle.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
            this.style.animation = 'pulse 2s ease-in-out infinite';
        });
    }

    // Event listeners para botões de fechar chat
    const chatCloseBtns = document.querySelectorAll('.chat-close-btn');
    chatCloseBtns.forEach(btn => {
        btn.addEventListener('click', toggleChat);
    });

    // Event listeners para sugestões do chat
    const chatSuggestionBtns = document.querySelectorAll('.chat-suggestion-btn');
    chatSuggestionBtns.forEach(btn => {
        const topic = btn.getAttribute('data-topic');
        btn.addEventListener('click', () => chatQuestion(topic));
        addHoverEffect(btn);
    });

    // Event listener para o input do chat
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', handleChatKeyPress);
        chatInput.addEventListener('focus', function() {
            this.style.borderColor = '#4caf50';
            this.style.background = 'white';
            
            // Detectar dispositivos móveis e ajustar chat quando teclado abre
            if (window.innerWidth <= 600) {
                handleMobileKeyboard(true);
            }
        });
        chatInput.addEventListener('blur', function() {
            this.style.borderColor = '#e0e0e0';
            this.style.background = '#f8f9fa';
            
            // Restaurar posição normal do chat
            if (window.innerWidth <= 600) {
                handleMobileKeyboard(false);
            }
        });
    }

    // Event listener para o botão de enviar mensagem
    const sendBtn = document.getElementById('chat-send-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendChatMessage);
        addHoverEffect(sendBtn, 'scale(1.1)');
    }

    // Event listener para botão voltar ao topo
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
        backToTopBtn.addEventListener('mouseover', function() {
            this.style.background = 'linear-gradient(135deg, #ffe082, #ffecb3)';
            this.style.transform = 'scale(1.1)';
        });
        backToTopBtn.addEventListener('mouseout', function() {
            this.style.background = 'linear-gradient(135deg, #fbc02d, #ffe082)';
            this.style.transform = 'scale(1)';
        });
    }

    // Event listeners para navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            this.style.background = '#fbc02d';
            this.style.color = 'white';
        });
        link.addEventListener('mouseout', function() {
            this.style.background = 'transparent';
            this.style.color = '#795548';
        });
    });

    // Event listeners para botões do manual de trânsito
    const manualBtn = document.getElementById('manual-transito-btn');
    if (manualBtn) {
        manualBtn.addEventListener('click', abrirManual);
    }

    // Event listeners para scroll de vídeos
    const scrollLeftBtn = document.getElementById('scroll-left');
    if (scrollLeftBtn) {
        scrollLeftBtn.addEventListener('click', () => scrollVideos('left'));
    }

    const scrollRightBtn = document.getElementById('scroll-right');
    if (scrollRightBtn) {
        scrollRightBtn.addEventListener('click', () => scrollVideos('right'));
    }

    // Event listener para scroll dos vídeos para atualizar indicador
    const videosContainer = document.getElementById('videos-container');
    if (videosContainer) {
        videosContainer.addEventListener('scroll', updateScrollIndicator);
    }

    // Event listeners para quiz
    initializeQuizEventListeners();

    // Event listeners para simulador
    initializeSimuladorEventListeners();

    // Event listeners para calculadora de multas
    const calcMultaBtn = document.getElementById('calcular-multa-btn');
    if (calcMultaBtn) {
        calcMultaBtn.addEventListener('click', calcularMulta);
        calcMultaBtn.addEventListener('mouseover', function() {
            this.style.background = '#d32f2f';
        });
        calcMultaBtn.addEventListener('mouseout', function() {
            this.style.background = '#f44336';
        });
    }

    // Event listeners para dicas (hover effects)
    const dicasCards = document.querySelectorAll('#dicas [onmouseover]');
    dicasCards.forEach(card => {
        card.removeAttribute('onmouseover');
        card.removeAttribute('onmouseout');
        card.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        card.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Event listeners para botões "Em Breve" dos vídeos
    const emBreveButtons = document.querySelectorAll('.em-breve-btn');
    emBreveButtons.forEach(btn => {
        btn.addEventListener('mouseover', function() {
            this.style.background = '#45a049';
        });
        btn.addEventListener('mouseout', function() {
            this.style.background = '#4caf50';
        });
    });

    // Event listener para botão de play do vídeo
    const playVideoBtn = document.querySelector('.play-video-btn');
    if (playVideoBtn) {
        const videoCard = playVideoBtn.closest('.video-card');
        const video = videoCard?.querySelector('video');
        
        if (video) {
            // Event listener para quando o vídeo terminar
            video.addEventListener('ended', function() {
                playVideoBtn.innerHTML = '▶️ Assistir Vídeo';
                playVideoBtn.style.background = '#ff4444';
            });
            
            // Event listener para quando o vídeo for pausado
            video.addEventListener('pause', function() {
                playVideoBtn.innerHTML = '▶️ Assistir Vídeo';
                playVideoBtn.style.background = '#ff4444';
            });
            
            // Event listener para quando o vídeo for reproduzido
            video.addEventListener('play', function() {
                playVideoBtn.innerHTML = '⏸️ Pausar Vídeo';
                playVideoBtn.style.background = '#ff6666';
            });
        }
        
        playVideoBtn.addEventListener('click', function() {
            const video = videoCard?.querySelector('video');
            if (video) {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });
        
        // Hover effects para o botão de play
        playVideoBtn.addEventListener('mouseover', function() {
            if (this.innerHTML.includes('▶️')) {
                this.style.background = '#ff6666';
            } else {
                this.style.background = '#ff8888';
            }
        });
        playVideoBtn.addEventListener('mouseout', function() {
            if (this.innerHTML.includes('▶️')) {
                this.style.background = '#ff4444';
            } else {
                this.style.background = '#ff6666';
            }
        });
    }

    // Mostrar/esconder botão voltar ao topo baseado no scroll
    window.addEventListener('scroll', function() {
        if (backToTopBtn) {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        }
    });
}

// Função auxiliar para adicionar efeitos de hover
function addHoverEffect(element, transform = 'scale(1.05)') {
    element.addEventListener('mouseover', function() {
        this.style.transform = transform;
    });
    element.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
}

// Função para inicializar event listeners do quiz
function initializeQuizEventListeners() {
    // Quiz buttons
    const quizButtons = document.querySelectorAll('.quiz-btn');
    quizButtons.forEach(btn => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        const questionNum = parseInt(btn.getAttribute('data-question'));
        
        btn.addEventListener('click', function() {
            checkAnswer(this, isCorrect, questionNum);
        });
    });

    // Restart quiz button
    const restartBtn = document.getElementById('restart-quiz-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartQuiz);
    }
}

// Função para inicializar event listeners do simulador
function initializeSimuladorEventListeners() {
    const simularBtns = document.querySelectorAll('.sim-btn');
    simularBtns.forEach(btn => {
        const acao = btn.getAttribute('data-action');
        btn.addEventListener('click', function() {
            simularAcao(acao);
        });
    });
}

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

// Sistema de Chatbot Melhorado
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const isVisible = chatWindow.style.display === 'block';
    
    if (isVisible) {
        chatWindow.style.display = 'none';
        // Garantir que as classes sejam removidas ao fechar
        chatWindow.classList.remove('keyboard-open');
    } else {
        chatWindow.style.display = 'block';
        // Adicionar animação de entrada
        chatWindow.style.animation = 'fadeInUp 0.3s ease-out';
        
        // Focar no input após uma pequena pausa para animação
        setTimeout(() => {
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                chatInput.focus();
                
                // No celular, scroll para garantir que o chat está visível
                if (window.innerWidth <= 600) {
                    chatWindow.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            }
        }, 300);
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        input.value = '';
        
        // Mostrar indicador de digitação
        showTypingIndicator();
        
        // Simular resposta do bot após um delay
        setTimeout(() => {
            hideTypingIndicator();
            const response = getChatResponse(message);
            addChatMessage(response, 'bot');
        }, 1500);
    }
}

function chatQuestion(topic) {
    const questions = {
        velocidade: "Quais são os limites de velocidade nas vias urbanas?",
        multas: "Quanto custam as multas de trânsito mais comuns?",
        documentos: "Quais documentos devo portar ao dirigir?"
    };
    
    const question = questions[topic];
    if (question) {
        // Simular que o usuário digitou a pergunta
        document.getElementById('chat-input').value = question;
        sendChatMessage();
    }
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.style.cssText = `
        background: rgba(76, 175, 80, 0.1);
        padding: 15px;
        border-radius: 15px;
        margin-bottom: 15px;
        margin-right: 20px;
        border-left: 4px solid #4caf50;
        display: flex;
        align-items: center;
        animation: pulse 1s infinite;
    `;
    
    typingDiv.innerHTML = `
        <span style="font-size: 1.2rem; margin-right: 10px;">🤖</span>
        <div style="display: flex; gap: 4px;">
            <div style="width: 8px; height: 8px; background: #4caf50; border-radius: 50%; animation: typing 1.4s infinite;"></div>
            <div style="width: 8px; height: 8px; background: #4caf50; border-radius: 50%; animation: typing 1.4s infinite 0.2s;"></div>
            <div style="width: 8px; height: 8px; background: #4caf50; border-radius: 50%; animation: typing 1.4s infinite 0.4s;"></div>
        </div>
        <span style="margin-left: 10px; color: #4caf50; font-size: 0.9rem;">Digitando...</span>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    
    if (sender === 'user') {
        messageDiv.style.cssText = `
            background: linear-gradient(135deg, #2196f3, #64b5f6);
            color: white;
            padding: 12px 16px;
            border-radius: 20px 20px 5px 20px;
            margin-bottom: 15px;
            margin-left: 40px;
            text-align: right;
            box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
            font-size: 0.95rem;
            line-height: 1.4;
            animation: slideInRight 0.3s ease-out;
        `;
    } else {
        messageDiv.style.cssText = `
            background: white;
            padding: 15px;
            border-radius: 20px 20px 20px 5px;
            margin-bottom: 15px;
            margin-right: 40px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-left: 4px solid #4caf50;
            font-size: 0.95rem;
            line-height: 1.5;
            animation: slideInLeft 0.3s ease-out;
        `;
        
        // Adicionar ícone do bot
        const botIcon = document.createElement('div');
        botIcon.style.cssText = `
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            font-weight: 600;
            color: #4caf50;
        `;
        botIcon.innerHTML = '<span style="font-size: 1.2rem; margin-right: 8px;">🤖</span>Assistente IA';
        messageDiv.appendChild(botIcon);
    }
    
    const textDiv = document.createElement('div');
    textDiv.innerHTML = message.replace(/\n/g, '<br>');
    messageDiv.appendChild(textDiv);
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getChatResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Respostas específicas melhoradas
    if (lowerMessage.includes('velocidade') || lowerMessage.includes('limite')) {
        return `🚗 <strong>Limites de Velocidade no Brasil:</strong><br><br>
        • <strong>Vias urbanas arteriais:</strong> 60 km/h<br>
        • <strong>Vias urbanas coletoras:</strong> 40 km/h<br>
        • <strong>Vias urbanas locais:</strong> 30 km/h<br>
        • <strong>Rodovias de pista dupla:</strong> 110 km/h<br>
        • <strong>Rodovias de pista simples:</strong> 100 km/h<br>
        • <strong>Autoestradas:</strong> 120 km/h<br><br>
        ⚠️ <em>Sempre observe a sinalização local!</em>`;
        
    } else if (lowerMessage.includes('multa') || lowerMessage.includes('excesso')) {
        return `💰 <strong>Valores de Multas Atualizados:</strong><br><br>
        • <strong>Excesso até 20%:</strong> R$ 130,16 (4 pontos)<br>
        • <strong>Excesso 20% a 50%:</strong> R$ 195,23 (5 pontos)<br>
        • <strong>Excesso acima 50%:</strong> R$ 880,41 (7 pontos)<br>
        • <strong>Celular ao volante:</strong> R$ 293,47 (7 pontos)<br>
        • <strong>Álcool:</strong> R$ 2.934,70 (suspensão CNH)<br>
        • <strong>Sem cinto:</strong> R$ 195,23 (5 pontos)<br><br>
        📱 <em>Precisa calcular uma multa específica? Use nossa calculadora no site!</em>`;
        
    } else if (lowerMessage.includes('documento') || lowerMessage.includes('cnh') || lowerMessage.includes('crlv')) {
        return `📋 <strong>Documentos Obrigatórios:</strong><br><br>
        • <strong>CNH</strong> (Carteira Nacional de Habilitação)<br>
        • <strong>CRLV</strong> (Certificado de Registro e Licenciamento)<br>
        • <strong>Documento de identidade</strong> (RG ou equivalente)<br><br>
        📱 <strong>CNH Digital:</strong> Aceita em todo território nacional<br>
        🔒 <strong>Dica:</strong> Mantenha sempre os documentos atualizados e dentro da validade!`;
        
    } else if (lowerMessage.includes('cinto')) {
        return `🔒 <strong>Cinto de Segurança - Lei Obrigatória:</strong><br><br>
        • <strong>Obrigatório</strong> para todos os ocupantes<br>
        • <strong>Multa:</strong> R$ 195,23 (infração grave)<br>
        • <strong>Pontos:</strong> 5 pontos na CNH<br><br>
        ⚡ <strong>Importante:</strong> O cinto reduz em 45% o risco de morte em acidentes!`;
        
    } else if (lowerMessage.includes('celular') || lowerMessage.includes('telefone')) {
        return `📱 <strong>Celular ao Volante - PROIBIDO:</strong><br><br>
        • <strong>Multa:</strong> R$ 293,47 (infração gravíssima)<br>
        • <strong>Pontos:</strong> 7 pontos na CNH<br>
        • <strong>Suspensão:</strong> Direito de dirigir suspenso<br><br>
        🎧 <strong>Alternativa:</strong> Use viva-voz ou Bluetooth!`;
        
    } else if (lowerMessage.includes('álcool') || lowerMessage.includes('bebida') || lowerMessage.includes('bafômetro')) {
        return `🚫 <strong>Lei Seca - Tolerância Zero:</strong><br><br>
        • <strong>Multa:</strong> R$ 2.934,70<br>
        • <strong>Suspensão:</strong> CNH por 12 meses<br>
        • <strong>Apreensão:</strong> Veículo retido<br>
        • <strong>Prisão:</strong> Possível detenção<br><br>
        🚖 <strong>Use:</strong> Uber, táxi ou transporte público!`;
        
    } else if (lowerMessage.includes('sinal') || lowerMessage.includes('semáforo') || lowerMessage.includes('vermelho')) {
        return `🚦 <strong>Semáforos e Sinalizações:</strong><br><br>
        • <strong>Vermelho:</strong> PARE obrigatório<br>
        • <strong>Amarelo:</strong> Atenção, prepare para parar<br>
        • <strong>Verde:</strong> Siga com atenção<br><br>
        ⚠️ <strong>Avançar sinal vermelho:</strong> R$ 880,41 + 7 pontos!`;
        
    } else if (lowerMessage.includes('pedestre') || lowerMessage.includes('faixa')) {
        return `🚶‍♂️ <strong>Prioridade do Pedestre:</strong><br><br>
        • <strong>Faixa de pedestres:</strong> Sempre dê preferência<br>
        • <strong>Multa por não dar preferência:</strong> R$ 293,47<br>
        • <strong>Pontos:</strong> 7 pontos na CNH<br><br>
        ❤️ <strong>Lembre-se:</strong> Vida humana não tem preço!`;
        
    } else if (lowerMessage.includes('estacionamento') || lowerMessage.includes('estacionar')) {
        return `🅿️ <strong>Regras de Estacionamento:</strong><br><br>
        • <strong>Fila dupla:</strong> R$ 195,23<br>
        • <strong>Vaga de deficiente:</strong> R$ 293,47<br>
        • <strong>Local proibido:</strong> R$ 195,23<br><br>
        📍 <strong>Sempre:</strong> Respeite as sinalizações!`;
        
    } else if (lowerMessage.includes('criança') || lowerMessage.includes('cadeirinha')) {
        return `👶 <strong>Transporte de Crianças:</strong><br><br>
        • <strong>Até 10 anos:</strong> Banco traseiro obrigatório<br>
        • <strong>Cadeirinha apropriada:</strong> Conforme idade/peso<br>
        • <strong>Multa:</strong> R$ 293,47 (infração gravíssima)<br><br>
        🛡️ <strong>Segurança</strong> das crianças em primeiro lugar!`;
        
    } else if (lowerMessage.includes('oi') || lowerMessage.includes('olá') || lowerMessage.includes('bom dia') || lowerMessage.includes('boa tarde') || lowerMessage.includes('boa noite')) {
        return `👋 <strong>Olá! Seja bem-vindo!</strong><br><br>
        Sou seu assistente inteligente de trânsito. Posso ajudar com:<br><br>
        🚗 Regras de trânsito<br>
        💰 Valores de multas<br>
        📋 Documentação obrigatória<br>
        🛡️ Dicas de segurança<br><br>
        💡 <strong>Dica:</strong> Use os botões de sugestão ou digite sua dúvida!`;
        
    } else {
        return `🤔 <strong>Desculpe, não entendi sua pergunta.</strong><br><br>
        Posso ajudar com temas relacionados a:<br><br>
        • Limites de velocidade<br>
        • Valores de multas<br>
        • Documentos obrigatórios<br>
        • Regras de trânsito<br>
        • Segurança no trânsito<br><br>
        💡 <strong>Tente reformular</strong> sua pergunta ou use os botões de sugestão!`;
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

// === FUNÇÕES AUXILIARES ===

// Função para abrir o manual de trânsito
function abrirManual() {
    window.open('docs/manual-transito-2022.pdf', '_blank');
}

// Função para enviar questão do chat (botões de sugestão)
function chatQuestion(topic) {
    const chatInput = document.getElementById('chat-input');
    const topics = {
        'velocidade': 'Quais são os limites de velocidade?',
        'multas': 'Como funcionam as multas de trânsito?',
        'documentos': 'Quais documentos são obrigatórios no veículo?'
    };
    
    if (chatInput && topics[topic]) {
        chatInput.value = topics[topic];
        sendChatMessage();
    }
}

// Função para lidar com tecla Enter no chat
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Função para scroll suave ao topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Função para lidar com o teclado virtual no celular
function handleMobileKeyboard(isOpen) {
    const chatWindow = document.getElementById('chat-window');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatWindow) return;
    
    console.log('Mobile keyboard:', isOpen ? 'opened' : 'closed'); // Debug temporário
    
    if (isOpen) {
        // Teclado aberto - ajustar posição
        chatWindow.classList.add('keyboard-open');
        chatWindow.style.height = 'calc(100vh - 320px)';
        chatWindow.style.top = '10px';
        chatWindow.style.bottom = 'auto';
        
        if (chatMessages) {
            chatMessages.style.height = 'calc(100vh - 480px)';
        }
        
        // Scroll para o final das mensagens
        setTimeout(() => {
            if (chatMessages) {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }, 100);
        
    } else {
        // Teclado fechado - restaurar posição
        chatWindow.classList.remove('keyboard-open');
        chatWindow.style.height = '';
        chatWindow.style.top = '';
        chatWindow.style.bottom = '';
        
        if (chatMessages) {
            chatMessages.style.height = '';
        }
    }
}

// Melhorar detecção de mudança de viewport para dispositivos móveis
let initialViewportHeight = window.innerHeight;

window.addEventListener('resize', function() {
    // Detectar se é provável que o teclado tenha aberto/fechado
    const currentHeight = window.innerHeight;
    const heightDifference = initialViewportHeight - currentHeight;
    const chatInput = document.getElementById('chat-input');
    
    if (window.innerWidth <= 600 && chatInput && document.activeElement === chatInput) {
        if (heightDifference > 150) {
            // Provável que o teclado esteja aberto
            handleMobileKeyboard(true);
        } else if (heightDifference < 50) {
            // Provável que o teclado tenha fechado
            handleMobileKeyboard(false);
        }
    }
});

// Melhorias específicas para mobile
function initMobileOptimizations() {
    // Otimizar scroll suave em dispositivos móveis
    if (isMobile()) {
        // Aplicar scroll suave nativo
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Otimizar performance de scroll
        const videosContainer = document.getElementById('videos-container');
        if (videosContainer) {
            videosContainer.style.webkitOverflowScrolling = 'touch';
            videosContainer.style.overflowScrolling = 'touch';
        }
        
        // Melhorar responsividade dos botões de navegação
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
            button.style.touchAction = 'manipulation';
            button.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.style.transform = 'translateY(-50%) scale(0.9)';
            });
            button.addEventListener('touchend', function() {
                this.style.transform = 'translateY(-50%) scale(1)';
            });
        });
        
        // Ajustar tamanho dos cards baseado na largura da tela
        const videoCards = document.querySelectorAll('.video-card');
        const screenWidth = window.innerWidth;
        
        videoCards.forEach(card => {
            if (screenWidth <= 360) {
                card.style.minWidth = '250px';
            } else if (screenWidth <= 480) {
                card.style.minWidth = '280px';
            }
        });
        
        // Otimizar vídeo para mobile
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.preload = 'metadata';
        });
        
        // Ajustar chat para mobile
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow) {
            // Prevenir scroll do body quando chat está aberto
            const chatToggle = document.getElementById('chat-toggle');
            if (chatToggle) {
                chatToggle.addEventListener('click', function() {
                    setTimeout(() => {
                        const isOpen = chatWindow.style.display !== 'none';
                        if (isOpen) {
                            document.body.style.overflow = 'hidden';
                        } else {
                            document.body.style.overflow = 'auto';
                        }
                    }, 100);
                });
            }
        }
        
        // Ajustar altura de seções para mobile
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.marginBottom = '20px';
        });
    }
}

// Inicializar otimizações móveis quando página carregar
document.addEventListener('DOMContentLoaded', function() {
    initMobileOptimizations();
});

// Reinicializar em mudanças de orientação
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        initMobileOptimizations();
        updateScrollIndicator();
        updateNavigationButtons();
    }, 500);
});

// Função para melhorar performance em dispositivos móveis
function optimizeForMobile() {
    if (isMobile()) {
        // Reduzir efeitos de animação para melhor performance
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = `
            @media (max-width: 768px) {
                * {
                    animation-duration: 0.2s !important;
                    transition-duration: 0.2s !important;
                }
                
                .bg-animado * {
                    animation: none !important;
                }
                
                video {
                    will-change: auto !important;
                }
                
                .video-card:hover {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Executar otimizações
optimizeForMobile();
