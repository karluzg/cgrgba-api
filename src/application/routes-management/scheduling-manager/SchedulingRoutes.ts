import * as express from "express";

import { SchedulingRoutesValidator } from "./validator/scheduling/SchedulingRoutesValidator";
import { SchedulingController } from "../../controller/scheduling-manager/SchedulingController";

const schedulingRoutes = express.Router()

const schedulingController = new SchedulingController()
const schedulingValidator = new SchedulingRoutesValidator()

/**
 * @swagger
 * tags:
 *   name: Schedulings
 *   description: Endpoints relacionados os agendamentos
 */

/**
 * @swagger
 * /schedulings:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Schedulings]
 *     requestBody:
 *       required: true
 *       description: Dados do agendamento a serem criados
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchedulingParams'
 *     responses:
 *       '201':
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchedulingResult'
 */
schedulingRoutes.post("/schedulings", schedulingValidator.addNewSchedulingvalidador(), schedulingValidator.validate, schedulingController.add_new_scheduling)

/**
 * @swagger
 * /schedulings:
 *   get:
 *     summary: Obtém a lista de agendamentos
 *     tags: [Schedulings]
 *     parameters:
 *       - in: query
 *         name: beginCreationgDate
 *         description: Data de início da criação do agendamento (opcional)
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endCreationDate
 *         description: Data de término da criação do agendamento (opcional)
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: beginSchedulingTime
 *         description: Hora de início do agendamento (opcional)
 *         schema:
 *           type: string
 *           format: time
 *       - in: query
 *         name: endSchedulingTime
 *         description: Hora de término do agendamento (opcional)
 *         schema:
 *           type: string
 *           format: time
 *       - in: query
 *         name: schedulingStatus
 *         description: Status do agendamento (opcional)
 *         schema:
 *           type: string
 *       - in: query
 *         name: orderColumn
 *         description: Coluna de ordenação dos resultados (opcional)
 *         schema:
 *           type: string
 *       - in: query
 *         name: direction
 *         description: Direção da ordenação (ascendente ou descendente) (opcional)
 *         schema:
 *           type: string
 *       - in: query
 *         name: pageNumber
 *         description: Número da página dos resultados (opcional)
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: pageSize
 *         description: Tamanho da página dos resultados (opcional)
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       '200':
 *         description: Lista de agendamentos obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSchedulingListResult'
 */
schedulingRoutes.get("/schedulings", schedulingValidator.getSchedulingListValidator(), schedulingValidator.validate, schedulingController.get_scheduling_list)

/**
 * @swagger
 * /schedulings/{id}:
 *   get:
 *     summary: Obtém os detalhes de um agendamento
 *     tags: [Schedulings]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do agendamento
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Detalhes do agendamento obtidos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchedulingResult'
 *       '404':
 *         description: Agendamento não encontrado
 */
schedulingRoutes.get("/schedulings/:id", schedulingController.get_scheduling_detail);

/**
 * @swagger
 * /scheduling/{id}:
 *   put:
 *     summary: Change the status of a scheduling
 *     tags: [Scheduling]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the scheduling
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: schedulingStatus
 *         description: Scheduling status to update
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/SchedulingStatus'
 *     responses:
 *       '200':
 *         description: Scheduling status changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Scheduling'
 *       '404':
 *         description: Scheduling not found
 *       '400':
 *         description: Invalid request parameters
 */

schedulingRoutes.put("/scheduling/:id", schedulingController.change_scheduling_status)

/**
 * @swagger
 * /schedulings/{id}:
 *   put:
 *     summary: Atualiza um agendamento
 *     tags: [Schedulings]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do agendamento
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Dados do agendamento a serem atualizados
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSchedulingParams'
 *     responses:
 *       '200':
 *         description: Agendamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchedulingResult'
 *       '404':
 *         description: Agendamento não encontrado
 */
schedulingRoutes.put("/schedulings/:id", schedulingValidator.updateSchedulingValidator(), schedulingValidator.validate, schedulingController.update_scheduling)



/**
 * @swagger
 * /scheduling/statistics:
 *   get:
 *     summary: Get scheduling statistics
 *     tags: [Schedulings]
 *     responses:
 *       '200':
 *         description: Successful response with scheduling statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchedulingStatisticsResult'
 */
schedulingRoutes.get("/scheduling/statistics", schedulingController.get_scheduling_statistics)


export default schedulingRoutes

