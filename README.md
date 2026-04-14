# df-fluxo
Sistema Inteligente de Monitoramento de Tráfego Urbano para o Distrito Federal.
> [cite_start]**Sistema Inteligente de Monitoramento de Tráfego Urbano para o Distrito Federal.** [cite: 4, 6]

## 📋 Resumo Executivo
[cite_start]O DF Fluxo é um sistema de monitoramento inteligente de tráfego urbano para o Distrito Federal[cite: 14]. [cite_start]A solução integra visão computacional, aprendizado de máquina e uma API de distribuição de dados para transformar as câmeras existentes nas vias do GDF em sensores ativos de inteligência[cite: 15]. [cite_start]O objetivo é reduzir o tempo de resposta a incidentes, prever congestionamentos com antecedência e fornecer rotas alternativas aos motoristas em tempo real, melhorando a mobilidade urbana de forma econômica e escalável[cite: 16].

---

## 🚨 O Problema
[cite_start]Brasília apresenta um dos piores índices de mobilidade urbana do Brasil[cite: 21]. [cite_start]Vias como o Eixo Rodoviário Norte-Sul, a EPNB (DF-047) e os corredores de acesso a cidades satélites acumulam congestionamentos diários nos períodos de pico[cite: 22]. [cite_start]Acidentes e incidentes nessas vias levam em média 23 minutos para serem tratados, agravando o fluxo de veículos[cite: 23].

**Lacunas identificadas:**
* [cite_start]**Ausência de análise automatizada:** Monitoramento atual é 100% manual[cite: 25].
* [cite_start]**Falta de predição:** Resposta reativa a incidentes, sem modelos preditivos[cite: 25].
* [cite_start]**Sem alertas proativos:** Motoristas não recebem avisos de rotas alternativas antecipadamente[cite: 25].
* [cite_start]**Dados fragmentados:** Sistemas isolados entre DETRAN-DF, DER-DF e PMDF[cite: 25].

---

## 💡 A Solução e Arquitetura
[cite_start]A arquitetura é dividida em 4 camadas principais[cite: 32]:

| Camada | Função | Tecnologia/Hardware |
| :--- | :--- | :--- |
| **1. Captura** | Câmeras IP nas vias + sensores | [cite_start]Reutilização da infraestrutura existente do GDF [cite: 33, 41] |
| **2. Edge Computing** | Processamento local | [cite_start]Servidores de borda (NVIDIA Jetson ou x86 com GPU) com YOLO [cite: 33, 41] |
| **3. Nuvem / Backend** | Servidor central | [cite_start]AWS EC2 / Azure VM, ML preditivo e API REST [cite: 33, 41] |
| **4. Interface** | Visualização e Alertas | [cite_start]Dashboard Web para operadores e App/Waze para motoristas [cite: 33] |

### 🔄 Fluxo de Dados
1. [cite_start]Câmera IP captura frame de vídeo a cada 500ms[cite: 36].
2. [cite_start]Servidor de borda executa modelo YOLO: conta veículos e estima velocidade média[cite: 36].
3. [cite_start]Dados são enviados via MQTT ao servidor central na nuvem[cite: 36].
4. [cite_start]Modelo ML compara com histórico e calcula índice de congestionamento[cite: 36].
5. [cite_start]API REST disponibiliza os dados em tempo real[cite: 36].
6. [cite_start]Dashboard exibe mapa de calor para operadores do DETRAN-DF[cite: 36].
7. [cite_start]Se congestionamento previsto > limiar, alerta é enviado ao app/Waze[cite: 36].

---

## 🛠️ Stack Tecnológico

**Software:**
* [cite_start]**Visão Computacional:** YOLOv8 (Python) [cite: 49]
* [cite_start]**Comunicação:** MQTT (broker Mosquitto) [cite: 49]
* [cite_start]**Banco de Dados:** PostgreSQL + TimescaleDB [cite: 49]
* [cite_start]**Machine Learning:** Scikit-learn / Prophet [cite: 49]
* [cite_start]**Backend:** FastAPI (Python) [cite: 49]
* [cite_start]**Frontend:** React + Leaflet.js [cite: 49]
* [cite_start]**Integrações:** Waze for Cities API e LLM via API (IA Generativa futura) [cite: 49]

**Hardware:**
* [cite_start]Câmeras IP (Existentes) [cite: 41]
* [cite_start]Servidor de Borda Edge (Novo) [cite: 41]
* [cite_start]Servidor Central em Nuvem (Novo) [cite: 41]
* [cite_start]Sensores de Velocidade / Radares (Opcional) [cite: 41]

---

## 🚀 Impacto Esperado
* [cite_start]Redução do tempo médio de resposta a incidentes de 23 min para menos de 8 min[cite: 73].
* [cite_start]Previsão de congestionamentos com até 30 minutos de antecedência[cite: 74].
* [cite_start]Integração com Waze for Cities para alertas a mais de 2 milhões de usuários no DF[cite: 75].
* [cite_start]Dashboard centralizado unificando dados do DETRAN-DF, DER-DF e PMDF[cite: 76].
* [cite_start]Escalabilidade para absorver novas câmeras sem reescrever a arquitetura[cite: 77].

---

## 🔗 Links do Projeto
* [cite_start][Dashboard Figma](https://figma.com/seu-usuario/df-fluxo-dashboard) - Protótipo de alta fidelidade da interface web[cite: 64, 65].
* [cite_start][Simulação Tinkercad](https://tinkercad.com/things/seu-projeto-df-fluxo) - Simulação de hardware com Arduino[cite: 68].

---
[cite_start]*Projeto desenvolvido para a disciplina de Introdução à Infraestrutura de TI do CEUB (Avaliação AV01 - Projeto Técnico).* [cite: 1, 7, 8, 9, 10]
