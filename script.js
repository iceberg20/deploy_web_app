// Altere ou acrescente perguntas neste array para personalizar a atividade.
const perguntas = [
  {categoria:"Instituição",pergunta:"O que significa a sigla IFRN?",opcoes:["Instituto Federal do Rio Grande do Norte","Instituto de Formação Regional Nacional","Instituto Federal da Região Nordeste","Instituição Federal de Redes Nacionais"],correta:0,explicacao:"IFRN significa Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte."},
  {categoria:"Educação",pergunta:"O IFRN é uma instituição de ensino de qual rede?",opcoes:["Rede privada","Rede estadual","Rede federal","Rede municipal"],correta:2,explicacao:"O IFRN integra a Rede Federal de Educação Profissional, Científica e Tecnológica."},
  {categoria:"História",pergunta:"Em que ano foram criados os Institutos Federais pela Lei nº 11.892?",opcoes:["1996","2008","2014","2020"],correta:1,explicacao:"A Lei nº 11.892, de 29 de dezembro de 2008, criou os Institutos Federais."},
  {categoria:"Ensino",pergunta:"O que caracteriza um curso técnico integrado ao Ensino Médio?",opcoes:["Apenas disciplinas técnicas","Ensino Médio e formação técnica em um mesmo percurso","Aulas exclusivamente on-line","Apenas disciplinas universitárias"],correta:1,explicacao:"A modalidade integrada reúne formação geral do Ensino Médio e formação técnica."},
  {categoria:"Atuação",pergunta:"Além do ensino, quais atividades fazem parte da missão dos Institutos Federais?",opcoes:["Somente esportes","Somente exames","Pesquisa e extensão","Somente concursos públicos"],correta:2,explicacao:"Ensino, pesquisa e extensão são atividades centrais dos Institutos Federais."},
  {categoria:"Localização",pergunta:"Em qual estado brasileiro está localizado o IFRN?",opcoes:["Rio Grande do Sul","Rio Grande do Norte","Paraíba","Ceará"],correta:1,explicacao:"O IFRN atua em diferentes municípios do Rio Grande do Norte."},
  {categoria:"Acesso",pergunta:"O ensino regular ofertado pelo IFRN, como instituição pública federal, é: ",opcoes:["Obrigatoriamente pago","Gratuito","Exclusivo de moradores de Natal","Restrito a servidores públicos"],correta:1,explicacao:"O ensino público nas instituições oficiais é gratuito, conforme a Constituição Federal."},
  {categoria:"Tecnologia",pergunta:"Qual destas áreas pode fazer parte da formação profissional oferecida por Institutos Federais?",opcoes:["Informática","Somente astronomia","Somente direito","Exclusivamente medicina"],correta:0,explicacao:"A Informática é uma das áreas de formação profissional em campi do IFRN."},
  {categoria:"Estrutura",pergunta:"Como são chamadas as unidades do IFRN distribuídas em diferentes cidades?",opcoes:["Campi","Embaixadas","Comarcas","Ministérios"],correta:0,explicacao:"Cada unidade é denominada campus (plural: campi)."},
  {categoria:"Cidadania",pergunta:"Qual alternativa melhor representa um dos objetivos da educação pública federal?",opcoes:["Restringir a produção de conhecimento","Promover formação profissional e cidadã","Substituir todas as escolas privadas","Oferecer apenas cursos rápidos"],correta:1,explicacao:"A formação integral busca desenvolver conhecimentos, competências e cidadania."}
];

const $ = id => document.getElementById(id);
let indice = 0;
let pontos = 0;
let respondida = false;

function mostrar(id) {
  ["boas-vindas", "quiz", "resultado"].forEach(secao => $(secao).classList.toggle("oculto", secao !== id));
}
function carregarPergunta() {
  respondida = false;
  const atual = perguntas[indice];
  $("contador").textContent = `Pergunta ${indice + 1} de ${perguntas.length}`;
  $("pontuacao").textContent = `${pontos} ${pontos === 1 ? "ponto" : "pontos"}`;
  $("barra").style.width = `${indice / perguntas.length * 100}%`;
  document.querySelector(".trilha").setAttribute("aria-valuenow", String(indice));
  $("categoria").textContent = atual.categoria;
  $("pergunta-titulo").textContent = atual.pergunta;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  $("proxima").classList.add("oculto");
  $("opcoes").replaceChildren();
  atual.opcoes.forEach((opcao, posicao) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "opcao";
    botao.textContent = `${String.fromCharCode(65 + posicao)}. ${opcao}`;
    botao.addEventListener("click", () => responder(posicao));
    $("opcoes").appendChild(botao);
  });
}
function responder(escolha) {
  if (respondida) return;
  respondida = true;
  const atual = perguntas[indice];
  const acertou = escolha === atual.correta;
  if (acertou) pontos++;
  [...$("opcoes").children].forEach((botao, posicao) => {
    botao.disabled = true;
    if (posicao === atual.correta) botao.classList.add("correta");
    else if (posicao === escolha) botao.classList.add("incorreta");
  });
  $("feedback").textContent = `${acertou ? "✓ Resposta correta!" : "✗ Resposta incorreta."} ${atual.explicacao}`;
  $("feedback").classList.add(acertou ? "acerto" : "erro");
  $("pontuacao").textContent = `${pontos} ${pontos === 1 ? "ponto" : "pontos"}`;
  $("barra").style.width = `${(indice + 1) / perguntas.length * 100}%`;
  document.querySelector(".trilha").setAttribute("aria-valuenow", String(indice + 1));
  $("proxima").textContent = indice === perguntas.length - 1 ? "Ver resultado →" : "Próxima pergunta →";
  $("proxima").classList.remove("oculto");
}
function finalizar() {
  mostrar("resultado");
  $("placar-final").textContent = `${pontos} / ${perguntas.length}`;
  $("mensagem-final").textContent = pontos === perguntas.length ? "Excelente! Você acertou todas as questões!" : pontos >= 7 ? "Muito bem! Você conhece bastante o IFRN." : pontos >= 4 ? "Bom começo! Continue aprendendo sobre o IFRN." : "Que tal conhecer melhor o IFRN e tentar novamente?";
}
function iniciar() { indice = 0; pontos = 0; mostrar("quiz"); carregarPergunta(); }
$("comecar").addEventListener("click", iniciar);
$("reiniciar").addEventListener("click", iniciar);
$("proxima").addEventListener("click", () => { indice++; if (indice >= perguntas.length) finalizar(); else carregarPergunta(); });
