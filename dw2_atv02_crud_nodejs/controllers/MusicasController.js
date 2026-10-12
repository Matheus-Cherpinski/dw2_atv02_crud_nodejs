const { Musica, Grupo } = require('../models');

const campos = [
  { name: 'titulo', label: 'Título da música', required: true },
  { name: 'grupoId', label: 'Grupo', type: 'select', required: true },
  { name: 'ano', label: 'Ano de lançamento', type: 'number', min: 1900, max: 2100, required: true },
  { name: 'album', label: 'Álbum', required: true },
  { name: 'tipo', label: 'Tipo', required: true, placeholder: 'Ex.: Title Track ou Single' },
  { name: 'imagem', label: 'Caminho da imagem (opcional)', required: false, placeholder: 'albuns/armageddon.jpg' }
];

function urlImagem(caminho) {
  if (!caminho) return '';
  return '/imagens/' + String(caminho).replace(/^\/?imagens\//, '').replace(/^\/+/, '');
}

function dadosDoFormulario(body) {
  return {
    titulo: String(body.titulo || '').trim(),
    grupoId: Number(body.grupoId),
    ano: Number(body.ano),
    album: String(body.album || '').trim(),
    tipo: String(body.tipo || '').trim(),
    imagem: String(body.imagem || '').trim().replace(/^\/?imagens\//, '') || null
  };
}

async function carregarGrupos() {
  return Grupo.findAll({ order: [['nome', 'ASC']] });
}

function dadosValidos(dados) {
  return Boolean(dados.titulo && dados.album && dados.tipo)
    && Number.isInteger(dados.grupoId) && dados.grupoId > 0
    && Number.isInteger(dados.ano) && dados.ano >= 1900 && dados.ano <= 2100;
}

exports.index = async (req, res) => {
  try {
    const musicas = await Musica.findAll({
      include: [{ model: Grupo, as: 'grupo' }],
      order: [['titulo', 'ASC']]
    });
    const itens = musicas.map(musica => ({
      id: musica.id,
      titulo: musica.titulo,
      subtitulo: musica.grupo ? musica.grupo.nome : 'Grupo não encontrado',
      imagem: urlImagem(musica.imagem),
      detalhes: [musica.album, `Lançamento: ${musica.ano}`, musica.tipo]
    }));
    res.render('entidades/index', {
      titulo: 'Músicas', entidade: 'música', itens,
      novoUrl: '/musicas/novo', baseUrl: '/musicas',
      mensagem: req.query.mensagem, erro: req.query.erro
    });
  } catch (erro) {
    console.error('Erro ao listar músicas:', erro.message);
    res.status(500).send('Não foi possível listar as músicas. Confira a conexão com o banco de dados.');
  }
};

exports.novo = async (req, res) => {
  try {
    res.render('entidades/form', {
      titulo: 'Cadastrar música', entidade: 'música', campos,
      registro: {}, grupos: await carregarGrupos(),
      action: '/musicas', submitLabel: 'Cadastrar música'
    });
  } catch (erro) {
    console.error('Erro ao carregar formulário:', erro.message);
    res.redirect('/musicas?erro=' + encodeURIComponent('Não foi possível carregar os grupos.'));
  }
};

exports.criar = async (req, res) => {
  const dados = dadosDoFormulario(req.body);
  if (!dadosValidos(dados)) {
    return res.redirect('/musicas?erro=' + encodeURIComponent('Preencha todos os campos obrigatórios com valores válidos.'));
  }
  try {
    await Musica.create(dados);
    res.redirect('/musicas?mensagem=' + encodeURIComponent('Música cadastrada com sucesso!'));
  } catch (erro) {
    console.error('Erro ao cadastrar música:', erro.message);
    res.redirect('/musicas?erro=' + encodeURIComponent('Não foi possível cadastrar a música. Verifique se o grupo selecionado existe.'));
  }
};

exports.editar = async (req, res) => {
  try {
    const registro = await Musica.findByPk(req.params.id);
    if (!registro) return res.redirect('/musicas?erro=' + encodeURIComponent('Música não encontrada.'));
    res.render('entidades/form', {
      titulo: 'Editar música', entidade: 'música', campos,
      registro: registro.get({ plain: true }), grupos: await carregarGrupos(),
      action: `/musicas/${registro.id}`, submitLabel: 'Salvar alterações'
    });
  } catch (erro) {
    console.error('Erro ao abrir música:', erro.message);
    res.redirect('/musicas?erro=' + encodeURIComponent('Não foi possível abrir essa música.'));
  }
};

exports.atualizar = async (req, res) => {
  const dados = dadosDoFormulario(req.body);
  if (!dadosValidos(dados)) {
    return res.redirect('/musicas?erro=' + encodeURIComponent('Preencha todos os campos obrigatórios com valores válidos.'));
  }
  try {
    const registro = await Musica.findByPk(req.params.id);
    if (!registro) return res.redirect('/musicas?erro=' + encodeURIComponent('Música não encontrada.'));
    await registro.update(dados);
    res.redirect('/musicas?mensagem=' + encodeURIComponent('Música atualizada com sucesso!'));
  } catch (erro) {
    console.error('Erro ao atualizar música:', erro.message);
    res.redirect('/musicas?erro=' + encodeURIComponent('Não foi possível atualizar a música. Verifique o grupo selecionado.'));
  }
};

exports.excluir = async (req, res) => {
  try {
    const registro = await Musica.findByPk(req.params.id);
    if (!registro) return res.redirect('/musicas?erro=' + encodeURIComponent('Música não encontrada.'));
    await registro.destroy();
    res.redirect('/musicas?mensagem=' + encodeURIComponent('Música excluída com sucesso.'));
  } catch (erro) {
    console.error('Erro ao excluir música:', erro.message);
    res.redirect('/musicas?erro=' + encodeURIComponent('Não foi possível excluir a música.'));
  }
};
