Aula 06 — Customer Intelligence Automation

Visão geral

Automação de Customer Intelligence que transforma feedbacks registrados no Google Sheets em informações estruturadas utilizando n8n, Gemini e Telegram.

Uma nova linha pode iniciar automaticamente o workflow. O feedback é preparado, analisado pela IA, gravado novamente na planilha e gera um alerta operacional no Telegram.

Problema

Empresas recebem muitos comentários de clientes. A análise manual pode atrasar a identificação de reclamações, urgências e oportunidades.

Solução

Google Sheets
      ↓
Nova Linha
      ↓
Normalizar Entrada
      ↓
Montar Prompt Few-Shot
      ↓
Gemini
      ↓
Tratar Resposta IA
      ↓
Atualizar Google Sheets
      ↓
Telegram

Rota de recuperação:

Teste Manual
      ↓
Ler Pendentes
      ↓
Normalizar Entrada
      ↓
mesmo pipeline de IA

O que a IA identifica

Sentimento

Tema

Urgência

Oportunidade

Recomendação

Data/hora da análise

Etapas do workflow

Nova Linha na Planilha — detecta um novo feedback.

Teste Manual — inicia manualmente a rota de recuperação.

Ler Pendentes — recupera registros ainda não processados.

Normalizar Entrada — padroniza os dados.

Montar Prompt Few-Shot — constrói as instruções e exemplos para a IA.

Gemini — Análise — analisa o feedback via API.

Tratar Resposta IA — valida e estrutura a resposta.

Atualizar Planilha — grava a análise na linha original.

Enviar Telegram — envia o alerta final.

Event-Driven Processing

Nova linha apareceu → workflow iniciou automaticamente

O sistema reage a um evento sem exigir execução manual de cada etapa.

Backlog / Recovery

Teste Manual → Ler Pendentes

Permite recuperar registros que já estavam na planilha e ainda precisam ser processados.

Few-Shot Prompting

Exemplos no prompt ajudam a IA a aprender o formato esperado para sentimento, tema, urgência, oportunidade e recomendação.

E2E — End-to-End

O workflow foi validado de ponta a ponta:

Nova linha no Google Sheets
        ↓
n8n detecta
        ↓
Gemini analisa
        ↓
Planilha é atualizada
        ↓
Telegram recebe o alerta

O teste E2E comprova que o sistema completo funciona, não apenas os nodes isoladamente.

Tecnologias

Tecnologia

Aplicação

n8n

Orquestração

Google Sheets

Entrada e armazenamento

Gemini API

Análise com IA

Telegram Bot API

Notificação

JavaScript

Normalização e tratamento

JSON

Estruturação

HTTP/REST

Integração

Arquitetura



Evidências

Planilha processada



Alerta no Telegram



Estrutura

aula-06-customer-intelligence/
├── README.md
├── workflow/
│   └── customer-intelligence.json
└── docs/
    ├── workflow.png
    ├── planilha.png
    └── telegram.png

Segurança

Nunca publicar Gemini API Key, Bot Token do Telegram, Client Secret do Google OAuth, senhas, .env, credenciais ou dados pessoais desnecessários.

As credenciais devem permanecer no ambiente seguro do n8n.

Resultado

O projeto transforma feedback bruto em informação operacional:

o que aconteceu → sentimento → tema → urgência → oportunidade → recomendação → ação.

Competências demonstradas

Customer Intelligence · n8n · Google Sheets · Gemini API · Telegram Bot API · Prompt Engineering · Few-Shot Prompting · APIs REST · JSON · JavaScript · Event-Driven Processing · Automação · Testes E2E
