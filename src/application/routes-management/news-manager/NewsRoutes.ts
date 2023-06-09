import * as express from "express";
import multer from "multer";
import { NewsController } from "../../controller/news-manager/NewsController";
import { NewsRoutesValidator } from "./validator/NewsRoutesValidator";
import { UploadImage } from "../../../infrestructure/config/uploadImage";



const NewsRoutes = express.Router()

const newsController = new NewsController()
const newsRoutesValidator = new NewsRoutesValidator()
const uploadImage= new UploadImage();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Endpoints relacionados ao noticias
 */


/**
 * @swagger
 * /news/category:
 *   get:
 *     summary: Obtém todas as categorias de notícias
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Número da página para a paginação
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: size
 *         description: Tamanho da página para a paginação
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
 *         description: Coluna para ordenação das categorias (opcional)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de categorias de notícias recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsCategoryResult'
 */
NewsRoutes.get("/news/category",newsRoutesValidator.getAllNewsCategory(), newsRoutesValidator.validate, newsController.getAllNewsCategory);

/**
* @swagger
* /news/category/code/{code}:
*   get:
*     summary: Obtém uma categoria de notícia pelo código (EM IMPLEMENTAÇÃO)
*     tags: [News]
*     parameters:
*       - in: path
*         name: code
*         required: true
*         description: Código da categoria a ser recuperada
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Categoria de notícia recuperada com sucesso
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/NewsCategoryResult'
*       '404':
*         description: Categoria de notícia não encontrada
*/
NewsRoutes.get("/news/category/code/:code", newsRoutesValidator.getNewsCategoryByCode(), newsRoutesValidator.validate,newsController.getNewsCategoryByCode);

/**
 * @swagger
 * /news/category:
 *   post:
 *     summary: Cria uma nova categoria de notícia (EM IMPLEMENTAÇÃO)
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsCategoryParams'
 *     responses:
 *       '200':
 *         description: Categoria de notícia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsCategoryResult'
 *       '400':
 *         description: Erro de validação dos dados da categoria
 */
NewsRoutes.post("/news/category", newsRoutesValidator.createNewsCategory(), newsRoutesValidator.validate, newsController.createNewsCategory);

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Obtém todas as notícias
 *     tags: [News]
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
 *         name: category
 *         description: Code da Categoria que quer obter a lista
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         description: Ordenação das notícias (opcional, ASC ou DESC)
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *       - in: query
 *         name: column
 *         description: Coluna para ordenação das notícias (opcional)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de notícias recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsResult'
 */

NewsRoutes.get("/news", newsRoutesValidator.getAllNews(), newsRoutesValidator.validate, newsController.getAllNews);




/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Obtém um artigo de notícia pelo ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do artigo de notícia a ser recuperado
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Artigo de notícia recuperado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsResult'
 *       '404':
 *         description: Artigo de notícia não encontrado
 */
NewsRoutes.get("/news/:id", newsRoutesValidator.getNewsById(), newsRoutesValidator.validate,newsController.getNewsById);


/**
 * @swagger
 * /news:
 *   post:
 *     summary: Cria uma nova notícia
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsParams'
 *     responses:
 *       '200':
 *         description: Notícia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsResult'
 *       '400':
 *         description: Erro de validação dos dados da notícia
 */
NewsRoutes.post("/news", newsRoutesValidator.createNews(), newsRoutesValidator.validate, newsController.createNews);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Atualiza uma notícia existente (EM IMPLEMENTAÇÃO)
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da notícia a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNewsParams'
 *     responses:
 *       '200':
 *         description: Notícia atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsResult'
 *       '400':
 *         description: Erro de validação dos dados da notícia
 *       '404':
 *         description: Notícia não encontrada
 */
NewsRoutes.put("/news/:id",newsRoutesValidator.updateNews(),newsRoutesValidator.validate,newsController.updateNews);


/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Exclui uma notícia existente (EM IMPLEMENTAÇÃO)
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da notícia a ser excluída
 *     responses:
 *       '204':
 *         description: Notícia excluída com sucesso
 *       '404':
 *         description: Notícia não encontrada
 */
NewsRoutes.delete("/news/:id", newsController.deleteNews);

/**
 * @swagger
 * /news/{id}/image:
 *   post:
 *     summary: Faz o upload de uma imagem para um artigo de notícia 
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do artigo de notícia
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Imagem enviada com sucesso
 *       '400':
 *         description: Erro no envio da imagem
 */
NewsRoutes.post("/news/:id/image", multer(uploadImage.getConfig).single("image"), newsController.uploadImageNews);

/**
 * @swagger
 * /news/{id}/image:
 *   delete:
 *     summary: Exclui a imagem de um artigo de notícia (EM IMPLEMENTAÇÃO)
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do artigo de notícia
 *     responses:
 *       '200':
 *         description: Imagem excluída com sucesso
 *       '400':
 *         description: Erro na exclusão da imagem
 */
NewsRoutes.delete("/news/:id/image", newsController.deleteNews);



export default NewsRoutes