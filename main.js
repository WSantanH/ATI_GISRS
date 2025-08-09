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

// Função para inicializar todos os event listeners
function initializeEventListeners() {
    console.log('Inicializando event listeners...');
    
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

// Sistema de Quiz Dinâmico
const quizDatabase = {
    basico: [
        {
            question: "Qual a velocidade máxima permitida em vias urbanas?",
            options: ["80 km/h", "60 km/h", "40 km/h"],
            correct: 1,
            explanation: "Em vias urbanas, a velocidade máxima é 60 km/h, conforme o Código de Trânsito Brasileiro."
        },
        {
            question: "O que fazer ao se aproximar de um semáforo amarelo?",
            options: ["Acelerar para passar", "Parar com segurança", "Manter a velocidade"],
            correct: 1,
            explanation: "O sinal amarelo indica atenção e que o condutor deve parar o veículo, salvo se não puder fazê-lo com segurança."
        },
        {
            question: "Distância segura do veículo da frente:",
            options: ["1 segundo", "3 segundos", "5 segundos"],
            correct: 1,
            explanation: "A regra dos 3 segundos é uma técnica segura para manter distância adequada do veículo à frente."
        },
        {
            question: "Quando é obrigatório usar farol baixo durante o dia?",
            options: ["Sempre", "Apenas à noite", "Em rodovias e túneis"],
            correct: 2,
            explanation: "O farol baixo é obrigatório em rodovias e túneis durante o dia para aumentar a visibilidade."
        },
        {
            question: "Qual documento é obrigatório para conduzir veículo?",
            options: ["Apenas CNH", "CNH e CRLV", "Apenas CRLV"],
            correct: 1,
            explanation: "É obrigatório portar CNH (Carteira Nacional de Habilitação) e CRLV (Certificado de Registro)."
        },
        {
            question: "Em que situação é permitido estacionar em fila dupla?",
            options: ["Emergência médica", "Compras rápidas", "Nunca é permitido"],
            correct: 2,
            explanation: "Estacionar em fila dupla é sempre proibido, mesmo em situações de emergência."
        }
    ],
    sinalizacao: [
        {
            question: "O que significa uma placa triangular vermelha?",
            options: ["Proibição", "Advertência", "Indicação"],
            correct: 1,
            explanation: "Placas triangulares vermelhas são de advertência, alertando sobre perigos na via."
        },
        {
            question: "Semáforo amarelo intermitente indica:",
            options: ["Pare obrigatoriamente", "Atenção, prossiga com cuidado", "Acelere"],
            correct: 1,
            explanation: "Amarelo intermitente significa atenção redobrada, mas permite prosseguir com cautela."
        },
        {
            question: "Faixa contínua amarela no centro da via:",
            options: ["Permite ultrapassagem", "Proíbe ultrapassagem", "Indica preferência"],
            correct: 1,
            explanation: "Linha contínua amarela proíbe ultrapassagem por representar perigo."
        },
        {
            question: "Placa azul circular indica:",
            options: ["Proibição", "Obrigatoriedade", "Advertência"],
            correct: 1,
            explanation: "Placas azuis circulares indicam regulamentação de obrigatoriedade."
        },
        {
            question: "Sinalização horizontal zebrada indica:",
            options: ["Estacionamento", "Área de conflito", "Faixa de pedestres"],
            correct: 1,
            explanation: "Zebrado indica área de conflito onde não se deve permanecer ou estacionar."
        },
        {
            question: "Cone de sinalização laranja indica:",
            options: ["Obra na via", "Acidente", "Fiscalização"],
            correct: 0,
            explanation: "Cones laranjas são usados principalmente para sinalizar obras e interdições temporárias."
        }
    ],
    multas: [
        {
            question: "Dirigir sem CNH é infração:",
            options: ["Leve", "Grave", "Gravíssima"],
            correct: 2,
            explanation: "Dirigir sem CNH é infração gravíssima, com multa e apreensão do veículo."
        },
        {
            question: "Valor da multa por excesso de velocidade até 20%:",
            options: ["R$ 130,16", "R$ 195,23", "R$ 293,47"],
            correct: 0,
            explanation: "Excesso de velocidade até 20% é infração média, com multa de R$ 130,16."
        },
        {
            question: "Estacionar em vaga de deficiente gera multa de:",
            options: ["R$ 195,23", "R$ 293,47", "R$ 880,41"],
            correct: 2,
            explanation: "É infração gravíssima com multa de R$ 880,41 e pode haver apreensão do veículo."
        },
        {
            question: "Usar celular ao volante resulta em:",
            options: ["4 pontos na CNH", "5 pontos na CNH", "7 pontos na CNH"],
            correct: 2,
            explanation: "Usar celular ao volante é infração gravíssima com 7 pontos na CNH."
        },
        {
            question: "Dirigir sob efeito de álcool pode resultar em:",
            options: ["Multa apenas", "Multa e suspensão", "Prisão"],
            correct: 2,
            explanation: "Dirigir alcoolizado pode resultar em prisão, além de multa e suspensão da CNH."
        },
        {
            question: "Não usar cinto de segurança é infração:",
            options: ["Média", "Grave", "Gravíssima"],
            correct: 1,
            explanation: "Não usar cinto é infração grave com multa de R$ 195,23 e 5 pontos na CNH."
        }
    ],
    seguranca: [
        {
            question: "Em caso de aquaplanagem, o condutor deve:",
            options: ["Frear bruscamente", "Manter direção firme e levantar o pé do acelerador", "Acelerar"],
            correct: 1,
            explanation: "Em aquaplanagem, mantenha a direção firme e retire o pé do acelerador gradualmente."
        },
        {
            question: "Distância de frenagem em pista molhada:",
            options: ["Diminui", "Mantém igual", "Aumenta"],
            correct: 2,
            explanation: "Em pista molhada, a distância de frenagem pode aumentar até 3 vezes."
        },
        {
            question: "Quando usar pisca-alerta?",
            options: ["Em paradas de emergência", "Em chuva forte", "Sempre"],
            correct: 0,
            explanation: "Pisca-alerta deve ser usado em paradas de emergência ou quando o veículo representa perigo."
        },
        {
            question: "Criança de 8 anos deve usar:",
            options: ["Cinto comum", "Assento de elevação", "Cadeirinha"],
            correct: 1,
            explanation: "Crianças de 4 a 10 anos devem usar assento de elevação com cinto de segurança."
        },
        {
            question: "Ao sair de uma garagem, você deve:",
            options: ["Dar preferência aos pedestres", "Acelerar rapidamente", "Buzinar"],
            correct: 0,
            explanation: "Sempre dê preferência aos pedestres na calçada ao sair de garagens."
        },
        {
            question: "Em neblina, você deve:",
            options: ["Usar farol alto", "Usar farol baixo", "Não usar farol"],
            correct: 1,
            explanation: "Em neblina, use farol baixo. O farol alto pode criar reflexo e piorar a visibilidade."
        }
    ],
    avancado: [
        {
            question: "Curva de raio decrescente exige:",
            options: ["Acelerar na entrada", "Frear progressivamente", "Manter velocidade"],
            correct: 1,
            explanation: "Em curvas de raio decrescente, freie progressivamente antes e durante a curva."
        },
        {
            question: "Coeficiente de aderência em pista seca:",
            options: ["0,4 a 0,6", "0,7 a 0,9", "1,0 a 1,2"],
            correct: 1,
            explanation: "O coeficiente de aderência em asfalto seco varia entre 0,7 e 0,9."
        },
        {
            question: "Técnica de frenagem threshold significa:",
            options: ["Frear até o limite de travamento", "Frear gradualmente", "Frear em curva"],
            correct: 0,
            explanation: "Threshold é frear no limite máximo sem travar as rodas, obtendo máxima eficiência."
        },
        {
            question: "Em descidas longas, você deve:",
            options: ["Usar freio motor", "Freiar constantemente", "Acelerar"],
            correct: 0,
            explanation: "Use freio motor em descidas para evitar superaquecimento dos freios."
        },
        {
            question: "Ponto cego mais perigoso em caminhões está:",
            options: ["Atrás", "Do lado direito", "Do lado esquerdo"],
            correct: 1,
            explanation: "O ponto cego do lado direito é o mais perigoso em caminhões devido ao ângulo morto."
        },
        {
            question: "Transferência de peso em frenagem ocorre:",
            options: ["Para trás", "Para frente", "Para os lados"],
            correct: 1,
            explanation: "Na frenagem, o peso transfere para frente, sobrecarregando o eixo dianteiro."
        }
    ]
};

let currentQuizCategory = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let quizScore = 0;
let isQuizActive = false;

function initializeQuizEventListeners() {
    // Category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            startQuiz(category);
        });
    });
    
    // Restart buttons
    const restartBtn = document.getElementById('restart-quiz-btn');
    const newCategoryBtn = document.getElementById('new-category-btn');
    const randomBtn = document.getElementById('random-questions-btn');
    
    if (restartBtn) {
        restartBtn.addEventListener('click', () => restartQuiz(currentQuizCategory));
    }
    
    if (newCategoryBtn) {
        newCategoryBtn.addEventListener('click', () => {
            document.getElementById('category-selector').style.display = 'block';
            document.getElementById('quiz-container').style.display = 'none';
            document.getElementById('quiz-info').style.display = 'none';
            document.getElementById('quiz-result').style.display = 'none';
            isQuizActive = false;
        });
    }
    
    if (randomBtn) {
        randomBtn.addEventListener('click', () => startRandomQuiz());
    }
}

function startQuiz(category) {
    currentQuizCategory = category;
    currentQuestions = getRandomQuestions(category, 3);
    currentQuestionIndex = 0;
    quizScore = 0;
    isQuizActive = true;
    
    // Hide category selector and show quiz
    document.getElementById('category-selector').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-info').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    
    // Update category display
    const categoryNames = {
        basico: 'Básico',
        sinalizacao: 'Sinalização',
        multas: 'Multas e Infrações',
        seguranca: 'Segurança',
        avancado: 'Avançado'
    };
    
    document.getElementById('current-category').textContent = categoryNames[category];
    document.getElementById('total-questions').textContent = currentQuestions.length;
    document.getElementById('total-questions-display').textContent = currentQuestions.length;
    
    // Reset scores
    document.getElementById('points').textContent = '0';
    document.getElementById('current-question').textContent = '1';
    
    // Show first question
    displayCurrentQuestion();
}

function startRandomQuiz() {
    const allCategories = Object.keys(quizDatabase);
    const randomQuestions = [];
    
    // Get one question from each category
    allCategories.forEach(category => {
        const categoryQuestions = quizDatabase[category];
        const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
        randomQuestions.push({...categoryQuestions[randomIndex], category});
    });
    
    // Shuffle the questions
    currentQuestions = randomQuestions.sort(() => Math.random() - 0.5).slice(0, 3);
    currentQuizCategory = 'misto';
    currentQuestionIndex = 0;
    quizScore = 0;
    isQuizActive = true;
    
    // Update UI
    document.getElementById('category-selector').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-info').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    
    document.getElementById('current-category').textContent = 'Questões Mistas';
    document.getElementById('total-questions').textContent = currentQuestions.length;
    document.getElementById('total-questions-display').textContent = currentQuestions.length;
    
    document.getElementById('points').textContent = '0';
    document.getElementById('current-question').textContent = '1';
    
    displayCurrentQuestion();
}

function getRandomQuestions(category, count) {
    const questions = [...quizDatabase[category]];
    const shuffled = questions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function displayCurrentQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const container = document.getElementById('current-question-container');
    
    container.innerHTML = `
        <h4 style="color: #795548; margin-bottom: 15px; font-size: 1.2rem;">
            ${currentQuestionIndex + 1}. ${question.question}
        </h4>
        <div style="display: grid; gap: 12px; margin-top: 20px;">
            ${question.options.map((option, index) => `
                <button class="quiz-option-btn" 
                        data-index="${index}" 
                        style="background: #fff; border: 2px solid #ddd; padding: 15px; border-radius: 8px; cursor: pointer; transition: all 0.3s; text-align: left; font-size: 1rem;">
                    ${String.fromCharCode(65 + index)}) ${option}
                </button>
            `).join('')}
        </div>
        <div id="question-explanation" style="display: none; margin-top: 20px; padding: 15px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 5px;">
            <strong>Explicação:</strong> <span id="explanation-text"></span>
        </div>
    `;
    
    // Add click listeners to option buttons
    const optionButtons = container.querySelectorAll('.quiz-option-btn');
    optionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            handleQuizAnswer(parseInt(btn.dataset.index));
        });
    });
}

function handleQuizAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    const optionButtons = document.querySelectorAll('.quiz-option-btn');
    
    // Disable all buttons
    optionButtons.forEach(btn => btn.style.pointerEvents = 'none');
    
    // Style the selected answer
    optionButtons[selectedIndex].style.background = isCorrect ? '#4caf50' : '#f44336';
    optionButtons[selectedIndex].style.color = 'white';
    optionButtons[selectedIndex].style.borderColor = isCorrect ? '#4caf50' : '#f44336';
    
    // Highlight correct answer if wrong was selected
    if (!isCorrect) {
        optionButtons[question.correct].style.background = '#4caf50';
        optionButtons[question.correct].style.color = 'white';
        optionButtons[question.correct].style.borderColor = '#4caf50';
    }
    
    // Update score
    if (isCorrect) {
        quizScore++;
        showNotification('✅ Resposta correta!');
    } else {
        showNotification('❌ Resposta incorreta!');
    }
    
    // Show explanation
    const explanationDiv = document.getElementById('question-explanation');
    const explanationText = document.getElementById('explanation-text');
    explanationText.textContent = question.explanation;
    explanationDiv.style.display = 'block';
    
    // Update score display
    document.getElementById('points').textContent = quizScore;
    
    // Continue to next question or finish quiz
    setTimeout(() => {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            document.getElementById('current-question').textContent = currentQuestionIndex + 1;
            displayCurrentQuestion();
        } else {
            finishQuiz();
        }
    }, 3000);
}

function finishQuiz() {
    const resultDiv = document.getElementById('quiz-result');
    const titleElement = document.getElementById('result-title');
    const messageElement = document.getElementById('result-message');
    
    // Hide quiz container and show result
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-info').style.display = 'none';
    resultDiv.style.display = 'block';
    
    const percentage = Math.round((quizScore / currentQuestions.length) * 100);
    
    if (percentage === 100) {
        titleElement.textContent = '🏆 Perfeito!';
        titleElement.style.color = '#4caf50';
        messageElement.textContent = `Parabéns! Você acertou todas as ${currentQuestions.length} perguntas (${percentage}%)! Excelente conhecimento sobre trânsito!`;
        resultDiv.style.background = '#e8f5e8';
        unlockBadge('quiz');
    } else if (percentage >= 70) {
        titleElement.textContent = '👍 Muito Bom!';
        titleElement.style.color = '#ff9800';
        messageElement.textContent = `Ótimo resultado! Você acertou ${quizScore} de ${currentQuestions.length} perguntas (${percentage}%). Continue estudando!`;
        resultDiv.style.background = '#fff3e0';
    } else if (percentage >= 50) {
        titleElement.textContent = '📖 Pode Melhorar!';
        titleElement.style.color = '#ff5722';
        messageElement.textContent = `Você acertou ${quizScore} de ${currentQuestions.length} perguntas (${percentage}%). Que tal estudar mais e tentar novamente?`;
        resultDiv.style.background = '#fce4ec';
    } else {
        titleElement.textContent = '📚 Continue Estudando!';
        titleElement.style.color = '#f44336';
        messageElement.textContent = `Você acertou ${quizScore} de ${currentQuestions.length} perguntas (${percentage}%). É importante estudar mais sobre segurança no trânsito!`;
        resultDiv.style.background = '#ffebee';
    }
    
    // Save quiz completion
    const currentCompleted = parseInt(localStorage.getItem('quiz-completed') || '0');
    localStorage.setItem('quiz-completed', (currentCompleted + 1).toString());
    
    // Update progress
    updateProgress();
    isQuizActive = false;
}

function restartQuiz(category) {
    if (category === 'misto') {
        startRandomQuiz();
    } else {
        startQuiz(category);
    }
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
    
    if (!valor) {
        alert('Por favor, selecione uma infração!');
        return;
    }
    // Tratamento especial para opção de laudo
    if (valor === 'laudo') {
        // Exibe mensagem informativa em vez de valor
        resultadoDiv.innerHTML = `
            <h4 style="color: #795548; margin-bottom: 10px;">📋 Informação:</h4>
            <p style="color: #795548;">Quem tomou multa antes de comprar o laudo para primeira habilitação não prejudica o processo. As multas anteriores não impedem a emissão do laudo médico exigido pelo Detran.</p>
        `;
        resultadoDiv.style.display = 'block';
        showNotification('ℹ️ Informação exibida!');
    } else {
        // Exibe valor da multa normalmente
        valorDiv.textContent = `R$ ${valor}`;
        // Restaura estrutura padrão, caso tenha sido alterada
        const header = resultadoDiv.querySelector('h4');
        if (header) header.textContent = 'Valor da Multa:';
        resultadoDiv.style.display = 'block';
        showNotification('💰 Multa calculada!');
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

// Event listener para o scroll do container de vídeos - Será chamado na inicialização principal
function initializeVideoScrollEvents() {
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
}

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

// === INICIALIZAÇÃO PRINCIPAL ===
// Todas as inicializações consolidadas em um só lugar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando IntegraEdu...');
    
    // Remover tela de loading
    setTimeout(removeLoadingScreen, 1500);
    
    // Inicializar todos os event listeners
    initializeEventListeners();
    
    // Inicializar otimizações para mobile
    optimizeTouchEvents();
    preventIOSZoom();
    initMobileOptimizations();
    
    // Inicializar eventos de scroll de vídeos
    initializeVideoScrollEvents();
    
    console.log('✅ IntegraEdu inicializado com sucesso!');
});

// Reinicializar em mudanças de orientação
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        initMobileOptimizations();
        updateScrollIndicator();
        updateNavigationButtons();
        
        // Reajustar chatbot se estiver aberto
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow && chatWindow.style.display === 'block') {
            adjustChatPosition(chatWindow);
        }
    }, 500);
});

// Listener para redimensionamento da janela
window.addEventListener('resize', function() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow && chatWindow.style.display === 'block') {
        adjustChatPosition(chatWindow);
    }
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

// Função para corrigir problemas específicos de mobile
function fixMobileIssues() {
    if (isMobile()) {
        // Corrigir overflow horizontal
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
        
        // Ajustar viewport dinâmicamente
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover');
        }
        
        // Corrigir altura do viewport em mobile (address bar)
        function fixVH() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        fixVH();
        window.addEventListener('resize', fixVH);
        window.addEventListener('orientationchange', () => {
            setTimeout(fixVH, 100);
        });
        
        // Otimizar scroll em mobile
        document.addEventListener('touchmove', function(e) {
            // Permitir scroll apenas vertical
            if (Math.abs(e.touches[0].clientX - e.touches[0].pageX) > Math.abs(e.touches[0].clientY - e.touches[0].pageY)) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Corrigir problemas de touch em elementos
        const touchElements = document.querySelectorAll('button, a, .clickable');
        touchElements.forEach(element => {
            element.style.cursor = 'pointer';
            element.style.touchAction = 'manipulation';
        });
        
        // Otimizar performance em mobile
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                // Service worker não disponível, continuar normalmente
            });
        }
        
        // Corrigir problemas com modal em mobile
        const modals = document.querySelectorAll('.modal, .popup');
        modals.forEach(modal => {
            modal.style.maxHeight = '90vh';
            modal.style.overflow = 'auto';
            modal.style.WebkitOverflowScrolling = 'touch';
        });
    }
}

// Função para aplicar correções específicas após carregamento
function applyMobileFixes() {
    // Garantir que todos os elementos respeitam a largura da tela
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        if (el.scrollWidth > window.innerWidth) {
            el.style.maxWidth = '100vw';
            el.style.overflowX = 'hidden';
        }
    });
    
    // Corrigir problemas com imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.objectFit = 'cover';
    });
    
    // Corrigir problemas com vídeos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.style.maxWidth = '100%';
        video.style.height = 'auto';
    });
}

// Executar otimizações
optimizeForMobile();
fixMobileIssues();

// Aplicar correções após carregamento completo
window.addEventListener('load', () => {
    applyMobileFixes();
    setTimeout(applyMobileFixes, 1000); // Aplicar novamente após 1 segundo
});

// Aplicar correções quando a orientação muda
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        applyMobileFixes();
        fixMobileIssues();
    }, 300);
});
