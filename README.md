# Contador de Horas

Um contador regressivo elegante e funcional para uso no OBS (Open Broadcaster Software) ou qualquer outra aplicação de streaming.

## 🚀 Funcionalidades

- **Seleção de Horário**: Interface intuitiva para definir o horário de término
- **Contador Regressivo**: Exibição em tempo real do tempo restante
- **Design Responsivo**: Funciona perfeitamente em diferentes tamanhos de tela
- **Compatível com OBS**: Ideal para uso em transmissões ao vivo
- **Tema Escuro**: Interface moderna com cores vibrantes

## 🎨 Identidade Visual

- **Fundo Principal**: Cinza escuro (#1a1a1a)
- **Cor de Destaque**: Ciano (#00d4ff)
- **Botão de Ação**: Verde (#00ff00)
- **Rodapé**: Cinza claro (#e0e0e0)

## 📱 Como Usar

### 1. Instalação
```bash
npm install
```

### 2. Executar o Projeto
```bash
npm start
```

### 3. Uso no OBS
1. Abra o projeto no navegador
2. Configure o horário desejado
3. Clique em "Salvar"
4. Na tela do timer, use a função "Captura de Navegador" do OBS
5. Configure a URL para `http://localhost:3000/timer`

## 🔧 Tecnologias Utilizadas

- React 18
- React Router DOM
- CSS3 com design responsivo
- JavaScript ES6+

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── TimeSelector.js      # Tela de seleção de horário
│   ├── TimeSelector.css     # Estilos da tela de seleção
│   ├── Timer.js            # Tela do contador regressivo
│   └── Timer.css           # Estilos do contador
├── App.js                  # Componente principal
├── App.css                 # Estilos globais
├── index.js                # Ponto de entrada
└── index.css               # Estilos globais
```

## 🌟 Características Especiais

- **Atualização em Tempo Real**: O contador atualiza a cada segundo
- **Persistência de Dados**: O horário selecionado é salvo no localStorage
- **Validação Inteligente**: Se o horário já passou, automaticamente define para o próximo dia
- **Interface Responsiva**: Adapta-se perfeitamente a diferentes tamanhos de tela
- **Horário de Brasília**: Exibe o horário atual no fuso horário brasileiro

## 🎯 Casos de Uso

- **Streams ao vivo**: Controle o tempo de duração
- **Eventos**: Contagem regressiva para início/fim
- **Apresentações**: Gerenciamento de tempo
- **Treinos**: Cronometragem de exercícios
- **Qualquer situação que precise de contagem regressiva**

## 👨‍💻 Desenvolvido por

**ljgamaral**

---

*Projeto criado com ❤️ para a comunidade de streamers brasileiros*
