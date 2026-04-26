markdown
# 🤖 ROBÔ FOFOQUEIRO DA ACESSIBILIDADE

### *"Vixi, meu parça! O trem vai ficar doido, mas organizado!"*

[![Status](https://img.shields.io/badge/status-funcionando-success?style=for-the-badge&logo=github)](https://github.com/)
[![Version](https://img.shields.io/badge/version-3.1.0-blue?style=for-the-badge&logo=python)](https://github.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge&logo=opensourceinitiative)](https://opensource.org/licenses/MIT)
[![BNCC](https://img.shields.io/badge/BNCC-Compliant-orange?style=for-the-badge&logo=googleclassroom)](https://basenacionalcomum.mec.gov.br/)
[![RCP](https://img.shields.io/badge/RCP-Paraná-yellow?style=for-the-badge&logo=gov.br)](https://www.educacao.pr.gov.br/)

---

## 📖 ÍNDICE

- [🎯 O QUE É ISSO?](#-o-que-e-isso)
- [🎬 DEMO RÁPIDA](#-demo-rapida)
- [📚 BASE CURRICULAR (BNCC x RCP)](#-base-curricular-bncc-x-rcp)
- [🛠️ TECNOLOGIAS USADAS](#️-tecnologias-usadas)
- [🚀 COMO EXECUTAR](#-como-executar)
- [🎮 COMO USAR O ROBÔ](#-como-usar-o-robo)
- [🤖 PERSONALIDADE DO ROBÔ](#-personalidade-do-robo)
- [📁 ESTRUTURA DO PROJETO](#-estrutura-do-projeto)
- [🎓 PLANOS DE AULA INTEGRADOS](#-planos-de-aula-integrados)
- [🏆 SISTEMA DE CONQUISTAS](#-sistema-de-conquistas)
- [🧩 COMPONENTES DO SISTEMA](#-componentes-do-sistema)
- [🐛 POSSÍVEIS PROBLEMAS E SOLUÇÕES](#-possiveis-problemas-e-solucoes)
- [🔧 PERSONALIZAÇÃO](#-personalizacao)
- [📈 PRÓXIMAS FUNCIONALIDADES](#-proximas-funcionalidades)
- [👩‍🏫 CRÉDITOS](#-créditos)
- [📄 LICENÇA](#-licença)

---

## 🎯 O QUE É ISSO?

**Robô Fofoqueiro da Acessibilidade** é um projeto interativo que simula um sistema embarcado completo para **medição de ruído ambiente**, com visualizações em tempo real, reconhecimento de voz, IA com personalidade **paranaense** e um monte de meme pra deixar o aprendizado mais divertido!

### Mas por que "Fofoqueiro"? 🤔

Porque o robô:
- 👂 **ESCUTA TUDO** (com seu microfone)
- 📝 **ANOTA TUDO** (salva as "fofocas" num arquivo)
- 🗣️ **CONTA TUDO** (responde com gírias regionais)
- 😂 **COM MUITO HUMOR** (porque aprender pode ser divertido!)

### E por que "Acessibilidade"? ♿

Porque o projeto foi pensado para **incluir todo mundo**:

Recurso	Para quem                                 
	
🖥️ Funciona no Chromebook da escola	Quem não tem PC gamer                      
🔌 100% offline (modo fallback)	Escolas sem internet                       
🎤 Reconhecimento de voz	Quem tem dificuldade de digitar            
⌨️ Fallback por texto	Quem não tem microfone                     
🎨 Alto contraste e cores	Daltonismo e baixa visão                   
🔊 Leitura em voz alta (TTS)	Pessoas com deficiência visual             
                                              

---

## 🎬 DEMO RÁPIDA

```bash
# Clone o repositório (ou baixe os arquivos)
git clone https://github.com/seu-usuario/robo-fofoqueiro.git

# Entre na pasta
cd robo-fofoqueiro

# Abra o arquivo index.html no seu navegador
# (ou use o Live Server do VS Code)

Pronto! O robô vai aparecer na tela e você pode começar a interagir.

    ⚠️ IMPORTANTE PARA O COLAb/DOCÊNCIA: O projeto é 100% front-end, não precisa instalar nada além do navegador!

## 📚 BASE CURRICULAR (BNCC x RCP)

### Componente: Linguagens

 BNCC (Ensino Médio)                               	RCP - Paraná                        
	
EM13LGG101 - Compreender processos de produção de sentido 	Língua Portuguesa - Oralidade
EM13LGG304 - Utilizar recursos linguísticos para humor e ironia	Produção de texto multimodal
EM13LGG702 - Utilizar diferentes linguagens	
EM13LP16 - Produzir textos orais                                    	


### Componente: Matemática

BNCC (Ensino Médio)	RCP Paraná
	
EM13MAT405 - Conceitos de Programação	Pensamento Computacional           
EM13MAT503 - Interpretar dados em gráficos	Estatística e Tratamento da Informação


### Componente: Ciências da Natureza

BNCC (Ensino Médio)                      	RCP Paraná
	
EM13CNT101 	Física Ondulatória
EM13CNT104 - Avaliar limites de tecnologias de captura 	Tecnologia e Sociedade
EM13CNT206 - Discutir aplicações de sensores	
EM13CNT303 - Interpretar tecnologias de visão computacional	 

### Competências Gerais da BNCC

Competência	Descrição                                      
	
CG1	Valorizar conhecimentos historicamente construídos
CG2	Exercitar curiosidade intelectual
CG4	Utilizar diferentes linguagens
CG5	Compreender e usar tecnologias digitais
CG6	Trabalhar em equipe
CG7	Argumentar com base em dados
CG8	Conhecer-se e cuidar de si
CG10	Agir com autonomia



## 🛠️ TECNOLOGIAS USADAS

!(assets/images/diagrama_README.png)

Tecnologia	Para que serve
	
HTML5	Estrutura da página e elementos do robô
CSS3	Tudo que é bonito: animações, tema escuro/claro, responsividade
JavaScript ES6+	Toda a inteligência do robô
Canvas API	Gráfico de decibéis em tempo real
Web Speech API	Reconhecimento de voz (fala do usuário)
SpeechSynthesis	Robô falando de volta (TTS)
LocalStorage	Salvar progresso, conquistas e fofocas
Web Audio API	Análise de áudio simulada

## 🚀 COMO EXECUTAR

### Opção 1: Super fácil (recomendado)

```bash
# 1. Baixe os 3 arquivos (index.html, style.css, script.js)
# 2. Coloque todos na mesma pasta
# 3. Dê dois cliques no index.html
# 4. Pronto! O robô vai aparecer no seu navegador
Opção 2: Via GitHub Pages (online)
bash
# Faça o upload dos arquivos para um repositório no GitHub
# Ative o GitHub Pages nas configurações
# Acesse: https://seu-usuario.github.io/robo-fofoqueiro/
Opção 3: Via Live Server (VS Code)
bash
# Instale a extensão "Live Server" no VS Code
# Clique com o botão direito no index.html
# Selecione "Open with Live Server"
Opção 4: Colab da Google (para professores)
bash
# 1. Crie um notebook novo no Google Colab
# 2. Use o código mágico para servir HTML:

# Célula 1 - Salvar HTML
%%writefile index.html
# (cole o HTML aqui)

# Célula 2 - Servir
from google.colab import files
files.download('index.html')
# Depois abra localmente
🎮 COMO USAR O ROBÔ
Interface Principal
text
┌─────────────────────────────────────────────────────────┐
│  🤖 ROBÔ FOFOQUEIRO da Acessibilidade - Versão Paraná       	           │
├─────────────────────────────────────────────────────────┤
│  📊 ESTATÍSTICAS        │        🤖 CABEÇA DO ROBÔ     │
│  • Medições: 42         │       👁️      👁️             │
│  • Pico: 98 dB          │        (LEDs que piscam)      │
│  • Alertas: 7           │				                  │
│  • Fofocas: 15          │       😊 (expressão)		 │
│  • Nível: Especialista  │       ~~~~~~ (boca dançante)  │
├─────────────────────────┼───────────────────────────────┤
│  🏆 CONQUISTAS          │         📊 TELA DO ROBÔ      │
│  ✅ Primeira medição    │    [GRÁFICO] [MAPA] [LOG]     │
│  ⏳ Mestre dos alertas  │                               │  
│  🔒 Fofoqueiro nível 5  │    ┌────────────────┐         │
├─────────────────────────┤     │ ████████ 85dB │          │
│  🧠 IA PARANAENSE       │    │ ██████ 70dB    │         │      
│  ┌─────────────────────┐ │    │ ████ 45dB     │          │
│  │🤖 "Fala meu parça!"│ │    └────────────────┘         │
│  └─────────────── ────┘  │                               │
├──────────────────────────┼───────────────────────────────┤
│  🎮 CONTROLES           │   🎤 dB: 45.2 🟢 NORMAL      │
│  [MEDIR] [FALAR] [MEME]  │                               │          │                          │                               │
│  [AUTO] [RESET]          │                               │ │                          │                               │
└──────────────────────────┴───────────────────────────────┘
Botões e suas funções
Botão	O que faz	Quando usar
🎙️ Medir Som	Simula uma medição de decibéis	Quando quiser testar o sensor
🗣️ Falar com Robô	Ativa o microfone pra você conversar	Pra fazer perguntas ou dar fofocas
😂 Gerar Meme	Robô escolhe um meme aleatório e LÊ em voz alta	Pra descontrair a aula
🤖 Modo Automático	Robô mede som sozinho a cada 8 segundos	Demonstração autônoma
🔄 Resetar	Limpa tudo e recomeça	Quando quiser zerar o progresso
Reconhecimento de Voz - Comandos Exemplo
javascript
// Coisas que você pode falar para o robô:

"Fala uma fofoca!"           // Robô conta algo engraçado
"Qual o nível de som?"       // Mostra a última medição
"Obrigado, robô!"            // Responde com educação
"Preciso de ajuda"           // Explica as funções
"Conta um meme"              // Gera e lê um meme
"Tá muito barulho aqui"      // Ativa alerta e reclama

// E ele vai entender!
🤖 PERSONALIDADE DO ROBÔ
Sotaque e Gírias Paranaenses
O robô foi programado com o dicionário paranaense oficial (versão humorística):
Gíria	Significado	Exemplo no robô
"Vixi"	Expressão de surpresa	"Vixi, tá alto demais!"
"Piá"	Garoto, jovem	"Fala, piá! Bora medir o barulho?"
"Guria"	Garota, moça	"Ô guria, ó o trem ali!"
"Ó o trem"	Olha só, preste atenção	"Ó o trem, o LED piscou vermelho!"
"Tchê"	Amigo, companheiro	"Tchê, bão demais?"
"Bah"	Interjeição de espanto	"Bah, meu chapa!"
"Cabaço"	Pessoa que reclama muito	"Os cabaço vão reclamar do barulho"
Expressões Faciais do Robô
Situação	Expressão	LED dos olhos
Normal, silêncio	😊	🟢 Verde fixo
Atenção, curioso	🧐	🟢 Verde piscando
Volume moderado (60-75dB)	😲	🟠 Laranja
Alerta (>75dB)	😱	🔴 Vermelho piscando
Falando algo engraçado	😂	🟢 Verde normal
Processando pensamento	🤔	🟡 Amarelo
📁 ESTRUTURA DO PROJETO
bash
robo-fofoqueiro/
│
├── index.html          # Estrutura completa do robô (~400 linhas)
├── style.css           # Tudo que é bonito (~650 linhas)
├── script.js           # A inteligência do robô (~1200 linhas)
│
├── README.md           # Este arquivo que você está lendo
│
└── assets/ (opcional)  # Se quiser adicionar imagens/sons extras
    ├── sounds/
    └── images/
Por que tudo em um só arquivo cada?
FILOSOFIA DO PROJETO: Separado por responsabilidade, mas fácil de distribuir!
index.html → Estrutura (a "ossatura" do robô)
style.css → Estilo (a "roupa" e "maquiagem")
script.js → Comportamento (o "cérebro" e "personalidade")
Vantagem: Você pode mexer em uma parte sem quebrar as outras!
🎓 PLANOS DE AULA INTEGRADOS
O projeto foi desenvolvido para acompanhar 10 planos de aula completos:
📅 Aula	Título	Descrição resumida
Aula 1	"Ambientando o Robô Fofoqueiro: Primeiros passos no Colab"	Instalar bibliotecas (simulado), criar estrutura de pastas, primeiro contato com o código
Aula 2	"Medindo o barulho da galera: o primeiro olho do robô"	Simular sensor KY-038, calcular decibéis, gerar alertas com memes
Aula 3	"O robô ouviu tudo! Agora ele responde"	Implementar Speech-to-Text, dicionário de gírias paranaenses, modo "Libras textual"
Aula 4	"O robô de olho: detectando mãos e QR codes"	MediaPipe para mãos (simulado), leitura de QR codes, interação visual
Aula 5	"Dando alma ao robô: IA generativa com sotaque"	API de IA (ou fallback), Markov para respostas, personalidade única
Aula 6	"O robô pisca e fala: integrando hardware"	Simulação display 16x2, LEDs RGB, alertas visuais
Aula 7	"Visualizando o caos: o mapa do barulho da escola"	Heatmap interativo, gráficos matplotlib (estilo), análise de dados
Aula 8	"O Robô Fofoqueiro ganha vida: integrando tudo!"	Menu interativo, modo automático, sistema completo
Aula 9	"Divulgando o Robô Fofoqueiro"	Roteiro para vídeo, manifesto sobre acessibilidade, edição com legendas
Aula 10	"Levando a inclusão a todas as escolas"	Vosk (STT offline), Markov generator, empacotamento PyInstaller
🏆 SISTEMA DE CONQUISTAS
O robô tem 5 conquistas para desbloquear (como um joguinho!):
#	Nome da Conquista	Como desbloquear	Mensagem
1️⃣	🎯 Primeira Medição	Faça sua primeira medição de som	"Primeira fofoca coletada!"
2️⃣	🚨 Mestre dos Alertas	Acione 10 alertas (som > 75dB)	"10 alertas emitidos!"
3️⃣	👂 Fofoqueiro Nível 5	Colete 5 fofocas (falando ou medindo)	"5 fofocas no arquivo!"
4️⃣	🤫 Silêncio Absoluto	Registre um ambiente muito silencioso (abaixo de 25dB)	"Medição abaixo de 25dB!"
5️⃣	🔥 Inferno Acústico	Registre som acima de 110dB	"Pico máximo quase atingido!"
🧩 COMPONENTES DO SISTEMA
1. Sensor de Som (Simulado)
javascript
// Como funciona o sensor virtual
function simularDB() {
    // Tendência markoviana: se estava alto, continua alto
    let variacao = (Math.random() - 0.5) * 25;
    let novoDB = ultimoDB + variacao;
    
    // Eventos aleatórios (gritos, palmas) - 15% de chance
    if (Math.random() < 0.15) {
        novoDB += 30 + Math.random() * 40;
    }
    
    return Math.min(120, Math.max(15, novoDB));
}
2. Boca Animada (Waveform)
javascript
// 5 linhas independentes que se movem como onda
function iniciarAnimacaoBoca(intensidade) {
    // Cada linha tem fase diferente (onda senoidal)
    const fatorFase = (frame * 0.3 + index * 0.5) * Math.PI;
    const altura = 15 + 25 * intensidade * (Math.sin(fatorFase) * 0.7 + 0.5);
    line.style.height = `${Math.min(45, altura)}px`;
}
3. Reconhecimento de Voz
javascript
// Usa Web Speech API do navegador
const recognition = new webkitSpeechRecognition();
recognition.lang = 'pt-BR';
recognition.onresult = (event) => {
    const fala = event.results[0][0].transcript;
    processarFalaUsuario(fala);
};
4. Síntese de Voz (TTS)
javascript
// Robô lê os memes em voz alta!
const utterance = new SpeechSynthesisUtterance(meme);
utterance.lang = 'pt-BR';
utterance.rate = 0.9;  // Velocidade natural
window.speechSynthesis.speak(utterance);
5. Persistência com LocalStorage
javascript
// Salva tudo automaticamente
const dados = {
    medicoes: state.medicoes,
    conquistas: state.conquistas,
    fofocas: state.fofocas
};
localStorage.setItem('roboFofoqueiro', JSON.stringify(dados));
🐛 POSSÍVEIS PROBLEMAS E SOLUÇÕES
1. 🎤 Microfone não funciona
Sintoma: O robô não ouve quando você clica em "Falar"
Causa: Permissão do navegador bloqueada
Solução:
text
1. Clique no ícone de cadeado na barra de endereço
2. Permita o acesso ao microfone
3. Recarregue a página
Fallback: O robô vai pedir para digitar o texto manualmente
2. 🔊 Robô não fala (sem som)
Sintoma: Os memes aparecem no chat, mas não são lidos
Causa: Navegador bloqueou áudio automático
Solução:
text
1. Clique em qualquer lugar da página primeiro
2. O navegador permite áudio depois de uma interação do usuário
3. Teste o botão "Medir Som" primeiro
3. 🐌 Gráfico lento ou travado
Sintoma: As barras não atualizam suavemente
Causa: Muitas medições acumuladas
Solução:
text
1. Clique em "Resetar"
2. Ou aguarde - o histórico limpa automaticamente após 30 medições
4. 🌐 Reconhecimento de voz em português
Sintoma: O robô entende palavras erradas
Causa: O navegador está configurado em outro idioma
Solução:
text
1. Verifique o idioma do seu sistema operacional
2. No Chrome: Configurações > Idiomas > Português (Brasil)
3. Recarregue a página
5. 📱 No celular/tablet
Sintoma: Alguns botões não funcionam
Causa: Web Speech API tem suporte limitado em mobile
Solução:
text
- Use o botão "Medir Som" (funciona em todos)
- O reconhecimento de voz funciona no Chrome mobile
- O TTS (robô falar) funciona no Android, menos no iOS
🔧 PERSONALIZAÇÃO
Mudar as Gírias Paranaenses
Abra o script.js e procure por giriasParanaenses:
javascript
const giriasParanaenses = {
    saudacoes: [
        "Fala meu parça!",      // ← Adicione suas próprias
        "E aí, piá!",           // ← Pode ser de outras regiões!
        "Opa, bão?"             // ← Personalize à vontade
    ],
    memes: [
        "Seu meme aqui",
        "Outro meme engraçado"
    ]
};
Mudar as Cores do Tema
No style.css, procure por :root:
css
:root {
    --accent-primary: #f59e0b;    /* Laranja do robô */
    --accent-secondary: #ef4444;  /* Vermelho de alerta */
    --accent-success: #10b981;    /* Verde normal */
}

/* Troque para suas cores favoritas! */
Mudar Sensibilidade do Sensor
No script.js, ajuste:
javascript
// Para deixar o robô mais sensível
if (Math.random() < 0.30) {  // Aumente de 0.15 para 0.30
    novoDB += 30 + Math.random() * 40;
}

// Para mudar o limite de alerta (padrão 75dB)
const isAlerta = db > 70;  // Altera para 70dB, por exemplo
Adicionar Novas Conquistas
No script.js, adicione no objeto conquistas:
javascript
conquistas: {
    first_measure: false,
    alert_master: false,
    // NOVA CONQUISTA
    super_fofoqueiro: false  // 20 fofocas
}

// Depois adicione a verificação
if (!state.conquistas.super_fofoqueiro && state.fofocas.length >= 20) {
    desbloquearConquista('super_fofoqueiro', '👑 Super Fofoqueiro - "20 fofocas!"');
}
📈 PRÓXIMAS FUNCIONALIDADES
Versão 3.2 (em planejamento)
•	Reconhecimento de voz OFFLINE com Vosk.js
•	Mais expressões faciais (8 emojis diferentes)
•	Modo "Festa" com cores neon pulsantes
•	Exportar fofocas para CSV/JSON
Versão 4.0 (sonho distante)
•	Integração com Arduino real (LEDs físicos)
•	Versão em React/Next.js
•	Aplicativo mobile (React Native)
•	API para compartilhar fofocas anônimas
Quer ajudar? Faça um fork e mande seu pull request! 🙌
👩‍🏫 CRÉDITOS
Autora
Gisele Nunes - Professora, desenvolvedora e entusiasta da acessibilidade
text
📧 Contato: gisele.nunes@escola.pr.gov.br
🐙 GitHub: @gisenunes
🎓 Lattes: http://lattes.cnpq.br/...
Inspirações
•	Planos de aula - Base Nacional Comum Curricular (BNCC)
•	Referencial Curricular do Paraná (RCP) - Secretaria de Educação do PR
•	Projeto "Robô Assistivo" - Laboratório de Acessibilidade da UTFPR
•	Gírias paranaenses - Consultoria com alunos do Ensino Médio (turma 2026)
Agradecimentos Especiais
•	Turma do 2º ano do Ensino Médio - Colégio Estadual do Paraná
•	Equipe de tecnologia da SEED-PR
•	Comunidade open source de JavaScript e Web Speech API
📄 LICENÇA
text
MIT License

Copyright (c) 2026 Gisele Nunes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
🎉 FIM (POR ENQUANTO)
text
    _______________________________
   /                               \
  |   🤖 "Valeu meu parça!         |
  |    Bora espalhar acessibilidade|
  |    com muito meme e educação!" |
   \_______________________________/
          ||      ||
          ||      ||
         (__)    (__)
          \______/
Robô Fofoqueiro da Acessibilidade - 2026
"Ó o trem: tecnologia, inclusão e humor podem (e devem) andar juntos!"
📌 Cite este projeto:
text
NUNES, Gisele. Robô Fofoqueiro da Acessibilidade: Sistema de medição sonora 
com personalidade regional. Colégio Estadual do Paraná, 2026. Disponível em: 
<https://github.com/seu-usuario/robo-fofoqueiro>. Acesso em: [data].
✅ Checklist para avaliar/comentar este README:
•	Li tudo e entendi o projeto
•	Testei e funcionou no meu computador
•	O robô tem personalidade (as gírias são engraçadas!)
•	A boca se move direito
•	Os memes são lidos em voz alta
Sugestões? Abra uma issue no GitHub ou mande um e-mail! 💌
javascript
// Última linha do README (sim, é um código)
console.log("🤖 Robô Fofoqueiro README carregado com sucesso!");
console.log("📚 Bons estudos, piá! Ó o trem!");
________________________________________

