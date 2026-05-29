document.addEventListener('DOMContentLoaded', () => {
    const titulo = document.querySelector('h1');
    if (!titulo) return; // Segurança caso o h1 não exista na página

    const textoOriginal = titulo.textContent;
    titulo.textContent = ''; // Limpa o texto para começar a digitar
    
    let index = 0;
    const velocidade = 100; // Tempo em milissegundos entre cada letra

    function digitar() {
        if (index < textoOriginal.length) {
            titulo.textContent += textoOriginal.charAt(index);
            index++;
            setTimeout(digitar, velocidade);
        }
    }

    digitar(); // Inicia a animação
});   



  //animçao para entrada//

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Cria os elementos da tela de entrada dinamicamente pelo JS
    const telaEntrada = document.createElement('div');
    const textoStatus = document.createElement('div');
    
    // 2. Estiliza a tela de entrada (Tema Tecnologia/Futuro) com aspas corrigidas
    Object.assign(telaEntrada.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        color: '#088c93',
        zIndex: '9999',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'monospace',
        fontSize: '24px',
        transition: 'opacity 1s ease, transform 1s ease',
        pointerEvents: 'all'
    });

    // 3. Texto simulando carregamento de sistema
    textoStatus.textContent = 'INICIALIZANDO SISTEMA...';
    telaEntrada.appendChild(textoStatus);
    document.body.appendChild(telaEntrada);

    // 4. Sequência de animação da entrada
    setTimeout(() => {
        textoStatus.textContent = 'CONEXÃO ESTABELECIDA. ACESSANDO O FUTURO...';
        textoStatus.style.color = '#ffffff';
    }, 1500);

    // 5. Some com a tela de entrada e libera o site
    setTimeout(() => {
        telaEntrada.style.opacity = '0';
        telaEntrada.style.transform = 'scale(1.1)'; 
        
        // Remove do HTML após a transição terminar para não travar cliques
        setTimeout(() => {
            telaEntrada.remove();
        }, 1000);
    }, 3500);
});


//animaçao seçao//

// Aguarda a tela de entrada sumir para iniciar a animação das seções
setTimeout(() => {
    const container1 = document.getElementById('container');
    const container2 = document.getElementById('container2');

    // 1. Configura o estilo inicial secreto do Container 1 (invisível e um pouco abaixo)
    if (container1) {
        container1.style.opacity = '0';
        container1.style.transform = 'translateY(40px) scale(0.95)';
        container1.style.transition = 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
        
        // Ativa a animação de entrada do primeiro container após 200ms
        setTimeout(() => {
            container1.style.opacity = '1';
            container1.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }

    // 2. Configura o estilo do Container 2 que está guardado atrás
    if (container2) {
        // Ele começa invisível e escondido na profundidade (efeito 3D tecnológico)
        container2.style.opacity = '0';
        container2.style.transform = 'scale(0.8)';
        container2.style.transition = 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
    }

    // 3. ANIMAÇÃO DE INTERAÇÃO (Quando o usuário rolar a tela, o Container 1 some e o 2 aparece)
    let interagiu = false;

    window.addEventListener('wheel', (evento) => {
        if (evento.deltaY > 0 && !interagiu) {
            // Avança para a segunda seção
            interagiu = true;
            
            container1.style.opacity = '0';
            container1.style.transform = 'translateY(-60px) scale(0.9)';
            container1.style.pointerEvents = 'none'; // Desativa cliques no botão sumido

            container2.style.opacity = '1';
            container2.style.transform = 'scale(1)';
        } else if (evento.deltaY < 0 && interagiu) {
            // Volta para a primeira seção
            interagiu = false;

            container1.style.opacity = '1';
            container1.style.transform = 'translateY(0) scale(1)';
            container1.style.pointerEvents = 'auto';

            container2.style.opacity = '0';
            container2.style.transform = 'scale(0.8)';
        }
    });

    // Se o usuário clicar no seu botão (#botao1), também ativa a transição para a próxima seção
    const botao = document.getElementById('botao1');
    if (botao) {
        botao.addEventListener('click', () => {
            if (!interagiu) {
                interagiu = true;
                container1.style.opacity = '0';
                container1.style.transform = 'translateY(-60px) scale(0.9)';
                container1.style.pointerEvents = 'none';

                container2.style.opacity = '1';
                container2.style.transform = 'scale(1)';
            }
        });
    }

}, 4500); // 4500ms é o tempo exato em que a tela preta de entrada termina de sumir por completo