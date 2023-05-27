import * as express from "express";
import { SessionController } from "../../controller/user-manager/SessionController";
import { SessionRoutesValidator } from "./validator/SessionRoutesValidator";


const SessionRoutes = express.Router()

const sessionController = new SessionController()
const sessionRoutesValidator = new SessionRoutesValidator()

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Endpoints relacionados à sessão do utilizador
 */



/**
 * @swagger
 * /sessions/login:
 *   post:
 *     summary: Realiza o login do utilizador
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       description: Dados de login do utilizador
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginParams'
 *     responses:
 *       '200':
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResult'
 *       '400':
 *         description: Dados de login inválidos
 */
SessionRoutes.post("/sessions/login",sessionRoutesValidator.login(),sessionRoutesValidator.validate,sessionController.login);

/**
 * @swagger
 * /sessions/logout:
 *   post:
 *     summary: Realiza o logout do utilizador (EM IMPLEMENTAÇÃO)
 *     description: Esta funcionalidade está em processo de implementação.
 *     tags: [Sessions]
 *     responses:
 *       '200':
 *         description: Logout realizado com sucesso
 *       '401':
 *         description: Não autorizado, token inválido ou expirado
 */
SessionRoutes.post("/sessions/logout", sessionController.logout);

/**
 * @swagger
 * /sessions/hasPermission/{permissionCode}:
 *   post:
 *     summary: Verifica se o utilizador possui a permissão especificada (EM IMPLEMENTAÇÃO)
 *     tags: [Sessions]
 *     description: Esta funcionalidade está em processo de implementação.
 *     parameters:
 *       - in: path
 *         name: permissionCode
 *         required: true
 *         description: Código da permissão a ser verificada
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Verificação de permissão bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasPermission:
 *                   type: boolean
 */

SessionRoutes.post('/sessions/hasPermission/:permissionCode', sessionRoutesValidator.hasPermission(), sessionRoutesValidator.validate, sessionController.hasPermission);

/**
 * @swagger
 * /sessions/token/information:
 *   get:
 *     summary: Obtém informações sobre o token atual (EM IMPLEMENTAÇÃO)
 *     tags: [Sessions]
 *     description: Esta funcionalidade está em processo de implementação.
 *     responses:
 *       '200':
 *         description: Informações do token obtidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenSession'
 */
SessionRoutes.get('/sessions/token/information', sessionRoutesValidator.getTokenInformation(), sessionRoutesValidator.validate, sessionController.getTokenInformation);


export default SessionRoutes
