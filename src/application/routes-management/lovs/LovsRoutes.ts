import * as express from "express";
import { LovsController } from "../../controller/lovs/LovsController";


const lovesRoutes = express.Router()

const lovsController = new LovsController()

/**
 * @swagger
 * /lovs/services:
 *   get:
 *     summary: Get services by category
 *     tags: [Services]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceList'
 */
lovesRoutes.get("/lovs/services", lovsController.get_service_by_category)

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get services by category
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceList'
 */

lovesRoutes.get("/lovs/categories", lovsController.get_scheduling_category)

/**
 * @swagger
 * /lovs/roles:
 *   get:
 *     summary: Get roles
 *     tags: [Roles]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RolesList'
 */
lovesRoutes.get("/lovs/roles", lovsController.get_roles)

/**
 * @swagger
 * /lovs/roles:
 *   get:
 *     summary: Get feedback message types
 *     tags: [feedbackMessageType]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedbackMessageTypesList'
 */
lovesRoutes.get("/lovs/feedbackMessageType", lovsController.get_feedback_message_type)



export default lovesRoutes