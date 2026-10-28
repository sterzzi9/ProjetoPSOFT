<div align="center">

# HelpSanca | EG3 Solutions - PSOFT

<img width="1583" alt="HelpSanca Banner" src="https://github.com/user-attachments/assets/91079334-12e8-4d3a-96d4-b7df340545e1" />

<br/>

[![Landing Page](https://img.shields.io/badge/🌐_Acesse_a-Landing_Page-blue?style=for-the-badge)](https://giulianodanellipau.github.io/HelpSanca-LandingPage/)

</div>

---

## 👥 A Equipe: EG3 Solutions

| Foto / Membro | Função | Atribuições |
| :--- | :--- | :--- |
| **Giuliano** | Líder | Full-Stack & Banco de Dados |
| **Ester** | Analista | Front-end & Design UI/UX |
| **Gabrielle** | Integrante | Front-end & Design UI/UX |
| **Gustavo** | Integrante | Back-end |

---

## 🌐 Landing Page & QR Code

| **Acesse Online** | **Acesso via QR Code** |
| :---: | :---: |
| 🔗 [HelpSanca Landing Page](https://giulianodanellipau.github.io/HelpSanca-LandingPage/) | <img width="200" height="200" alt="QR Code HelpSanca" src="https://github.com/user-attachments/assets/71d324c4-3077-4cb8-ac67-90d4f6d949ae" /> |

---

## 📌 1. O Projeto

**HelpSanca** é um aplicativo voltado para indicar e monitorar problemas urbanos reportados pelos próprios cidadãos. O sistema facilita a denúncia de ocorrências do dia a dia, tais como:

* Buracos em vias públicas
* Vazamento de esgoto
* Acúmulo de entulho
* *Entre outros problemas urbanos...*

---

## 👤 2. Personas

> **Maria (33 anos, Advogada)**  
> Reside em um local com problemas de infraestrutura recorrentes que raramente são reportados e resolvidos pelos órgãos públicos. Utiliza o aplicativo para alertar outros moradores da região sobre os perigos locais.

> **Márcio (54 anos, Prefeito)**  
> Utiliza a plataforma para acompanhar as reclamações e chamados feitos pelos munícipes, garantindo mais segurança, agilidade nas manutenções e um ambiente mais civilizado para a população.

---

## 🛑 3. Dores do Cliente

* Perigos recorrentes causados pela falta de infraestrutura urbana.
* Dificuldade e falta de canais diretos para reportar problemas aos órgãos públicos e avisar outros moradores.
* Ausência de instruções claras de localização para informar a posição exata de um problema ou acidente.

---

## 🎯 4. Requisitos

### ⚙️ Funcionais *(O que o sistema faz)*
- [x] **Gerenciamento de usuários:** Tela de login e cadastro.
- [x] **Gerenciamento do mapa regional:** Exibição interativa das ocorrências.
- [x] **Processamento de avisos:** Tratamento dos dados enviados pelos usuários.
- [x] **Busca por CEP:** Localização rápida de áreas com problemas reportados.
- [x] **Gerenciamento de ocorrências:** Controle e histórico de chamados criados.

### 🔒 Não Funcionais *(Performance, Segurança e Padrões)*
- [x] **Segurança:** Proteção e integridade dos dados trafegados.
- [x] **Compatibilidade:** Suporte às versões mais recentes dos principais navegadores.
- [x] **Design do Sistema:** Utilização de paleta de cores padronizada.
- [x] **Responsividade:** Interface adaptável para diferentes tamanhos de tela.
- [x] **Conformidade:** Total alinhamento com as diretrizes da LGPD.

---

## 🔄 5. Funcionamento

1. **Acesso e Autenticação:** A página inicial dispõe de botões para **Login** (e-mail e senha), **Cadastro** (nome, e-mail, usuário e senha) e **Redefinição de Senha**.
2. **Navegação Principal:** Após se autenticar, o usuário é direcionado para o painel principal com um mapa interativo contendo os alertas reportados por outros moradores.
3. **Criando um Alerta:** Na parte inferior da tela, o botão com o ícone **"+"** abre uma aba para registrar uma nova ocorrência. São informados:
   * Tipo da situação
   * Descrição breve
   * Localização exata
   * Horário do ocorrido
4. **Encaminhamento:** Ao finalizar a denúncia, um aviso é enviado ao órgão especializado responsável.

---

## 🛠️ 6. Tecnologias Utilizadas

| Categoria | Tecnologias |
| :--- | :--- |
| **Front-end & Mobile** | `HTML5` • `CSS3` • `JavaScript` |
| **Back-end & Banco de Dados** | `Java` • `MySQL` |
| **APIs e Serviços** | `Leaflet e OpenStreetMap API` |

---

## 🚀 7. Rodando o Projeto (Localmente no Computador)

Siga os passos abaixo para executar a aplicação em seu ambiente de desenvolvimento:

1. **Clone do Repositório:**  
   Faça o clone do código-fonte a partir da branch `master`.

2. **Banco de Dados:**  
   Instale o **MySQL Workbench**. *(Dúvidas? Consulte este [Tutorial de Instalação do MySQL](https://www.youtube.com/watch?v=9dfmJ4jNQrk))*.

3. **Executando o Back-end:**  
   * Abra e suba a aplicação Back-end utilizando o **IntelliJ IDEA**. *(Caso não possua, veja este [Tutorial de Instalação do IntelliJ IDEA](https://www.youtube.com/watch?v=W_Pq8GsIIGM))*.
   * **Atenção:** Atualize as credenciais no arquivo de configuração do projeto:  
     `src/main/resources/application.properties` (Altere para a senha cadastrada no seu MySQL Workbench, se necessário).

4. **Executando o Front-end:**  
   * Abra e execute a aplicação Front-end utilizando o **VSCode**. *(Caso precise instalar, veja este [Tutorial de Instalação do VSCode](https://www.youtube.com/watch?v=oDgjp7PfX7c))*.
