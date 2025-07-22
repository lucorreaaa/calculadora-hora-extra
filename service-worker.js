<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#000000" />
  <link rel="manifest" href="manifest.json" />
  <link rel="apple-touch-icon" href="icons/icon-180.png" />
  <title>Calculadora de Hora Extra</title>
  <style>
    :root {
      --bg-color: #121212;
      --text-color: #ffffff;
      --card-bg: #1e1e1e;
      --input-bg: #2c2c2c;
      --btn-bg: #007bff;
    }

    body.light {
      --bg-color: #f2f2f2;
      --text-color: #000000;
      --card-bg: #ffffff;
      --input-bg: #e6e6e6;
      --btn-bg: #007bff;
    }

    body {
      margin: 0;
      padding: calc(env(safe-area-inset-top, 0px) + 16px) 16px 16px;
      background-color: var(--bg-color);
      color: var(--text-color);
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      transition: background-color 0.3s, color 0.3s;
    }

    .container {
      width: 100%;
      max-width: 420px;
    }

    .theme-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--card-bg);
      border: none;
      font-size: 1.4rem;
      cursor: pointer;
      padding: 10px;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      color: var(--text-color);
      z-index: 999;
      transition: background-color 0.3s, color 0.3s;
    }

    h1 {
      text-align: center;
      font-size: 1.3rem;
      margin-bottom: 30px;
    }

    label {
      display: block;
      margin-top: 14px;
      font-weight: bold;
    }

    input, select {
      width: 100%;
      padding: 10px;
      margin-top: 4px;
      border-radius: 12px;
      border: none;
      background-color: var(--input-bg);
      color: var(--text-color);
      box-sizing: border-box;
    }

    select {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      padding-right: 2.5rem;
      background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 1rem;
    }

    button {
      width: 100%;
      margin-top: 16px;
      padding: 12px;
      background-color: var(--btn-bg);
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 12px;
      cursor: pointer;
    }

    .resultado {
      margin-top: 24px;
      padding: 16px;
      background-color: var(--card-bg);
      border-radius: 12px;
    }

    .resultado p {
      margin: 8px 0;
    }

    .fade {
      animation: fadeIn 0.4s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Calculadora de Hora Extra</h1>

    <label for="salario">💰 Salário Bruto (R$):</label>
    <input type="number" id="salario" placeholder="Informe seu salário bruto mensal.">

    <label for="horas">⏰ Horas Extras Trabalhadas:</label>
    <input type="number" id="horas" placeholder="Total de horas extras no mês.">

    <label for="percentual">📈 Porcentagem da Hora Extra:</label>
    <select id="percentual">
      <option value="0.5">50%</option>
      <option value="0.6" selected>60%</option>
      <option value="0.7">70%</option>
      <option value="0.8">80%</option>
      <option value="0.9">90%</option>
      <option value="1.0">100%</option>
      <option value="2.0">200%</option>
    </select>

    <label for="carga">⚙️ Carga Horária Mensal (horas):</label>
    <input type="number" id="carga" placeholder="Geralmente 156h, 160h ou 220h mensais.">

    <button onclick="calcular()">Calcular</button>
    <button onclick="exemplo()">Preencher com exemplo</button>

    <div class="resultado" id="resultado" style="display: none;"></div>
  </div>

  <button class="theme-toggle" onclick="alternarTema()" title="Alternar tema">🌙</button>

  <script>
    function calcular() {
      const salario = parseFloat(document.getElementById('salario').value);
      const horas = parseFloat(document.getElementById('horas').value);
      const percentual = parseFloat(document.getElementById('percentual').value);
      const carga = parseFloat(document.getElementById('carga').value);
      const resultado = document.getElementById('resultado');

      if (isNaN(salario) || isNaN(horas) || isNaN(percentual) || isNaN(carga) || carga === 0) {
        resultado.innerHTML = "<p>⚠️ Preencha todos os campos corretamente.</p>";
        resultado.style.display = "block";
        resultado.classList.add("fade");
        return;
      }

      const valorHora = salario / carga;
      const valorExtra = valorHora * (1 + percentual);
      const totalExtras = valorExtra * horas;

      resultado.innerHTML = `
        <p>💵 Valor da hora: R$ ${valorHora.toFixed(2)}</p>
        <p>➕ Hora extra (${(percentual * 100).toFixed(0)}%): R$ ${valorExtra.toFixed(2)}</p>
        <p>🧾 Total das horas extras: R$ ${totalExtras.toFixed(2)}</p>
      `;
      resultado.style.display = "block";
      resultado.classList.remove("fade");
      void resultado.offsetWidth;
      resultado.classList.add("fade");

      localStorage.setItem("dados", JSON.stringify({ salario, horas, percentual, carga }));
    }

    function exemplo() {
      document.getElementById('salario').value = 3000;
      document.getElementById('horas').value = 10;
      document.getElementById('percentual').value = 0.6;
      document.getElementById('carga').value = 160;
    }

    function alternarTema() {
      const body = document.body;
      const botao = document.querySelector('.theme-toggle');
      body.classList.toggle('light');

      const temaAtual = body.classList.contains('light') ? 'light' : 'dark';
      botao.textContent = temaAtual === 'light' ? '☀️' : '🌙';
      localStorage.setItem("tema", temaAtual);
    }

    window.onload = function () {
      const dados = JSON.parse(localStorage.getItem("dados"));
      if (dados) {
        document.getElementById('salario').value = dados.salario;
        document.getElementById('horas').value = dados.horas;
        document.getElementById('percentual').value = dados.percentual;
        document.getElementById('carga').value = dados.carga;
      }

      const tema = localStorage.getItem("tema");
      if (tema === "light") {
        document.body.classList.add("light");
        document.querySelector('.theme-toggle').textContent = "☀️";
      }
    };
  </script>
</body>
</html>
