# Projeto Prático – Mensageria Frontend 

## Descrição

Frontend em React para o projeto prático de mensageria em Java, que faz parte da disciplina de Software Concorrente e Distribuído do curso de Engenharia de Software.  
Este frontend oferece interface para interação com os serviços backend (`Order-Service`, `Inventory-Service`, `Notification-Service`) que utilizam Apache Kafka para mensageria em tempo real.

---

## Tecnologias utilizadas

- React 19.1.0  
- Vite (ferramenta de build e dev server)  
- TypeScript  
- TailwindCSS para estilização  
- Headless UI e Heroicons para componentes acessíveis e ícones  
- Framer Motion para animações  
- React Router Dom para roteamento  
- React Toastify para notificações  
- ESLint para qualidade de código  

---

## Scripts disponíveis

| Comando         | Descrição                                     |
|-----------------|-----------------------------------------------|
| `npm run dev`   | Inicializa o servidor de desenvolvimento Vite com hot reload |
| `npm run build` | Compila o projeto para produção               |
| `npm run preview` | Serve a build para testes locais             |
| `npm run lint`  | Roda o ESLint para verificar padrões de código |

---

## Como executar o projeto

### Pré-requisitos

- Node.js (versão compatível com Vite e React 19)  
- npm ou yarn instalado  

### Passos para rodar

1. Clone o repositório:

```bash 
git clone https://github.com/Vitorialuz229/projeto_mensageria_frontend_ufg.git
      
cd projeto_mensageria_frontend_ufg
```

2. Instale as dependências:

```bash
npm install
  # ou
yarn install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
  # ou
yarn dev
```

4. Abra seu navegador e acesse:

```
http://localhost:5173/
```
---

## Integração com backend

Este frontend consome APIs REST expostas pelo `Order-Service`, `Inventory-Service` e exibe notificações processadas pelo `Notification-Service`, que utilizam Apache Kafka para comunicação assíncrona.

---

## Equipe
- Vitória Luz Alves D'Abadia
