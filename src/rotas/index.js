import { Router } from 'express';
import alunos from './alunos';
import login from './login';
import { verifyToken } from '../helpers/jwt';

const routes = Router();

routes.use('/login', login);
routes.use('/alunos', verifyToken, alunos);

export default routes;
