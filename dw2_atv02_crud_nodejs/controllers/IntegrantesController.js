const { Integrante, Grupo } = require('../models');

const campos = [
  { name: 'nome', label: 'Nome do integrante', required: true },
  { name: 'grupoId', label: 'Grupo', type: 'select', required: true },
  { name: 'posicao', label: 'Posição no grupo', required: true, placeholder: 'Ex.: Vocalista / Dançarina' },
  { name: 'nacionalidade', label: 'Nacionalidade', required: true },
  { name: 'anoNascimento', label: 'Ano de nascimento', type: 'number', min: 1900, max: 2100, required: true },
  { name: 'imagem', label: 'Caminho da imagem (opcional)', required: false, placeholder: 'integrantes/karina.jpg' }
];

function urlImagem(caminho) {
  if (!caminho) return '';
  return '/imagens/' + String(caminho).replace(/^\/?imagens\//, '').replace(/^\/+/, '');
}

function dadosDoFormulario(body) {
  return {
    nome: String(body.nome || '').trim(),
    grupoId: Number(body.grupoId),
    posicao: String(body.posicao || '').trim(),
    nacionalidade: String(body.nacionalidade || '').trim(),
    anoNascimento: Number(body.anoNascimento),
    imagem: String(body.imagem || '').trim().replace(/^\/?imagens\//, '') || null
  };
}

async function carregarGrupos() {
  return Grupo.findAll({ order: [['nome', 'ASC']] });
}

function dadosValidos(dados) {
  return Boolean(dados.nome && dados.posicao && dados.nacionalidade)
    && Number.isInteger(dados.grupoId) && dados.grupoId > 0
    && Number.isInteger(dados.anoNascimento) && dados.anoNascimento >= 1900 && dados.anoNascimento <= 2100;
}

exports.index = async (req, res) => {
  try {
    const integrantes = await Integrante.findAll({
      include: [{ model: Grupo, as: 'grupo' }],
      order: [['nome', 'ASC']]
    });
    const itens = integrantes.map(integrante => ({
      id: integrante.id,
      titulo: integrante.nome,
      subtitulo: integrante.grupo ? integrante.grupo.nome : 'Grupo não encontrado',
      imagem: urlImagem(integrante.imagem),
      detalhes: [integrante.posicao, integrante.nacionalidade, `Nascimento: ${integrante.anoNascimento}`]
    }));
    res.render('entidades/index', {
      titulo: 'Integrantes', entidade: 'integrante', itens,
      novoUrl: '/integrantes/novo', baseUrl: '/integrantes',
      mensagem: req.query.mensagem, erro: req.query.erro
    });
  } catch (erro) {
    console.error('Erro ao listar integrantes:', erro.message);
    res.status(500).send('Não foi possível listar os integrantes. Confira a conexão com o banco de dados.');
  }
};

exports.novo = async (req, res) => {
  try {
    res.render('entidades/form', {
      titulo: 'Cadastrar integrante', entidade: 'integrante', campos,
      registro: {}, grupos: await carregarGrupos(),
      action: '/integrantes', submitLabel: 'Cadastrar integrante'
    });
  } catch (erro) {
    console.error('Erro ao carregar formulário:', erro.message);
    res.redirect('/integrantes?erro=' + encodeURIComponent('Não foi possível carregar os grupos.'));
  }
};

exports.criar = async (req, res) => {
  const dados = dadosDoFormulario(req.body);
  if (!dadosValidos(dados)) {
    return res.redirect('/integrantes?erro=' + encodeURIComponent('Preencha todos os campos obrigatórios com valores válidos.'));
  }
  try {
    await Integrante.create(dados);
    res.redirect('/integrantes?mensagem=' + encodeURIComponent('Integrante cadastrado com sucesso!'));
  } catch (erro) {
    console.error('Erro ao cadastrar integrante:', erro.message);
    res.redirect('/integrantes?erro=' + encodeURIComponent('Não foi possível cadastrar o integrante. Verifique se o grupo selecionado existe.'));
  }
};

exports.editar = async (req, res) => {
  try {
    const registro = await Integrante.findByPk(req.params.id);
    if (!registro) return res.redirect('/integrantes?erro=' + encodeURIComponent('Integrante não encontrado.'));
    res.render('entidades/form', {
      titulo: 'Editar integrante', entidade: 'integrante', campos,
      registro: registro.get({ plain: true }), grupos: await carregarGrupos(),
      action: `/integrantes/${registro.id}`, submitLabel: 'Salvar alterações'
    });
  } catch (erro) {
    console.error('Erro ao abrir integrante:', erro.message);
    res.redirect('/integrantes?erro=' + encodeURIComponent('Não foi possível abrir esse integrante.'));
  }
};

exports.atualizar = async (req, res) => {
  const dados = dadosDoFormulario(req.body);
  if (!dadosValidos(dados)) {
    return res.redirect('/integrantes?erro=' + encodeURIComponent('Preencha todos os campos obrigatórios com valores válidos.'));
  }
  try {
    const registro = await Integrante.findByPk(req.params.id);
    if (!registro) return res.redirect('/integrantes?erro=' + encodeURIComponent('Integrante não encontrado.'));
    await registro.update(dados);
    res.redirect('/integrantes?mensagem=' + encodeURIComponent('Integrante atualizado com sucesso!'));
  } catch (erro) {
    console.error('Erro ao atualizar integrante:', erro.message);
    res.redirect('/integrantes?erro=' + encodeURIComponent('Não foi possível atualizar o integrante. Verifique o grupo selecionado.'));
  }
};

exports.excluir = async (req, res) => {
  try {
    const registro = await Integrante.findByPk(req.params.id);
    if (!registro) return res.redirect('/integrantes?erro=' + encodeURIComponent('Integrante não encontrado.'));
    await registro.destroy();
    res.redirect('/integrantes?mensagem=' + encodeURIComponent('Integrante excluído com sucesso.'));
  } catch (erro) {
    console.error('Erro ao excluir integrante:', erro.message);
    res.redirect('/integrantes?erro=' + encodeURIComponent('Não foi possível excluir o integrante.'));
  }
};
