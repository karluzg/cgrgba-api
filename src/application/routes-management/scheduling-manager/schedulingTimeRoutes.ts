import * as express from "express";
import { SchedulingTimeController } from "../../controller/scheduling-manager/SchedulingTimeHourController";
import { SchedulingTimeRoutesValidator } from "./validator/schedulingTime/SchedulingTimeRoutesValidator";

const schedulingTimeRoutes = express.Router()


const schedulingTimeController = new SchedulingTimeController()
const schedulingTimeValidator = new SchedulingTimeRoutesValidator()


/**
 * @swagger
 * tags:
 *   name: Scheduling Time Slots
 *   description: Endpoints relacionados os intervalos de tempo de agendamento
 */


/**
 * @swagger
 * /slots:
 *   post:
 *     summary: Adiciona um novo intervalo de tempo de agendamento
 *     tags: [Scheduling Time Slots]
 *     requestBody:
 *       required: true
 *       description: Dados do novo intervalo de tempo de agendamento
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeSlotParams'
 *     responses:
 *       '201':
 *         description: Intervalo de tempo de agendamento adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeSlotResult'
 *       '400':
 *         description: Erro de validação dos dados do intervalo de tempo de agendamento
 */
schedulingTimeRoutes.post("/slots", schedulingTimeValidator.addNewTimeSlot(), schedulingTimeValidator.validate, schedulingTimeController.add_new_time_slot)



/**
 * @swagger
 * /slots:
 *   get:
 *     summary: Obtém a lista de intervalos de tempo de agendamento
 *     tags: [Scheduling Time Slots]
 *     parameters:
 *       - in: query
 *         name: beginschedulingDate
 *         description: Tempo de início para filtrar os intervalos de tempo (opcional)
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: Lista de intervalos de tempo de agendamento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeSlotResult'
 *       '400':
 *         description: Erro de validação dos parâmetros da requisição
 */
schedulingTimeRoutes.get("/slots", schedulingTimeValidator.getTimeSlotList(), schedulingTimeValidator.validate, schedulingTimeController.get_time_slot_list)

export default schedulingTimeRoutes


