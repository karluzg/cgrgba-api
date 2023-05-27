import express from 'express';
import { RoleController } from "../../controller/user-manager/RoleController";
import { RoleRoutesValidator} from "./validator/RoleRoutesValidator";



const roleController = new RoleController()
const roleRoutesValidator = new RoleRoutesValidator()


const RoleRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Endpoints relacionados às roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Retorna a lista de roles
 *     tags: [Roles]
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Número da página a ser retornada
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: size
 *         description: Tamanho da página (número de itens por página)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 20
 *     responses:
 *       '200':
 *         description: Lista de roles obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleResult'
 */
RoleRoutes.get('/roles', roleRoutesValidator.getRoles(), roleRoutesValidator.validate, roleController.getRoles);


/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Retorna uma role pelo ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da role a ser retornada
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Role obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResult'
 */

RoleRoutes.get('/roles/:id', roleRoutesValidator.getRoleById(), roleRoutesValidator.validate, roleController.getRoleById);

/**
 * @swagger
 * /roles/name/{name}:
 *   get:
 *     summary: Obtém uma role pelo nome (EM IMPLEMENTAÇÃO)
 *     tags: [Roles]
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Nome da role a ser obtida
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Role encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResult'
 *       '404':
 *         description: Role não encontrada
 */
RoleRoutes.get('/roles/name/{name}', roleRoutesValidator.getRoleByName(), roleRoutesValidator.validate, roleController.getRoleByName);


/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Cria uma nova role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       description: Dados da role a ser criada
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleParams'
 *     responses:
 *       '200':
 *         description: Role criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResult'
 */

RoleRoutes.post('/roles', roleRoutesValidator.createRole(), roleRoutesValidator.validate, roleController.createRole);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Atualiza uma role pelo ID (EM IMPLEMENTAÇÃO)
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da role a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Dados da role a serem atualizados
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleParams'
 *     responses:
 *       '200':
 *         description: Role atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResult'
 */

RoleRoutes.put('/roles/:id', roleRoutesValidator.updateRole(), roleRoutesValidator.validate, roleController.updateRole);


/**
 * @swagger
 * /roles/{roleId}/permissions/{permissionCode}:
 *   put:
 *     summary: Adiciona uma permissão a uma role através do código da permissão (EM IMPLEMENTAÇÃO)
 *     tags: [Roles]
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         description: ID da role a ser atualizada
 *         schema:
 *           type: string
 *       - name: permissionCode
 *         in: path
 *         required: true
 *         description: Código da permissão a ser adicionada à role
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Permissão adicionada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResult'
 *       '404':
 *         description: Role ou permissão não encontrada
 */
RoleRoutes.put('/roles/:roleId/permissions/:permissionCode', roleRoutesValidator.addPermissions(), roleRoutesValidator.validate, roleController.addPermissions);


/**
 * @swagger
 * /roles/{roleId}/permissions/{permissionCode}:
 *   delete:
 *     summary: Remove uma permissão de uma role através do código da permissão (EM IMPLEMENTAÇÃO)
 *     tags: [Roles]
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         description: ID da role a ser atualizada
 *         schema:
 *           type: string
 *       - name: permissionCode
 *         in: path
 *         required: true
 *         description: Código da permissão a ser removida da role
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Permissão removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResult'
 *       '404':
 *         description: Role ou permissão não encontrada
 */
RoleRoutes.delete('/roles/:roleId/permissions/:permissionCode', roleRoutesValidator.removePermissions(), roleRoutesValidator.validate, roleController.removePermissions);


/**
 * @swagger
 * /roles/{id}/permissions:
 *   get:
 *     summary: Retorna a lista de permissões de uma role (EM IMPLEMENTAÇÃO)
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da role
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de permissões obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermissionResult'
 */

RoleRoutes.get('/roles/:id/permissions', roleRoutesValidator.getPermissions(), roleRoutesValidator.validate, roleController.getPermissions);


export default RoleRoutes;
