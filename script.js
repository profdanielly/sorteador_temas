const THEMES = [
  {title:'Startup de Mobilidade Sustentável', desc:'Aplicativo de caronas ecológicas com foco em reduzir emissão de carbono.'},
  {title:'Plataforma de Cursos Online', desc:'Ensino de programação, design e marketing com gamificação.'},
  {title:'Delivery Sustentável', desc:'Entregas com bicicletas elétricas e embalagens biodegradáveis.'},
  {title:'Loja Virtual de Produtos Artesanais', desc:'Marketplace que conecta artesãos locais a consumidores digitais.'},
  {title:'Aplicativo de Saúde e Bem-Estar', desc:'Monitoramento de hábitos, exercícios e consultas online com especialistas.'},
  {title:'Empresa de Robótica Educacional', desc:'Kits de robôs para escolas e cursos de programação para crianças.'},
  {title:'Startup de Realidade Virtual para Turismo', desc:'Experiências imersivas de passeios em museus e pontos turísticos.'},
  {title:'Aplicativo de Finanças Pessoais', desc:'Organização de gastos, dicas de investimento e metas financeiras.'},
  {title:'Plataforma de Streaming Local', desc:'Voltada para produções regionais como filmes, séries e documentários.'},
  {title:'Startup de Agricultura Inteligente', desc:'Sensores IoT para monitorar plantações e otimizar recursos hídricos.'},
  {title:'Aplicativo de Reciclagem e Recompensas', desc:'Usuários ganham pontos por reciclar e trocam por descontos em lojas.'},
  {title:'Empresa de Impressão 3D', desc:'Protótipos rápidos para estudantes, engenheiros e designers.'},
  {title:'Cafeteria Tecnológica', desc:'Espaço híbrido com café, coworking e cardápio interativo em AR.'},
  {title:'Aplicativo de Educação Inclusiva', desc:'Recursos para alunos com deficiência: libras, audiodescrição etc.'},
  {title:'Serviço de Assistente Virtual com IA', desc:'Voltado para pequenas empresas organizarem agenda, finanças e clientes.'},
  {title:'Aplicativo de Segurança Residencial Inteligente', desc:'Sistema de monitoramento por câmeras e sensores conectados ao celular.'},
  {title:'Startup de Moda Sustentável', desc:'Roupas feitas com materiais reciclados e rastreabilidade da produção via QR Code.'}
];

// Elementos DOM
const teamsCountEl = document.getElementById('teamsCount');
const drawBtn = document.getElementById('drawBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsList = document.getElementById('resultsList');
const themesList = document.getElementById('themesList');
const uniqueAssignEl = document.getElementById('uniqueAssign');

// Preenche preview dos temas
function renderThemes(){
  themesList.innerHTML = '';
  THEMES.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${t.title}:</b> ${t.desc}`;
    themesList.appendChild(li);
  });
}

// Função utilitária: embaralhar (Fisher–Yates)
function shuffle(array){
  const arr = array.slice();
  for(let i = arr.length -1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Sorteia e mostra resultados
function draw(){
  const teams = parseInt(teamsCountEl.value, 10) || 1;
  const unique = uniqueAssignEl.checked;
  resultsList.innerHTML = '';

  if(teams < 1){
    alert('Número de equipes inválido');
    return;
  }

  if(unique && teams > THEMES.length){
    if(!confirm(`Você pediu temas únicos, mas só há ${THEMES.length} temas. Deseja permitir repetição?`)) return;
  }

  let pool = THEMES.slice();
  if(unique) pool = shuffle(pool);

  for(let i=1;i<=teams;i++){
    const li = document.createElement('li');
    const teamTitle = document.createElement('b');
    teamTitle.textContent = `Equipe ${i}`;

    let theme;
    if(unique){
      theme = pool[(i-1) % pool.length];
    } else {
      theme = THEMES[Math.floor(Math.random() * THEMES.length)];
    }

    const p = document.createElement('span');
    p.innerHTML = `<b>${theme.title}:</b> ${theme.desc}`;

    li.appendChild(teamTitle);
    li.appendChild(p);
    resultsList.appendChild(li);
  }
}

function reset(){
  resultsList.innerHTML = '';
  teamsCountEl.value = 4;
  uniqueAssignEl.checked = true;
}

// Inicialização
renderThemes();

drawBtn.addEventListener('click', draw);
resetBtn.addEventListener('click', reset);

// Permite sortear com Enter quando o campo number está focado
teamsCountEl.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') draw();
});

