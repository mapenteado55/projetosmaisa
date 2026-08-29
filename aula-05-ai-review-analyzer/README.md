Aula 05 — AI Review Analyzer

Visão geral

Automação para análise inteligente de avaliações de clientes utilizando n8n, OpenAI, Telegram e e-mail.

A solução recebe uma review pelo Telegram, prepara os dados, envia o conteúdo para a IA, trata a resposta e devolve a análise automaticamente.

Problema

Avaliações de clientes contêm informações importantes sobre produtos, serviços e experiência de consumo. Em grande volume, a análise manual consome tempo e dificulta a identificação de padrões.

Solução

Telegram
   ↓
Parâmetros Iniciais
   ↓
Normalização
   ↓
Prompt / Few-Shot
   ↓
OpenAI
   ↓
Formatação do Resultado
   ↓
Telegram + E-mail

Etapas do workflow

START — Telegram Trigger — recebe a mensagem.

Parâmetros Iniciais — organiza os dados.

Normalizador — padroniza a entrada.

Cérebro — Reviews — envia a requisição à OpenAI.

Formatar Resultado Review — trata a resposta da IA.

Telegram — Resposta — entrega a análise no Telegram.

Enviar Email Review — envia a análise por e-mail.

Conceitos aplicados

Inteligência Artificial Generativa

Prompt Engineering

Few-Shot Prompting

Automação de workflows

APIs REST

JSON

JavaScript

Telegram

E-mail

Teste E2E (End-to-End)

Tecnologias

Tecnologia

Aplicação

n8n

Orquestração

OpenAI API

Processamento com IA

Telegram

Entrada e saída

JavaScript

Tratamento de dados

HTTP/REST

Comunicação com a API

E-mail

Segunda saída

Arquitetura



Estrutura

aula-05-ai-review-analyzer/
├── README.md
├── workflow/
│   └── ai-review-analyzer.json
└── docs/
    └── workflow.png

Segurança

Nunca publicar API Keys, tokens, senhas, Client Secrets, arquivos .env, credenciais de e-mail ou dados pessoais desnecessários.

As credenciais devem permanecer armazenadas de forma segura no n8n.

Resultado

O projeto demonstra a conexão entre entrada de dados → automação → IA → tratamento → distribuição.

Competências demonstradas

n8n · OpenAI API · Prompt Engineering · Few-Shot Prompting · JavaScript · APIs REST · JSON · Telegram · Automação de Processos · IA Generativa
