🤖 AI Review Analyzer — Few-Shot Reviews
<p align="center">
  <strong>Automação inteligente para análise de avaliações com n8n + OpenAI + Telegram</strong>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/n8n-Automation-orange?style=for-the-badge" alt="n8n">
  <img src="https://img.shields.io/badge/OpenAI-API-black?style=for-the-badge" alt="OpenAI">
  <img src="https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge" alt="JavaScript">
  <img src="https://img.shields.io/badge/Telegram-Bot-blue?style=for-the-badge" alt="Telegram">
</p>
📌 Sobre o projeto
Este projeto é uma automação desenvolvida no n8n para transformar uma avaliação enviada pelo Telegram em uma análise estruturada utilizando Inteligência Artificial.
A solução recebe a review, prepara os dados, utiliza Few-Shot Prompting para orientar o modelo, envia a solicitação para a OpenAI API, processa a resposta e entrega o resultado automaticamente por Telegram e e-mail.
> 💡 **Em poucos segundos, uma mensagem simples enviada pelo usuário se transforma em uma análise pronta para consulta.**
---
🎯 Problema
Avaliações de clientes podem gerar informações importantes para uma empresa, mas analisar manualmente grandes volumes de comentários pode consumir tempo e dificultar a identificação de padrões.
Este projeto propõe uma solução automatizada para:
receber avaliações;
interpretar o conteúdo;
identificar o sentimento;
organizar os principais aspectos mencionados;
apresentar o resultado de forma padronizada;
distribuir automaticamente a análise.
---
🚀 Solução
O workflow conecta diferentes tecnologias em um único processo:
```text
Telegram
   ↓
Parâmetros Iniciais
   ↓
Prompt Few-Shot
   ↓
JavaScript
   ↓
OpenAI API
   ↓
Formatação do Resultado
   ↓
┌───────────────────┬───────────────────┐
↓                   ↓
Telegram             E-mail
Resposta             Review
```
🔄 Fluxo do workflow
Telegram — START  
Recebe a mensagem enviada pelo usuário.
Parâmetros Iniciais  
Organiza as informações recebidas e prepara os dados para o processamento.
Montar Prompt Few-Shot  
Constrói dinamicamente as instruções utilizadas pela IA, incluindo exemplos para orientar o comportamento esperado do modelo.
Code in JavaScript  
Realiza o tratamento e a preparação dos dados necessários para a requisição.
Cérebro — Reviews  
Envia uma requisição `POST` para a API da OpenAI e recebe a análise gerada pela Inteligência Artificial.
Formatar Resultado Review  
Processa e organiza a resposta da IA em um formato adequado para apresentação.
Telegram — Resposta  
Retorna a análise diretamente para o usuário.
Enviar Email Review  
Envia a análise formatada por e-mail, criando uma segunda forma de acesso ao resultado.
---
🖥️ Arquitetura
![Workflow n8n](docs/workflow.png)
> Coloque uma captura de tela do workflow em `docs/workflow.png` para exibir a arquitetura acima no GitHub.
---
🧠 Inteligência Artificial e Few-Shot Prompting
Um dos principais pontos técnicos do projeto é a utilização de Few-Shot Prompting.
Em vez de simplesmente enviar a avaliação para o modelo, o workflow fornece exemplos que ajudam a IA a compreender:
o tipo de análise esperada;
como interpretar a avaliação;
como classificar o sentimento;
como estruturar a resposta;
quais informações devem ser priorizadas.
Isso contribui para respostas mais consistentes e alinhadas ao objetivo da automação.
---
💬 Exemplo
Entrada pelo Telegram
```text
O produto chegou, mas não no prazo recomendado.
É bonito como esperado, mas não funcionou.
```
Processamento
```text
Review
  ↓
Prompt Few-Shot
  ↓
OpenAI
  ↓
Análise estruturada
```
Saída
A análise é formatada automaticamente e disponibilizada em dois canais:
📲 Telegram  
O usuário recebe a resposta diretamente no chat.
📧 E-mail  
A análise é enviada em formato organizado para consulta posterior.
---
🛠️ Tecnologias
Tecnologia	Aplicação
n8n	Orquestração de toda a automação
Telegram	Entrada e saída de informações
OpenAI API	Análise da avaliação utilizando IA
JavaScript	Tratamento e preparação dos dados
HTTP POST	Comunicação com a API da OpenAI
E-mail	Distribuição da análise
---
🧩 Conceitos aplicados
Este projeto coloca em prática conceitos de:
🤖 Inteligência Artificial generativa
🧠 Prompt Engineering
🎯 Few-Shot Prompting
🔗 Integração de APIs
⚙️ Automação de workflows
💻 JavaScript
📲 Integração com Telegram
📧 Automação de envio de e-mails
🔄 Manipulação e transformação de dados
🧱 Orquestração de múltiplas etapas
---
📊 Arquitetura técnica
```text
┌──────────────────┐
│     TELEGRAM     │
│  Entrada da      │
│      Review      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    n8n Workflow  │
│                  │
│ Parâmetros       │
│      ↓           │
│ Prompt Few-Shot  │
│      ↓           │
│ JavaScript       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    OpenAI API    │
│                  │
│ Processamento    │
│   com IA         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Formatação do    │
│     Resultado    │
└────────┬─────────┘
         │
      ┌──┴──┐
      ▼     ▼
┌────────┐ ┌────────┐
│Telegram│ │ E-mail │
└────────┘ └────────┘
```
---
🔐 Segurança
As credenciais utilizadas no projeto não devem ser publicadas no GitHub.
Nunca exponha:
API Keys da OpenAI;
Token do bot do Telegram;
credenciais de e-mail;
senhas;
chaves ou tokens de serviços externos.
Para disponibilizar o workflow publicamente, utilize as funcionalidades de Credentials do n8n e/ou variáveis de ambiente conforme a arquitetura de implantação.
---
⚙️ Como executar
Pré-requisitos
Você precisará de:
uma instância do n8n;
um bot do Telegram;
uma chave de acesso à OpenAI API;
uma conta/serviço para envio de e-mail.
Passos
Clone este repositório:
```bash
git clone SEU_REPOSITORIO_AQUI
```
Importe o workflow no n8n.
Configure as credenciais do Telegram.
Configure a autenticação da OpenAI API.
Configure o serviço de envio de e-mail.
Revise as variáveis utilizadas nos nodes.
Ative o workflow.
Envie uma review para o bot no Telegram.
Confira a análise recebida no Telegram e no e-mail.
---
📁 Estrutura sugerida do repositório
```text
ai-review-analyzer/
│
├── README.md
│
├── workflow/
│   └── ai-review-analyzer.json
│
├── docs/
│   └── workflow.png
│
└── .gitignore
```
> ⚠️ O arquivo exportado do n8n deve ser revisado antes de ser publicado para garantir que nenhuma credencial ou informação sensível esteja presente.
---
💼 Aplicações reais
A mesma arquitetura pode ser adaptada para diferentes necessidades:
análise de avaliações de produtos;
pesquisas de satisfação;
feedback de clientes;
classificação de comentários;
monitoramento de opinião;
análise de atendimento;
identificação de pontos positivos e negativos;
geração de insights para equipes;
automação de relatórios.
---
📈 Possíveis melhorias
O projeto pode evoluir para uma solução ainda mais completa, por exemplo:
[ ] Armazenar as reviews em banco de dados.
[ ] Criar dashboard com indicadores de sentimento.
[ ] Gerar relatórios periódicos automaticamente.
[ ] Adicionar classificação por categorias.
[ ] Criar histórico de avaliações.
[ ] Integrar com Google Sheets, CRM ou ferramentas de BI.
[ ] Adicionar tratamento de erros e reprocessamento.
[ ] Criar métricas sobre volume de avaliações positivas, neutras e negativas.
[ ] Permitir análise de múltiplas avaliações em lote.
---
🌟 Por que este projeto é relevante?
Este projeto demonstra a aplicação prática de IA em um processo automatizado, indo além de uma simples chamada para um modelo de linguagem.
A solução conecta:
Entrada de dados → processamento → Inteligência Artificial → transformação → distribuição
Esse tipo de arquitetura pode ser aplicado em diferentes processos empresariais para reduzir tarefas manuais e acelerar a geração de informações.
---
👩‍💻 Sobre o projeto
Projeto desenvolvido como parte da construção de portfólio na área de:
Tecnologia • Inteligência Artificial • Automação • Integração de APIs
O objetivo é demonstrar, na prática, como ferramentas de automação podem ser combinadas com IA para criar soluções úteis e aplicáveis a processos reais.
---
⭐ Competências demonstradas
n8n · OpenAI API · Prompt Engineering · Few-Shot Prompting · JavaScript · APIs REST · Telegram Bots · Automação de Processos · Integração de Sistemas · IA Generativa
---
<p align="center">
  Desenvolvido com foco em automação, Inteligência Artificial e aprendizado prático.
</p>
