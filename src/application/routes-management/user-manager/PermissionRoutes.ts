import express from 'express';
import { PermissionController } from "../../controller/user-manager/PermissionController";
import { PermissionRoutesValidator} from "./validator/PermissionRoutesValidator";



const permissionController = new PermissionController()
const permissionRoutesValidator = new PermissionRoutesValidator()


const PermissionRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Endpoints relacionados às permissões
 */


/**
 * @swagger
 * /permissions:
 *   post:
 *     summary: Cria uma nova permissão
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       description: Dados da permissão a ser criada
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PermissionParams'
 *     responses:
 *       '201':
 *         description: Permissão criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionResult'
 */

PermissionRoutes.post('/permissions', permissionRoutesValidator.createPermission(), permissionRoutesValidator.validate, permissionController.createPermission);

/**
 * @swagger
 * /permissions/code/{code}:
 *   put:
 *     summary: Atualiza uma permissão existente (EM IMPLEMENTAÇÃO)
 *     tags: [Permissions]
 *     parameters:
 *       - name: code
 *         in: path
 *         required: true
 *         description: Código da permissão a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Dados da permissão a ser atualizada
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PermissionParams'
 *     responses:
 *       '200':
 *         description: Permissão atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionResult'
 */

PermissionRoutes.put('/permissions/code/:code', permissionRoutesValidator.updatePermission(), permissionRoutesValidator.validate, permissionController.createPermission);

/**
 * @swagger
 * /permissions/code/{code}:
 *   delete:
 *     summary: Remove uma permissão existente (EM IMPLEMENTAÇÃO)
 *     tags: [Permissions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da permissão a ser removida
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Permissão removida com sucesso
 */

PermissionRoutes.delete('/permissions/code/:code', permissionRoutesValidator.deletePermission(), permissionRoutesValidator.validate, permissionController.deletePermission);

/**
 * @swagger
 * /permissions:
 *   get:
 *     summary: Retorna a lista de permissões
 *     tags: [Permissions]
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
 *       - in: query
 *         name: direction
 *         description: Direção de ordenação dos resultados (ASC para ascendente, DESC para descendente)
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *       - in: query
 *         name: orderColumn
 *         description: Coluna para ordenação dos resultados
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

PermissionRoutes.get('/permissions', permissionRoutesValidator.getAllPermissions(), permissionRoutesValidator.validate, permissionController.getPermissions);


/**
 * @swagger
 * /permissions/code/{code}:
 *   get:
 *     summary: Retorna uma permissão pelo código 
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: code
 *         description: Código da permissão a ser buscada
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Permissão encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionResult'
 *       '404':
 *         description: Permissão não encontrada
 */
PermissionRoutes.get('/permissions/code/:code', permissionRoutesValidator.getPermissionByCode(), permissionRoutesValidator.validate, permissionController.getPermissionByCode);


/**
 * @swagger
 * /permissions/groups:
 *   post:
 *     summary: Cria um novo grupo de permissões
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       description: Objeto de dados do novo grupo de permissões
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PermissionGroupParams'
 *     responses:
 *       '200':
 *         description: Grupo de permissões criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionGroupResult'
 */
PermissionRoutes.post('/permissions/groups', permissionRoutesValidator.createPermissionGroup(), permissionRoutesValidator.validate, permissionController.createPermissionGroup);



/**
 * @swagger
 * /permissions/groups:
 *   get:
 *     summary: Obtém todos os grupos de permissões
 *     tags: [Permissions]
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Número da página para a paginação
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: size
 *         description: Tamanho da página para a paginação
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 20
 *       - in: query
 *         name: order
 *         description: Ordenação dos grupos de permissões (opcional, ASC ou DESC)
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *       - in: query
 *         name: column
 *         description: Coluna para ordenação dos grupos de permissões (opcional)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de grupos de permissões obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionGroupResult'
 */

PermissionRoutes.get('/permissions/groups', permissionRoutesValidator.getAllPermissionGroups(), permissionRoutesValidator.validate,permissionController.getAllPermissionGroups);



/**
 * @swagger
 * /permissions/groups/code/{code}:
 *   get:
 *     summary: Obtém um grupo de permissões pelo código 
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: code
 *         description: Código do grupo de permissões a ser obtido
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Grupo de permissões encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionGroupResult'
 *       '404':
 *         description: Grupo de permissões não encontrado
 */
PermissionRoutes.get('/permissions/groups/code/:code', permissionRoutesValidator.getPermissionGroupByCode(), permissionRoutesValidator.validate, permissionController.getPermissionGroupByCode);

/**
 * @swagger
 * /permissions/groups/code/{code}:
 *   put:
 *     summary: Atualiza um grupo de permissões pelo código (EM IMPLEMENTAÇÃO)
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: code
 *         description: Código do grupo de permissões a ser atualizado
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Objeto de dados atualizados do grupo de permissões
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PermissionGroupParams'
 *     responses:
 *       '200':
 *         description: Grupo de permissões atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionGroupResult'
 *       '404':
 *         description: Grupo de permissões não encontrado
 */
PermissionRoutes.put('/permissions/groups/code/:code', permissionRoutesValidator.updatePermissionGroup(), permissionRoutesValidator.validate, permissionController.updatePermissionGroup);

/**
 * @swagger
 * /permissions/groups/code/{code}:
 *   delete:
 *     summary: Exclui um grupo de permissões pelo código (EM IMPLEMENTAÇÃO)
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: code
 *         description: Código do grupo de permissões a ser excluído
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Grupo de permissões excluído com sucesso
 *       '404':
 *         description: Grupo de permissões não encontrado
 */
PermissionRoutes.delete('/permissions/groups/code/:code', permissionRoutesValidator.deletePermissionGroup(), permissionRoutesValidator.validate, permissionController.deletePermissionGroup);


export default PermissionRoutes;