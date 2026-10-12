const { Grupo } = require('../models');

const campos = [
  { name: 'nome', label: 'Nome do grupo', required: true },
  { name: 'agencia', label: 'Agência', required: true },
  { name: 'anoDebut', label: 'Ano de debut', type: 'number', min: 1900, max: 2100, required: true },
  { name: 'geracao', label: 'Geração', required: true, placeholder: 'Ex.: 4ª geração' },
  { name: 'tipo', label: 'Tipo', required: true, placeholder: 'Ex.: Girl Group ou Boy Group' },
  { name: 'imagem', label: 'Caminho da imagem (opcional)', required: false, placeholder: 'grupos/aespa.jpg' }
];

function urlImagem(caminho) {
  if (!caminho) return '';
  return '/imagens/' + String(caminho).replace(/^\/?imagens\//, '').replace(/^\/+/, '');
}

function dadosDoFormulario(body) {
  return {
    nome: String(body.nome || '').trim(),
    agencia: String(body.agencia || '').trim(),
    anoDebut: Number(body.anoDebut),
    geracao: String(body.geracao || '').trim(),
    tipo: String(body.tipo || '').trim(),
    imagem: String(body.imagem || '').trim().replace(/^\/?imagens\//, '') || null
  };
}

exports.index = async (req, res) => {
  try {
    const grupos = await Grupo.findAll({ order: [['nome', 'ASC']] });
    const itens = grupos.map(grupo => ({
      id: grupo.id,
      titulo: grupo.nome,
      subtitulo: grupo.agencia,
      imagem: urlImagem(grupo.imagem),
      detalhes: [`Debut: ${grupo.anoDebut}`, grupo.geracao, grupo.tipo]
    }));
    res.render('entidades/index', {
      titulo: 'Grupos', entidade: 'grupo', itens,
      novoUrl: '/grupos/novo', baseUrl: '/grupos',
      mensagem: req.query.mensagem, erro: req.query.erro
    });
  } catch (erro) {
    console.error('Erro ao listar grupos:', erro.message);
    res.status(500).send('Não foi possível listar os grupos. Confira a conexão com o banco de dados.');
  }
};

exports.novo = (req, res) => {
  res.render('entidades/form', {
    titulo: 'Cadastrar grupo', entidade: 'grupo', campos,
    registro: {}, grupos: [], action: '/grupos', submitLabel: 'Cadastrar grupo'
  });
};

exports.criar = async (req, res) => {
  const dados = dadosDoFormulario(req.body);
  if (!dados.nome || !dados.agencia || !dados.geracao || !dados.tipo || (!Number.isInteger(dados.anoDebut) || dados.anoDebut < 1900 || dados.anoDebut > 2100)) {
    return res.redirect('/grupos?erro=' + encodeURIComponent('Preencha todos os campos obrigatórios com valores válidos.'));
  }
  try {
    await Grupo.create(dados);
    res.redirect('/grupos?mensagem=' + encodeURIComponent('Grupo cadastrado com sucesso!'));
  } catch (erro) {
    console.error('Erro ao cadastrar grupo:', erro.message);
    res.redirect('/grupos?erro=' + encodeURIComponent('Não foi possível cadastrar o grupo.'));
  }
};

exports.editar = async (req, res) => {
  try {
    const registro = await Grupo.findByPk(req.params.id);
    if (!registro) return res.redirect('/grupos?erro=' + encodeURIComponent('Grupo não encontrado.'));
    res.render('entidades/form', {
      titulo: 'Editar grupo', entidade: 'grupo', campos,
      registro: registro.get({ plain: true }), grupos: [],
      action: `/grupos/${registro.id}`, submitLabel: 'Salvar alterações'
    });
  } catch (erro) {
    console.error('Erro ao abrir grupo:', erro.message);
    res.redirect('/grupos?erro=' + encodeURIComponent('Não foi possível abrir esse grupo.'));
  }
};

exports.atualizar = async (req, res) => {
  const dados = dadosDoFormulario(req.body);
  if (!dados.nome || !dados.agencia || !dados.geracao || !dados.tipo || (!Number.isInteger(dados.anoDebut) || dados.anoDebut < 1900 || dados.anoDebut > 2100)) {
    return res.redirect('/grupos?erro=' + encodeURIComponent('Preencha todos os campos obrigatórios com valores válidos.'));
  }
  try {
    const registro = await Grupo.findByPk(req.params.id);
    if (!registro) return res.redirect('/grupos?erro=' + encodeURIComponent('Grupo não encontrado.'));
    await registro.update(dados);
    res.redirect('/grupos?mensagem=' + encodeURIComponent('Grupo atualizado com sucesso!'));
  } catch (erro) {
    console.error('Erro ao atualizar grupo:', erro.message);
    res.redirect('/grupos?erro=' + encodeURIComponent('Não foi possível atualizar o grupo.'));
  }
};

exports.excluir = async (req, res) => {
  try {
    const registro = await Grupo.findByPk(req.params.id);
    if (!registro) return res.redirect('/grupos?erro=' + encodeURIComponent('Grupo não encontrado.'));
    await registro.destroy();
    res.redirect('/grupos?mensagem=' + encodeURIComponent('Grupo excluído com sucesso. Os registros relacionados também podem ser excluídos.'));
  } catch (erro) {
    console.error('Erro ao excluir grupo:', erro.message);
    res.redirect('/grupos?erro=' + encodeURIComponent('Não foi possível excluir o grupo.'));
  }
};
