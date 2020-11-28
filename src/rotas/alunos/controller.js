import AlunosController from '../../controller/AlunosController';

export function listAlunos(req, res, next) {
  const {
    connection, usuario,
  } = req;
  new AlunosController(connection, usuario)
    .listAlunos()
    .then(data => res.send(data))
    .catch(next);
}
