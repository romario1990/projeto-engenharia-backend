import Dao from '../dao/Dao';


function setDataBaseConnection(req) {
  req.connection = Dao.getUserConnection() || {};
  req.usuario = { // todo alterar
    id: 1,
    idGrupo: 1,
  };
}

function verifyToken(req, res, next) {
  setDataBaseConnection(req); next();
}

export {
  verifyToken,
};
