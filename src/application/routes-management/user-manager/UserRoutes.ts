import * as express from "express";
import { UserController } from "../../controller/user-manager/UserController";
import { UserRoutesValidator } from "./validator/UserRoutesValidator";


const UserRoutes = express.Router()

const userController = new UserController()
const userRoutesValidator = new UserRoutesValidator()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints relacionados aos utilizadores
 */


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo utilizador
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserParams'
 *     responses:
 *       '200':
 *         description: Utilizador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResult'
 *       '400':
 *         description: Erro de validação dos dados do utilizador
 */
UserRoutes.post("/users", userRoutesValidator.addUser(), userRoutesValidator.validate, userController.addUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os utilizadores
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: size
 *         description: Tamanho da página (opcional, mínimo 1, padrão 20)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 20
 *       - in: query
 *         name: page
 *         description: Número da página (opcional, mínimo 1, padrão 1)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: status
 *         description: Estado do utilizador (opcional)
 *         schema:
 *           type: string
 *       - in: query
 *         name: orderColumn
 *         description: Coluna pela qual ordenar os resultados
 *         schema:
 *           type: string
 *       - in: query
 *         name: direction
 *         description: Direção da ordenação (ASC ou DESC)
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *     responses:
 *       '200':
 *         description: Lista de utilizadores registados na plataforma
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResult'
 */
UserRoutes.get("/users", userRoutesValidator.getUsers(), userRoutesValidator.validate, userController.getUsers);


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um utilizador pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do utilizador
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Utilizador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResult'
 *       '404':
 *         description: Utilizador não encontrado
 */
UserRoutes.get("/users/:id", userRoutesValidator.getUserById(), userRoutesValidator.validate, userController.getUserById);


/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Obtém um utilizador pelo email do utilizador
 *     description: Esta funcionalidade está em processo de implementação.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email de utilizador
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Utilizador encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResult'
 *       '404':
 *         description: Utilizador não encontrado
 */

UserRoutes.get("/users/email/:email", userRoutesValidator.getUserByEmail(), userRoutesValidator.validate, userController.getUserByEmail);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Atualiza um utilizador (EM IMPLEMENTAÇÃO)
 *     description: Esta funcionalidade está em processo de implementação.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       description: Dados do utilizador a serem atualizados
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserParams'
 *     responses:
 *       '200':
 *         description: Utilizador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResult'
 *       '404':
 *         description: Utilizador não encontrado
 */

UserRoutes.put("/users", userRoutesValidator.updateUser(), userRoutesValidator.validate, userController.updateUser);

/**
 * @swagger
 * /users/password/reset:
 *   put:
 *     summary: Reset a Password do utilizador autenticado
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordParams'
 *     responses:
 *       '200':
 *         description: Password do utilizador Reset com sucesso
 *       '404':
 *         description: Utilizador não encontrado
 */
UserRoutes.put("/users/password/reset", userRoutesValidator.resetPassword(), userRoutesValidator.validate, userController.resetPassword);

/**
 * @swagger
 * /users/password:
 *   put:
 *     summary: Atualiza a Password do utilizador
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       description: Dados da Password a serem atualizados
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePasswordParams'
 *     responses:
 *       '200':
 *         description: Password do utilizador atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResult'
 *       '404':
 *         description: utilizador não encontrado
 *       '401':
 *         description: Password antiga incorreta
 */
UserRoutes.put("/users/password", userRoutesValidator.updatePassword(), userRoutesValidator.validate, userController.updatePassword);



export default UserRoutes


