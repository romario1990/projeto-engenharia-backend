import LoginController from '../../controller/LoginController';

const login = async (req, res, next) => {
  const { body: { login: _login, senha } } = req;
  new LoginController()
    .login(_login, senha)
    .then(data => res.send(data || []))
    .catch(error => next(error));
};

export default {
  login,
};
