import * as express from "express";
import { UserController } from "../../controller/user-manager/UserController";
import { UserRoutesValidator } from "./validator/UserRoutesValidator";


const UserRoutes = express.Router()

const userController = new UserController()
const userRoutesValidator = new UserRoutesValidator()

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo utilizador
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
 *     parameters:
 *       - in: query
 *         name: size
 *         description: Tamanho da página (opcional)
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         description: Número da página (opcional)
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         description: Estado do utilizador (opcional)
 *         schema:
 *           type: string
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
 * /users/username/{username}:
 *   get:
 *     summary: Obtém um utilizador pelo nome de utilizador
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Nome de utilizador
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
UserRoutes.get("/users/username/:username", userRoutesValidator.getUserByUserName(), userRoutesValidator.validate, userController.getUserByUserName);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Atualiza um utilizador
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


