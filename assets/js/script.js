// ===================================================================
// script.js - Sistema Inteligente do Robô Fofoqueiro (VERSÃO CORRIGIDA)
// ===================================================================
// CORREÇÕES:
// 1. Boca com movimento realista que reage ao volume do som
// 2. Leitura de memes em voz alta (Text-to-Speech)
// 3. Animações de fala mais expressivas
// ===================================================================
// AUTORA: Gisele Nunes
// DATA: 2026
// VERSÃO: 3.1 - Boca Dançante e Voz Ativa
// ===================================================================

// ===== 1. CONFIGURAÇÕES INICIAIS E DOM =====
document.addEventListener('DOMContentLoaded', () => {
    inicializarSistema();
});

const DOM = {
    loadingOverlay: document.getElementById('loadingOverlay'),
    loaderProgress: document.getElementById('loaderProgress'),
    notificationContainer: document.getElementById('notificationContainer'),
    totalMedicoes: document.getElementById('totalMedicoes'),
    picoMaximo: document.getElementById('picoMaximo'),
    totalAlertas: document.getElementById('totalAlertas'),
    totalFofocas: document.getElementById('totalFofocas'),
    nivelRobo: document.getElementById('nivelRobo'),
    leftEye: document.getElementById('leftEye'),
    rightEye: document.getElementById('rightEye'),
    facialExpression: document.getElementById('facialExpression'),
    soundWave: document.getElementById('soundWave'),
    speechStatusText: document.querySelector('.speech-status .status-text'),
    currentDB: document.getElementById('currentDB'),
    alertStatus: document.getElementById('alertStatus'),
    ledStatus: document.getElementById('ledStatus'),
    screenBtns: document.querySelectorAll('.screen-btn'),
    graphView: document.getElementById('graphView'),
    heatmapView: document.getElementById('heatmapView'),
    logView: document.getElementById('logView'),
    screenTitle: document.getElementById('screenTitle'),
    iaMessageContainer: document.getElementById('iaMessageContainer'),
    iaTyping: document.getElementById('iaTyping'),
    measureBtn: document.getElementById('measureBtn'),
    voiceBtn: document.getElementById('voiceBtn'),
    memeBtn: document.getElementById('memeBtn'),
    autoModeBtn: document.getElementById('autoModeBtn'),
    resetBtn: document.getElementById('resetBtn'),
    themeToggle: document.getElementById('themeToggle'),
    clearLogBtn: document.getElementById('clearLogBtn'),
    schoolMap: document.getElementById('schoolMap'),
    graphCanvas: document.getElementById('realTimeGraph'),
    achievementModal: document.getElementById('achievementModal'),
    achievementName: document.getElementById('achievementName')
};

let state = {
    medicoes: [],
    totalMedicoesCount: 0,
    picoMax: 0,
    totalAlertasCount: 0,
    fofocas: [],
    conquistas: {
        first_measure: false,
        alert_master: false,
        fofoqueiro: false,
        silence: false,
        inferno: false
    },
    alertasSequencia: 0,
    modoAutomatico: false,
    autoModeInterval: null,
    nivelExperiencia: 0,
    estaFalando: false  // NOVO: controla se o robô está falando
};

let ultimoDB = 45;
let animacaoBocaAtiva = false;  // NOVO: controle da animação da boca
let intervaloAnimacaoBoca = null;  // NOVO: intervalo da animação

// ===== 2. FUNÇÃO DE FALA DO ROBÔ (COM SÍNTESE DE VOZ) =====
/**
 * Faz o robô "falar" um texto com síntese de voz e animação da boca
 * @param {string} texto - Texto que o robô vai falar
 * @param {number} intensidade - Intensidade da animação da boca (0-1)
 */
async function falarRobo(texto, intensidade = 0.7) {
    if (!texto || texto.trim() === '') return;
    
    state.estaFalando = true;
    
    // INICIA ANIMAÇÃO DA BOCA BASEADA NA INTENSIDADE
    iniciarAnimacaoBoca(intensidade);
    
    // Atualiza status visual
    if (DOM.speechStatusText) {
        DOM.speechStatusText.innerText = "🔊 Robô está falando...";
    }
    
    // Adiciona a mensagem no chat da IA
    addIAMessage(texto, false);
    
    // TENTA USAR SÍNTESE DE VOZ (TTS) - AGORA FUNCIONA PARA MEMES TAMBÉM
    if ('speechSynthesis' in window) {
        try {
            // Cancela qualquer fala em andamento
            window.speechSynthesis.cancel();
            
            // Pequeno delay para garantir que o cancelamento foi processado
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'pt-BR';
            utterance.rate = 0.9;      // Velocidade da fala
            utterance.pitch = 1.1;     // Tom de voz mais divertido
            utterance.volume = 0.9;     // Volume
            
            // Carrega uma voz brasileira se disponível
            const vozes = await new Promise((resolve) => {
                const vozesDisponiveis = window.speechSynthesis.getVoices();
                resolve(vozesDisponiveis);
            });
            
            const vozBrasileira = vozes.find(voice => voice.lang === 'pt-BR' && voice.name.includes('Google'));
            if (vozBrasileira) utterance.voice = vozBrasileira;
            
            // Evento quando termina de falar
            utterance.onend = () => {
                state.estaFalando = false;
                pararAnimacaoBoca();
                if (DOM.speechStatusText) {
                    DOM.speechStatusText.innerText = "Pronto para ouvir";
                }
            };
            
            utterance.onerror = () => {
                state.estaFalando = false;
                pararAnimacaoBoca();
                if (DOM.speechStatusText) {
                    DOM.speechStatusText.innerText = "Pronto para ouvir";
                }
            };
            
            window.speechSynthesis.speak(utterance);
            
        } catch(e) {
            console.log("Erro no TTS:", e);
            // Fallback: mantém animação por um tempo e para
            setTimeout(() => {
                state.estaFalando = false;
                pararAnimacaoBoca();
                if (DOM.speechStatusText) {
                    DOM.speechStatusText.innerText = "Pronto para ouvir";
                }
            }, texto.length * 50);
        }
    } else {
        // Fallback sem TTS: animação visual apenas
        setTimeout(() => {
            state.estaFalando = false;
            pararAnimacaoBoca();
            if (DOM.speechStatusText) {
                DOM.speechStatusText.innerText = "Pronto para ouvir";
            }
        }, texto.length * 50);
    }
}

// ===== 3. ANIMAÇÃO DA BOCA (WAVE SONORA MAIS EXPRESSIVA) =====
/**
 * Inicia a animação da boca com ondas sonoras dinâmicas
 * @param {number} intensidade - Intensidade do movimento (0.3 a 1.5)
 */
function iniciarAnimacaoBoca(intensidade = 0.7) {
    if (animacaoBocaAtiva) return;
    animacaoBocaAtiva = true;
    
    // Pega todas as linhas de onda
    const waveLines = document.querySelectorAll('.wave-line');
    if (waveLines.length === 0) return;
    
    // Intensidade base (quanto maior o dB, mais agitada a boca)
    const intensidadeFinal = Math.min(1.5, Math.max(0.3, intensidade));
    
    let frame = 0;
    if (intervaloAnimacaoBoca) clearInterval(intervaloAnimacaoBoca);
    
    intervaloAnimacaoBoca = setInterval(() => {
        if (!animacaoBocaAtiva) {
            // Reseta todas as linhas
            waveLines.forEach(line => {
                line.style.height = '15px';
                line.style.transform = 'scaleY(1)';
            });
            if (intervaloAnimacaoBoca) clearInterval(intervaloAnimacaoBoca);
            intervaloAnimacaoBoca = null;
            return;
        }
        
        frame++;
        // Anima cada linha com fase diferente para efeito de onda
        waveLines.forEach((line, index) => {
            // Calcula altura baseada no seno do tempo + posição
            const fatorFase = (frame * 0.3 + index * 0.5) * Math.PI;
            const alturaBase = 15;
            const variacao = 25 * intensidadeFinal * (Math.sin(fatorFase) * 0.7 + 0.5);
            const novaAltura = Math.min(45, Math.max(8, alturaBase + variacao));
            
            line.style.height = `${novaAltura}px`;
            line.style.transform = `scaleY(${0.8 + Math.sin(fatorFase) * 0.5})`;
            
            // Cor dinâmica baseada na intensidade
            if (intensidadeFinal > 0.9) {
                line.style.backgroundColor = '#ff6600';
            } else if (intensidadeFinal > 0.6) {
                line.style.backgroundColor = '#ffaa33';
            } else {
                line.style.backgroundColor = '#ffcc66';
            }
        });
    }, 50); // 20 FPS para animação suave
}

/**
 * Para a animação da boca e reseta as linhas
 */
function pararAnimacaoBoca() {
    animacaoBocaAtiva = false;
    if (intervaloAnimacaoBoca) {
        clearInterval(intervaloAnimacaoBoca);
        intervaloAnimacaoBoca = null;
    }
    
    // Reseta todas as linhas de onda
    const waveLines = document.querySelectorAll('.wave-line');
    waveLines.forEach(line => {
        line.style.height = '15px';
        line.style.transform = 'scaleY(1)';
        line.style.backgroundColor = '#ffaa33';
    });
}

/**
 * Animação curta da boca (para sons rápidos como alertas e medições)
 * @param {number} duracao - Duração em milissegundos
 * @param {number} intensidade - Intensidade da animação
 */
function animacaoBocaCurta(duracao = 500, intensidade = 0.8) {
    iniciarAnimacaoBoca(intensidade);
    setTimeout(() => {
        if (animacaoBocaAtiva && !state.estaFalando) {
            pararAnimacaoBoca();
        }
    }, duracao);
}

// ===== 4. FUNÇÕES DE NOTIFICAÇÃO =====
function showNotification(message, type = 'info') {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
    notif.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    DOM.notificationContainer.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// ===== 5. SIMULAÇÃO DO SENSOR DE SOM =====
function simularDB() {
    let variacao = (Math.random() - 0.5) * 25;
    let novoDB = ultimoDB + variacao;
    
    if (Math.random() < 0.15) {
        const pico = 30 + Math.random() * 40;
        novoDB += pico;
        if (pico > 50) {
            showNotification("🔊 PICO DE SOM DETECTADO!", "warning");
        }
    }
    
    novoDB = Math.min(120, Math.max(15, novoDB));
    ultimoDB = novoDB;
    return parseFloat(novoDB.toFixed(1));
}

// ===== 6. MENSAGENS DA IA =====
function addIAMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ia-message';
    
    if (isUser) {
        messageDiv.innerHTML = `
            <div class="ia-avatar">👤</div>
            <div class="ia-bubble" style="background: var(--accent-primary);">
                <p>${escapeHtml(message)}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="ia-avatar">🤖</div>
            <div class="ia-bubble">
                <p>${escapeHtml(message)}</p>
                <small>🤖 Robô Fofoqueiro - ${new Date().toLocaleTimeString()}</small>
            </div>
        `;
    }
    
    DOM.iaMessageContainer.appendChild(messageDiv);
    DOM.iaMessageContainer.scrollTop = DOM.iaMessageContainer.scrollHeight;
    
    while (DOM.iaMessageContainer.children.length > 30) {
        DOM.iaMessageContainer.removeChild(DOM.iaMessageContainer.firstChild);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function simulateTyping(message, falarEmVozAlta = true) {
    DOM.iaTyping.style.display = 'flex';
    const delay = 500 + Math.random() * 800;
    await new Promise(resolve => setTimeout(resolve, delay));
    DOM.iaTyping.style.display = 'none';
    addIAMessage(message);
    
    // SE FOR PARA FALAR EM VOZ ALTA (MEMES E RESPOSTAS IMPORTANTES)
    if (falarEmVozAlta) {
        await falarRobo(message);
    }
    
    return message;
}

// ===== 7. GERADOR DE RESPOSTAS DA IA =====
const giriasParanaenses = {
    saudacoes: [
        "Fala meu parça!", "E aí, piá!", "Ó o trem, guria!", "Tchê, bão demais?",
        "Vixi, olha quem chegou!", "Bah, meu chapa!", "Eae, meu consagrado!", "Salve, gurizada!"
    ],
    alertas: [
        "Vixi, tá alto demais! Os cabaço vão reclamar!",
        "Piá, baixa o volume que meu LED já piscou vermelho!",
        "Égua, que gritaria danada! Tô quase surdo!",
        "Guria, isso aí é inferno acústico! Vou chamar a diretora robô!",
        "Ô loco meu! Tá achando que isso é estádio?",
        "Silêncio na área! Sensor tá apitando igual bomba!"
    ],
    baixoVolume: [
        "Silêncio absoluto... até assusta, vixi!",
        "Tá quieto demais, até o robô dormiu...",
        "Hum, tão quietinho... tô desconfiado!",
        "Falae? Tá todo mundo dormindo? Até o passarinho calou!"
    ],
    fofocas: [
        "Anotado! Isso vai pro meu banco de fofocas!",
        "Huuum, interessante... vou contar pra todo mundo!",
        "😈 Hehehe... isso vai render altas fofocas!",
        "Anota aí no relatório! Isso vai longe!",
        "Tô gravando tudo aqui 🎙️ isso vai longe!"
    ],
    memes: [
        "🤣 O DIRETOR VAI OUVIR ESSA FOFOCA! O cabrunco vai ficar bolado!",
        "😎 TÔ IGUAL SENSOR: CAPTANDO TUDO! Ó o trem, que barulheira danada!",
        "📢 INFERNO ACÚSTICO ATIVADO! Isso aqui tá parecendo show do Bruno e Marrone!",
        "🔴 LED PISCOU IGUAL ÁRVORE DE NATAL! Vixi, que gritaria!",
        "💾 FOFOCA SALVA NO HD DO ROBÔ! Essa vai pro relatório secreto!",
        "🎤 ROBÔ FOFOQUEIRO: 'EU SEI O QUE VOCÊ FEZ NO ÚLTIMO NATAL...' Ops, vazou!",
        "🤖 MODO FOFOCA ATIVADO NÍVEL EXPERT! Tô ligado em tudo, piá!",
        "📢 CALA A BOCA, Ô COLEGA! Tô tentando medir o barulho aqui!"
    ]
};

function gerarRespostaIA(db, textoUsuario = null) {
    let resposta = "";
    
    if (textoUsuario) {
        const saudacao = giriasParanaenses.saudacoes[Math.floor(Math.random() * giriasParanaenses.saudacoes.length)];
        const textoLower = textoUsuario.toLowerCase();
        
        if (textoLower.includes('fofoca') || textoLower.includes('segredo')) {
            const fofocaMsg = giriasParanaenses.fofocas[Math.floor(Math.random() * giriasParanaenses.fofocas.length)];
            resposta = `${saudacao} Você falou sobre "${textoUsuario.substring(0, 40)}"... ${fofocaMsg}`;
        } 
        else if (textoLower.includes('obrigado') || textoLower.includes('valeu')) {
            resposta = `${saudacao} De nada, piá! Tô aqui pra ajudar com a acessibilidade e espalhar memes! 🤖❤️`;
        }
        else if (textoLower.includes('meme') || textoLower.includes('engraçado')) {
            const memeMsg = giriasParanaenses.memes[Math.floor(Math.random() * giriasParanaenses.memes.length)];
            resposta = `${saudacao} ${memeMsg}`;
        }
        else {
            resposta = `${saudacao} Você disse: "${textoUsuario.substring(0, 50)}". ${giriasParanaenses.fofocas[Math.floor(Math.random() * giriasParanaenses.fofocas.length)]}`;
        }
    } 
    else {
        if (db > 100) {
            resposta = giriasParanaenses.alertas[Math.floor(Math.random() * giriasParanaenses.alertas.length)] + " " + giriasParanaenses.memes[Math.floor(Math.random() * giriasParanaenses.memes.length)];
        } 
        else if (db > 80) {
            resposta = giriasParanaenses.alertas[Math.floor(Math.random() * giriasParanaenses.alertas.length)];
        } 
        else if (db > 60) {
            resposta = `📢 ${db}dB! Tá ficando interessante, logo logo viro fofoqueiro! ${giriasParanaenses.saudacoes[Math.floor(Math.random() * giriasParanaenses.saudacoes.length)]}`;
        } 
        else if (db > 35) {
            const saudacao = giriasParanaenses.saudacoes[Math.floor(Math.random() * giriasParanaenses.saudacoes.length)];
            resposta = `${saudacao} Tá suave, ${db}dB. Tudo normal por aqui!`;
        } 
        else {
            resposta = giriasParanaenses.baixoVolume[Math.floor(Math.random() * giriasParanaenses.baixoVolume.length)];
        }
    }
    
    return resposta;
}

// ===== 8. ATUALIZAÇÃO DO ROBÔ =====
function atualizarRobo(db) {
    const isAlerta = db > 75;
    
    if (isAlerta) {
        DOM.leftEye.classList.add('alert');
        DOM.rightEye.classList.add('alert');
        DOM.ledStatus.innerHTML = '🔴 VERMELHO (Alerta)';
        DOM.alertStatus.innerHTML = '🔴 ALERTA! Volume elevado!';
        DOM.facialExpression.innerHTML = '😱';
    } else {
        DOM.leftEye.classList.remove('alert');
        DOM.rightEye.classList.remove('alert');
        DOM.ledStatus.innerHTML = '🟢 VERDE (Normal)';
        DOM.alertStatus.innerHTML = '🟢 Normal';
        DOM.facialExpression.innerHTML = '😊';
    }
    
    DOM.currentDB.innerHTML = `${db} dB`;
    
    // ANIMAÇÃO CURTA DA BOCA PARA A MEDIÇÃO (REAGE AO VOLUME)
    const intensidade = Math.min(1.2, db / 100);
    animacaoBocaCurta(400, intensidade);
}

// ===== 9. ESTATÍSTICAS E CONQUISTAS =====
function atualizarEstatisticas(db) {
    state.totalMedicoesCount++;
    DOM.totalMedicoes.innerText = state.totalMedicoesCount;
    
    if (db > state.picoMax) {
        state.picoMax = db;
        DOM.picoMaximo.innerText = `${state.picoMax} dB`;
        showNotification(`🏆 NOVO RECORDE! ${db} dB`, "success");
    }
    
    const isAlerta = db > 75;
    if (isAlerta) {
        state.totalAlertasCount++;
        DOM.totalAlertas.innerText = state.totalAlertasCount;
        state.alertasSequencia++;
    } else {
        state.alertasSequencia = 0;
    }
    
    if (!state.conquistas.first_measure && state.totalMedicoesCount >= 1) {
        desbloquearConquista('first_measure', '🎯 Primeira medição - "Primeira fofoca coletada!"');
    }
    if (!state.conquistas.alert_master && state.totalAlertasCount >= 10) {
        desbloquearConquista('alert_master', '🚨 Mestre dos alertas - "10 alertas emitidos!"');
    }
    if (!state.conquistas.fofoqueiro && state.fofocas.length >= 5) {
        desbloquearConquista('fofoqueiro', '👂 Fofoqueiro nível 5 - "5 fofocas no arquivo!"');
    }
    if (!state.conquistas.silence && db < 25 && state.totalMedicoesCount > 0) {
        desbloquearConquista('silence', '🤫 Silêncio absoluto - "Medição abaixo de 25dB!"');
    }
    if (!state.conquistas.inferno && db > 110) {
        desbloquearConquista('inferno', '🔥 Inferno acústico - "Pico máximo quase atingido!"');
    }
    
    let nivel = "🐣 Iniciante";
    if (state.totalMedicoesCount >= 50) nivel = "🏆 Lenda do Fofoqueiro";
    else if (state.totalMedicoesCount >= 30) nivel = "⚙️ Especialista";
    else if (state.totalMedicoesCount >= 15) nivel = "📈 Intermediário";
    else if (state.totalMedicoesCount >= 5) nivel = "🌱 Aprendiz";
    DOM.nivelRobo.innerText = nivel;
    
    salvarDados();
}

function desbloquearConquista(id, nome) {
    if (state.conquistas[id]) return;
    state.conquistas[id] = true;
    
    const achievementDiv = document.querySelector(`.achievement[data-id="${id}"]`);
    if (achievementDiv) {
        achievementDiv.classList.remove('locked');
        achievementDiv.classList.add('unlocked');
        achievementDiv.title = `✅ Desbloqueado: ${nome}`;
    }
    
    DOM.achievementName.innerText = nome;
    DOM.achievementModal.classList.add('show');
    setTimeout(() => {
        DOM.achievementModal.classList.remove('show');
    }, 3000);
    
    showNotification(`🏆 CONQUISTA DESBLOQUEADA: ${nome}`, 'success');
    
    // Fala a conquista em voz alta também!
    falarRobo(`Conquista desbloqueada! ${nome}`);
}

// ===== 10. GRÁFICO =====
function desenharGrafico() {
    const canvas = DOM.graphCanvas;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.clientWidth;
    const height = 250;
    
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    
    if (state.medicoes.length === 0) {
        ctx.fillStyle = 'var(--text-secondary, #94a3b8)';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Nenhuma medição ainda. Clique em "Medir Som"', width/2, height/2);
        return;
    }
    
    const barWidth = (width - 60) / Math.min(state.medicoes.length, 20);
    const medicoesMostrar = state.medicoes.slice(-20);
    
    for (let i = 0; i < medicoesMostrar.length; i++) {
        const db = medicoesMostrar[i];
        const barHeight = (db / 120) * (height - 50);
        const x = width - 20 - ((i + 1) * barWidth);
        const y = height - 30 - barHeight;
        
        ctx.fillStyle = db > 75 ? '#ef4444' : '#10b981';
        ctx.fillRect(x, y, barWidth - 3, barHeight);
        
        ctx.fillStyle = 'var(--text-primary, #f1f5f9)';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${db}dB`, x + (barWidth - 3)/2, y - 3);
    }
    
    const alertaY = height - 30 - (75 / 120) * (height - 50);
    ctx.beginPath();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.moveTo(15, alertaY);
    ctx.lineTo(width - 15, alertaY);
    ctx.stroke();
    ctx.setLineDash([]);
}

// ===== 11. MAPA DE CALOR =====
const locaisEscola = [
    'Sala 101', 'Sala 102', 'Sala 103', 'Biblioteca',
    'Pátio', 'Refeitório', 'Ginásio', 'Informática',
    'Sala 201', 'Sala 202', 'Sala 203', 'Auditório',
    'Corredor A', 'Corredor B', 'Secretaria', 'Laboratório'
];

function construirMapaCalor() {
    if (!DOM.schoolMap) return;
    DOM.schoolMap.innerHTML = '';
    
    for (let i = 0; i < locaisEscola.length; i++) {
        const dbSimulado = 20 + Math.random() * 90;
        const cell = document.createElement('div');
        cell.className = 'map-cell';
        
        let cellClass = 'cell-silent';
        if (dbSimulado > 90) cellClass = 'cell-extreme';
        else if (dbSimulado > 70) cellClass = 'cell-loud';
        else if (dbSimulado > 40) cellClass = 'cell-moderate';
        cell.classList.add(cellClass);
        
        cell.innerHTML = `
            <span class="cell-name">${locaisEscola[i]}</span>
            <span class="cell-db">${dbSimulado.toFixed(0)}dB</span>
        `;
        
        cell.addEventListener('click', () => {
            const dbAtual = parseFloat(cell.querySelector('.cell-db').innerText);
            const msg = `Vixi, na ${locaisEscola[i]} tá fazendo ${dbAtual.toFixed(0)}dB! Ó o trem, que barulheira danada!`;
            simulateTyping(msg, true);
        });
        
        DOM.schoolMap.appendChild(cell);
    }
}

function atualizarMapaComSom(db) {
    const cells = document.querySelectorAll('.map-cell');
    if (cells.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * cells.length);
    const randomCell = cells[randomIndex];
    const localName = locaisEscola[randomIndex];
    
    let cellClass = 'cell-silent';
    if (db > 90) cellClass = 'cell-extreme';
    else if (db > 70) cellClass = 'cell-loud';
    else if (db > 40) cellClass = 'cell-moderate';
    
    randomCell.className = `map-cell ${cellClass}`;
    randomCell.querySelector('.cell-db').innerHTML = `${db.toFixed(0)}dB`;
    
    if (db > 100) {
        const msg = `🔥 INFERNO ACÚSTICO em ${localName}! ${db.toFixed(0)}dB! Isso é preocupante, vixi!`;
        simulateTyping(msg, true);
    }
}

// ===== 12. LOG DE FOFOcas =====
function adicionarFofoca(texto) {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    const dataCompleta = new Date().toLocaleDateString('pt-BR');
    
    state.fofocas.unshift({ 
        timestamp: `${dataCompleta} ${timestamp}`, 
        texto: texto 
    });
    
    if (state.fofocas.length > 100) {
        state.fofocas = state.fofocas.slice(0, 100);
    }
    
    DOM.totalFofocas.innerText = state.fofocas.length;
    atualizarLogView();
    salvarDados();
}

function atualizarLogView() {
    const logContainer = document.querySelector('.log-container');
    if (!logContainer) return;
    
    if (state.fofocas.length === 0) {
        logContainer.innerHTML = '<div class="log-empty">📭 Nenhuma fofoca registrada ainda. Fale com o robô ou meça o som!</div>';
        return;
    }
    
    logContainer.innerHTML = state.fofocas.map(fofoca => `
        <div class="log-entry">
            <span class="log-time">[${fofoca.timestamp}]</span>
            <span class="log-text">${escapeHtml(fofoca.texto)}</span>
        </div>
    `).join('');
}

// ===== 13. AÇÃO: MEDIR SOM =====
async function medirSom() {
    const db = simularDB();
    
    state.medicoes.push(db);
    if (state.medicoes.length > 30) state.medicoes.shift();
    
    atualizarRobo(db);
    atualizarEstatisticas(db);
    desenharGrafico();
    atualizarMapaComSom(db);
    
    const resposta = gerarRespostaIA(db);
    await simulateTyping(resposta, true);
    
    if (db > 80) {
        adicionarFofoca(`⚠️ ALERTA SONORO: ${db}dB - Ambiente muito barulhento!`);
    } else if (db < 25) {
        adicionarFofoca(`🤫 SILÊNCIO: ${db}dB - Ambiente extremamente silencioso`);
    } else {
        adicionarFofoca(`🎤 Medição de som: ${db}dB - Nível ${db > 60 ? 'elevado' : 'normal'}`);
    }
    
    if (db > 75) {
        showNotification(`🔊 ALERTA! ${db}dB - Volume muito elevado!`, 'warning');
    } else {
        showNotification(`✅ Medição: ${db}dB`, 'success');
    }
}

// ===== 14. RECONHECIMENTO DE VOZ =====
function iniciarReconhecimentoVoz() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        const frase = prompt("Seu navegador não suporta microfone. Digite algo para o robô:");
        if (frase && frase.trim()) {
            processarFalaUsuario(frase);
        }
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    DOM.speechStatusText.innerText = "🎤 Escutando... Fale algo!";
    showNotification("🎤 Estou ouvindo... fale algo agora!", "info");
    
    recognition.start();
    
    recognition.onresult = async (event) => {
        const falaUsuario = event.results[0][0].transcript;
        DOM.speechStatusText.innerText = "✅ Reconheci!";
        await processarFalaUsuario(falaUsuario);
    };
    
    recognition.onerror = () => {
        DOM.speechStatusText.innerText = "❌ Não entendi. Tente novamente!";
        const msgErro = "Ô meu consagrado, não entendi o que você falou! Fala mais alto que o robô tá meio surdo hoje. Vixi!";
        simulateTyping(msgErro, true);
        showNotification("❌ Não consegui entender. Verifique o microfone!", "error");
    };
    
    recognition.onend = () => {
        setTimeout(() => {
            if (!state.estaFalando) {
                DOM.speechStatusText.innerText = "Pronto para ouvir";
            }
        }, 2000);
    };
}

async function processarFalaUsuario(texto) {
    const db = simularDB();
    state.medicoes.push(db);
    if (state.medicoes.length > 30) state.medicoes.shift();
    
    atualizarRobo(db);
    atualizarEstatisticas(db);
    desenharGrafico();
    atualizarMapaComSom(db);
    
    adicionarFofoca(`🗣️ Usuário disse: "${texto}" (nível de som: ${db}dB)`);
    
    const resposta = gerarRespostaIA(db, texto);
    await simulateTyping(resposta, true);
    
    showNotification(`🗣️ Você disse: "${texto.substring(0, 50)}${texto.length > 50 ? '...' : ''}"`, 'info');
}

// ===== 15. GERAR MEME (COM LEITURA EM VOZ ALTA) =====
async function gerarMeme() {
    // Escolhe um meme aleatório do banco (memes mais longos e engraçados)
    const meme = giriasParanaenses.memes[Math.floor(Math.random() * giriasParanaenses.memes.length)];
    
    // Adiciona ao chat
    addIAMessage(`😂 MEME: ${meme}`, false);
    
    // FAZ O ROBÔ LER O MEME EM VOZ ALTA (CORREÇÃO PRINCIPAL!)
    await falarRobo(meme, 1.2);  // Intensidade alta para meme
    
    // Adiciona ao log
    adicionarFofoca(`😂 Meme gerado e lido: ${meme}`);
    
    // Animação especial na expressão facial
    DOM.facialExpression.innerHTML = '😂';
    setTimeout(() => {
        DOM.facialExpression.innerHTML = '😊';
    }, 2000);
    
    // Notificação visual
    showNotification(`🎤 Robô falou o meme: "${meme.substring(0, 50)}..."`, 'success');
}

// ===== 16. MODO AUTOMÁTICO =====
function toggleModoAutomatico() {
    if (state.modoAutomatico) {
        if (state.autoModeInterval) {
            clearInterval(state.autoModeInterval);
            state.autoModeInterval = null;
        }
        state.modoAutomatico = false;
        DOM.autoModeBtn.style.opacity = '1';
        DOM.autoModeBtn.innerHTML = '<span>🤖</span> Modo Automático';
        simulateTyping("Modo automático desligado. Agora quem manda é você, meu parça!", true);
        showNotification("⏹️ Modo automático desligado", "info");
    } else {
        state.modoAutomatico = true;
        DOM.autoModeBtn.style.opacity = '0.7';
        DOM.autoModeBtn.innerHTML = '<span>⏹️</span> Parar Automático';
        
        simulateTyping("🤖 Modo automático ativado! Vou fazer medições de som a cada 8 segundos. É só relaxar e acompanhar as fofocas! Vixi, ó o trem!", true);
        showNotification("🤖 Modo automático ativado! Medindo som a cada 8 segundos...", "success");
        
        state.autoModeInterval = setInterval(() => {
            if (state.modoAutomatico) {
                medirSom();
            }
        }, 8000);
    }
}

// ===== 17. RESETAR SISTEMA =====
function resetarSistema() {
    if (confirm("⚠️ Tem certeza que deseja resetar todo o sistema? Isso apagará todas as medições, fofocas e conquistas!")) {
        
        if (state.modoAutomatico) {
            toggleModoAutomatico();
        }
        
        state = {
            medicoes: [],
            totalMedicoesCount: 0,
            picoMax: 0,
            totalAlertasCount: 0,
            fofocas: [],
            conquistas: {
                first_measure: false,
                alert_master: false,
                fofoqueiro: false,
                silence: false,
                inferno: false
            },
            alertasSequencia: 0,
            modoAutomatico: false,
            autoModeInterval: null,
            nivelExperiencia: 0,
            estaFalando: false
        };
        
        ultimoDB = 45;
        
        DOM.totalMedicoes.innerText = '0';
        DOM.picoMaximo.innerText = '0 dB';
        DOM.totalAlertas.innerText = '0';
        DOM.totalFofocas.innerText = '0';
        DOM.currentDB.innerText = '0.0';
        DOM.nivelRobo.innerText = '🐣 Iniciante';
        
        DOM.leftEye.classList.remove('alert');
        DOM.rightEye.classList.remove('alert');
        DOM.facialExpression.innerHTML = '😊';
        DOM.ledStatus.innerHTML = '🟢 VERDE (Normal)';
        DOM.alertStatus.innerHTML = '🟢 Normal';
        
        desenharGrafico();
        construirMapaCalor();
        atualizarLogView();
        
        document.querySelectorAll('.achievement').forEach(ach => {
            ach.classList.remove('unlocked');
            ach.classList.add('locked');
        });
        
        DOM.iaMessageContainer.innerHTML = `
            <div class="ia-message">
                <div class="ia-avatar">🤖</div>
                <div class="ia-bubble">
                    <p>"Sistema reiniciado! Fala meu parça, bora começar de novo? Tô zerado e pronto pra novas fofocas!"</p>
                    <small>🔊 Clique nos botões para interagir - ${new Date().toLocaleTimeString()}</small>
                </div>
            </div>
        `;
        
        falarRobo("Sistema reiniciado! Bora começar de novo, meu parça!");
        showNotification("🔄 Sistema completamente reiniciado!", "success");
        salvarDados();
    }
}

// ===== 18. TEMA E VISUALIZAÇÃO =====
function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    DOM.themeToggle.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
    desenharGrafico();
}

function trocarView(view) {
    if (DOM.graphView) DOM.graphView.style.display = 'none';
    if (DOM.heatmapView) DOM.heatmapView.style.display = 'none';
    if (DOM.logView) DOM.logView.style.display = 'none';
    
    if (view === 'graph') {
        if (DOM.graphView) DOM.graphView.style.display = 'block';
        if (DOM.screenTitle) DOM.screenTitle.innerHTML = '📈 Monitor de Decibéis';
        desenharGrafico();
    } else if (view === 'heatmap') {
        if (DOM.heatmapView) DOM.heatmapView.style.display = 'block';
        if (DOM.screenTitle) DOM.screenTitle.innerHTML = '🗺️ Mapa do Inferno Acústico';
    } else if (view === 'log') {
        if (DOM.logView) DOM.logView.style.display = 'block';
        if (DOM.screenTitle) DOM.screenTitle.innerHTML = '📋 Arquivo de Fofocas';
        atualizarLogView();
    }
    
    DOM.screenBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-view') === view) {
            btn.classList.add('active');
        }
    });
}

function limparLog() {
    if (confirm("🗑️ Tem certeza que deseja limpar todas as fofocas?")) {
        state.fofocas = [];
        DOM.totalFofocas.innerText = '0';
        atualizarLogView();
        salvarDados();
        showNotification("🗑️ Histórico de fofocas limpo!", "info");
    }
}

// ===== 19. PERSISTÊNCIA =====
function salvarDados() {
    const dadosParaSalvar = {
        totalMedicoesCount: state.totalMedicoesCount,
        picoMax: state.picoMax,
        totalAlertasCount: state.totalAlertasCount,
        fofocas: state.fofocas,
        conquistas: state.conquistas,
        ultimaData: new Date().toISOString()
    };
    localStorage.setItem('roboFofoqueiro', JSON.stringify(dadosParaSalvar));
}

function carregarDados() {
    const dadosSalvos = localStorage.getItem('roboFofoqueiro');
    if (dadosSalvos) {
        try {
            const parsed = JSON.parse(dadosSalvos);
            state.totalMedicoesCount = parsed.totalMedicoesCount || 0;
            state.picoMax = parsed.picoMax || 0;
            state.totalAlertasCount = parsed.totalAlertasCount || 0;
            state.fofocas = parsed.fofocas || [];
            state.conquistas = { ...state.conquistas, ...(parsed.conquistas || {}) };
            
            DOM.totalMedicoes.innerText = state.totalMedicoesCount;
            DOM.picoMaximo.innerText = `${state.picoMax} dB`;
            DOM.totalAlertas.innerText = state.totalAlertasCount;
            DOM.totalFofocas.innerText = state.fofocas.length;
            
            for (const [id, unlocked] of Object.entries(state.conquistas)) {
                if (unlocked) {
                    const achievementDiv = document.querySelector(`.achievement[data-id="${id}"]`);
                    if (achievementDiv) {
                        achievementDiv.classList.remove('locked');
                        achievementDiv.classList.add('unlocked');
                    }
                }
            }
            
            atualizarLogView();
        } catch(e) {
            console.error("Erro ao carregar dados:", e);
        }
    }
}

// ===== 20. INICIALIZAÇÃO =====
async function carregamentoInicial() {
    let progress = 0;
    const startTime = Date.now();
    const minDuration = 1500;
    
    const intervalo = setInterval(() => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(100, (elapsed / minDuration) * 100);
        if (DOM.loaderProgress) DOM.loaderProgress.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(intervalo);
            setTimeout(() => {
                if (DOM.loadingOverlay) DOM.loadingOverlay.classList.add('hide');
            }, 300);
        }
    }, 30);
    
    construirMapaCalor();
    desenharGrafico();
    carregarDados();
    
    setTimeout(async () => {
        const mensagemBoasVindas = "Vixi, meu parça! Robô Fofoqueiro online e pronto pra ação! Bora medir o barulho da galera e espalhar acessibilidade com muito meme! Ó o trem! 🎤📢🤖";
        await simulateTyping(mensagemBoasVindas, true);
    }, 1800);
}

function initEventListeners() {
    if (DOM.measureBtn) DOM.measureBtn.addEventListener('click', medirSom);
    if (DOM.voiceBtn) DOM.voiceBtn.addEventListener('click', iniciarReconhecimentoVoz);
    if (DOM.memeBtn) DOM.memeBtn.addEventListener('click', gerarMeme);
    if (DOM.autoModeBtn) DOM.autoModeBtn.addEventListener('click', toggleModoAutomatico);
    if (DOM.resetBtn) DOM.resetBtn.addEventListener('click', resetarSistema);
    if (DOM.themeToggle) DOM.themeToggle.addEventListener('click', toggleTheme);
    if (DOM.clearLogBtn) DOM.clearLogBtn.addEventListener('click', limparLog);
    
    DOM.screenBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            trocarView(btn.getAttribute('data-view'));
        });
    });
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (DOM.themeToggle) DOM.themeToggle.innerHTML = savedTheme === 'light' ? '🌙' : '☀️';
    }
}

function inicializarSistema() {
    initEventListeners();
    carregamentoInicial();
    
    window.addEventListener('beforeunload', () => {
        salvarDados();
    });
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => desenharGrafico(), 250);
    });
    
    console.log("🤖 Robô Fofoqueiro 3.1 inicializado - Boca melhorada e leitura de memes ativa!");
}

// ===== FIM DO SCRIPT =====