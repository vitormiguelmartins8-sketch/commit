// Diálogos Automáticos baseados na história de Vitor Miguel e ficha técnica
const dialogueScript = [
    { 
        user: "Quem está operando este terminal?", 
        ai: "Analisando credenciais de rede... Usuário identificado: VITOR MIGUEL. Desenvolvedor focado em codificação, IA e evolução pessoal constante." 
    },
    { 
        user: "Acesse o arquivo biográfico de Vitor.", 
        ai: "Carregando biografia... <b>'Vitor Miguel: Entre Sonhos, Tecnologia e Superação'</b>.<br><br>Vitor Miguel cresceu em uma época em que a tecnologia estava em todo lugar. Enquanto muitos usavam a internet apenas para entretenimento, ele enxergava oportunidades. Desde cedo, demonstrava curiosidade sobre como as coisas funcionavam. Não se contentava apenas em usar aplicativos, jogos ou sites; queria entender como eram criados de ponta a ponta.<br><br>Com o passar dos anos, essa curiosidade se transformou em interesse por programação, design, inteligência artificial e desenvolvimento digital. Seu grande objetivo e sonho é se consolidar como um <b>Desenvolvedor Full Stack</b> completo, dominando com maestria as engrenagens do Back-end e a interface visual do Front-end. He começou pesquisando, fazendo perguntas, aprendendo sozinho e experimentando novas ideias. Cada projeto era uma oportunidade de adquirir uma habilidade nova.<br><br>Ao mesmo tempo, Vitor desenvolveu uma mentalidade voltada para a evolução pessoal. Não queria apenas crescer profissionalmente; também buscava melhorar fisicamente. Definiu metas, ajustou hábitos, passou a treinar com mais frequência e procurou conhecimento sobre alimentação, desempenho esportivo e disciplina. Para ele, o progresso não acontecia apenas em uma tela de computador, mas também na vida real." 
    },
    { 
        user: "Puxar registros de metas internacionais.", 
        ai: "Buscando diretrizes de longo prazo... Enfrentando desafios comuns como dúvidas e erros, Vitor continuou aprendendo. A tecnologia tornou-se uma das principais ferramentas de sua caminhada. Entre estudos de desenvolvimento web e segurança digital, ele começou a enxergar um futuro em que poderia transformar conhecimento em oportunidades reais. Com o tempo, passou a olhar além das fronteiras do Brasil. Surgiu o desejo de viver experiências internacionais e explorar novas oportunidades, especialmente na <b>Austrália</b>. Esse objetivo se tornou mais do que um sonho distante: transformou-se em uma meta que influenciava suas decisões, seus estudos e seu planejamento." 
    },
    { 
        user: "Como este ambiente web foi construído?", 
        ai: "Puxando logs de desenvolvimento... Toda a estrutura HTML e a estilização visual CSS foram criadas pelo Vitor Miguel. Seu grande objetivo e sonho é se consolidar como um Desenvolvedor completo, dominando as engrenagens do Back-end e a interface do Front-end. A lógica das animações e automação JavaScript foi fornecida pelo Gemini AI, feito sob medida para arrastar engajamento e estrelas no repositório do GitHub dele. Grandes conquistas são construídas por meio de pequenas ações repetidas diariamente. Vitor não quer apenas assistir ao futuro acontecer. Ele quer ajudar a construí-lo. <br><br><b>[SISTEMA AGUARDANDO COMANDO PARA INICIAR EXECUTÁVEL VISUAL...]</b>" 
    }
];

let currentStep = 0;

const mainContent = document.getElementById('main-content');
const userInput = document.getElementById('user-input');
const btnSend = document.getElementById('click-send');
const terminalBody = document.getElementById('terminal-body');
const binaryOverlay = document.getElementById('binary-overlay');

// Máscara ASCII aprimorada e redesenhada para lembrar o formato exato da foto enviada
const fsocietyMask = `
        ⣀⣠⣤⣴⣶⣶⣶⣶⣦⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠀⠀⠀⠀⠀
⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀
⠀⣤⣶⣿⣿⣿⣟⣉⣀⣀⠈⠙⢿⣿⣿⡿⠋⠁⣀⣀⣉⣻⣿⣿⣿⣶⣤⠀
⢈⣿⠄⠈⣻⣿⣿⣿⣿⣿⣷⣀⣨⣿⣿⣅⣀⣾⣿⣿⣿⣿⣿⣟⠁⠠⣿⡁
⠀⣿⠂⣀⣽⣿⣿⡟⠉⠀⠉⢿⣿⣿⣿⣿⡿⠉⠀⠉⢻⣿⣿⣯⣀⠐⣿⠀
⠀⠙⣿⣿⣿⣿⣿⣷⣶⣶⣶⣾⣿⣿⣿⣿⣷⣶⣶⣶⣾⣿⣿⣿⣿⣿⠋⠀
⠀⠀⢻⣿⣿⣿⠿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠿⣿⣿⣿⡟⠀⠀
⠀⠀⠀⠙⣿⠃⠸⣿⣿⡿⠋⠉⠙⠻⠟⠋⠉⠙⢿⣿⣿⠇⠘⣿⠋⠀⠀⠀
⠀⠀⠀⠀⣿⡄⠀⠈⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⠀⢠⣿⠀⠀⠀⠀
⠀⠀⠀⠀⠘⣿⣦⣄⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣠⣴⣿⠃⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠛⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

               [ VITOR MIGUEL // ENTRE SONHOS E TECNOLOGIA ]
`;

window.onload = () => {
    userInput.focus();
};

function triggerNextMessage() {
    // Se o roteiro de diálogos já terminou, o próximo clique do Enter inicia o caos binário manualmente
    if (currentStep >= dialogueScript.length) {
        triggerBinaryChaos();
        return;
    }

    if (!userInput.hasAttribute('disabled')) {
        executeStep(dialogueScript[currentStep]);
        currentStep++;
    }
}

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        triggerNextMessage();
    }
});

btnSend.addEventListener('click', () => {
    triggerNextMessage();
});

function appendLine(text, typeClass) {
    const line = document.createElement('div');
    line.className = `console-line ${typeClass}`;
    line.innerHTML = text;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
    return line;
}

function executeStep(stepData) {
    userInput.setAttribute('disabled', 'true');
    btnSend.setAttribute('disabled', 'true');
    userInput.placeholder = "Processando blocos de dados...";

    appendLine(`<b>[VOCÊ]:</b> ${stepData.user}`, 'user-line');

    setTimeout(() => {
        let loadingLine = appendLine(`<b>[IA]:</b> <span class="system-line">compilando logs...</span>`, 'ai-line');
        
        setTimeout(() => {
            loadingLine.innerHTML = `<b>[IA]:</b> `;
            let charIndex = 0;
            const replyText = stepData.ai;

            let typer = setInterval(() => {
                if (charIndex < replyText.length) {
                    if (replyText.substr(charIndex, 4) === "<br>") {
                        loadingLine.innerHTML += "<br>";
                        charIndex += 4;
                    } else {
                        loadingLine.innerHTML += replyText.charAt(charIndex);
                        charIndex++;
                    }
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                } else {
                    clearInterval(typer);
                    
                    // Libera os botões imediatamente para permitir que o usuário leia no próprio tempo
                    userInput.removeAttribute('disabled');
                    btnSend.removeAttribute('disabled');
                    
                    if (currentStep === dialogueScript.length) {
                        userInput.placeholder = "Pressione ENTER para executar o protocolo final...";
                    } else {
                        userInput.placeholder = "Aperte ENTER para ler o próximo bloco...";
                    }
                    userInput.focus();
                }
            }, 12);
        }, 500);
    }, 200);
}

function triggerBinaryChaos() {
    mainContent.style.display = 'none';
    binaryOverlay.style.display = 'block';
    
    let duration = 0;
    let maxDuration = 45; 

    let streamInterval = setInterval(() => {
        if (duration < maxDuration) {
            let binaryLine = "";
            for (let i = 0; i < 150; i++) {
                binaryLine += Math.random() > 0.5 ? "1" : "0";
            }
            binaryOverlay.innerHTML += binaryLine + "<br>";
            binaryOverlay.scrollTop = binaryOverlay.scrollHeight;
            duration++;
        } else {
            clearInterval(streamInterval);
            
            setTimeout(() => {
                binaryOverlay.innerHTML = "";
                binaryOverlay.style.color = "#ff0033"; 
                
                const preElement = document.createElement('pre');
                preElement.className = 'logo-line';
                binaryOverlay.appendChild(preElement);

                let logoIndex = 0;
                let logoTyper = setInterval(() => {
                    if (logoIndex < fsocietyMask.length) {
                        preElement.innerHTML += fsocietyMask.charAt(logoIndex);
                        logoIndex++;
                        binaryOverlay.scrollTop = binaryOverlay.scrollHeight;
                    } else {
                        clearInterval(logoTyper);
                        
                        const finalMsg = document.createElement('div');
                        finalMsg.className = 'console-line';
                        finalMsg.style.color = '#ffffff';
                        finalMsg.style.textAlign = 'center';
                        finalMsg.style.marginTop = '30px';
                        finalMsg.style.fontSize = '1.2rem';
                        finalMsg.innerHTML = "<b>[ REPOSITÓRIO ATUALIZADO COM SUCESSO // GO TO AUSTRALIA ]</b>";
                        binaryOverlay.appendChild(finalMsg);
                    }
                }, 2);
            }, 400);
        }
    }, 35);
}
