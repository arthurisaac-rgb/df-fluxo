# 🚦 DF Fluxo

> **Sistema Inteligente de Monitoramento de Tráfego Urbano para o Distrito Federal.**

## 📋 Resumo Executivo
O DF Fluxo é uma solução que integra visão computacional, aprendizado de máquina e APIs para transformar as câmeras das vias do GDF em sensores inteligentes. O foco é reduzir o tempo de resposta a incidentes e prever congestionamentos em tempo real.

---

## 🚨 O Problema
Brasília sofre com altos índices de congestionamento em eixos como EPNB (DF-047) e acessos a Taguatinga e Ceilândia. Atualmente, o monitoramento é manual e a resposta a acidentes leva, em média, 23 minutos.

**Lacunas identificadas:**
* **Monitoramento Manual:** Falta de análise automatizada nas câmeras.
* **Falta de Predição:** Sem modelos para antecipar o tráfego.
* **Dados Fragmentados:** Órgãos como DETRAN, DER e PMDF operam de forma isolada.

---

## 💡 A Solução e Arquitetura
O sistema é dividido em quatro camadas principais:

1. **Captura:** Uso das câmeras IP e sensores já instalados nas vias.
2. **Edge Computing:** Processamento local com YOLO para detecção de veículos.
3. **Nuvem (Backend):** Servidor central para banco de dados e modelos preditivos.
4. **Interface:** Dashboard para o DETRAN-DF e integração com Waze para motoristas.

---

## 🛠️ Stack Tecnológico

* **Visão Computacional:** YOLOv8
* **Backend:** FastAPI (Python)
* **Banco de Dados:** PostgreSQL + TimescaleDB
* **Machine Learning:** Scikit-learn / Prophet
* **Comunicação:** Protocolo MQTT
* **Frontend:** React + Leaflet.js

---

## 🚀 Impacto Esperado
* Redução do tempo de resposta a incidentes para menos de 8 minutos.
* Previsão de tráfego com 30 minutos de antecedência.
* Alertas proativos para mais de 2 milhões de usuários via Waze.
* Dashboard unificado para tomada de decisão conjunta entre órgãos públicos.

---
*Projeto desenvolvido para a disciplina de Introdução à Infraestrutura de TI do CEUB (Projeto Técnico AV01).*
