import express from "express"
import { FeedbackController } from "../../controller/feedback/FeedbackController"
import { FeedbackRoutesValidator } from "./validator/FeedbackRoutesValidator"

const feedbackRoutes = express.Router()

const feedbackRoutesValidator = new FeedbackRoutesValidator()
const feedbackControler = new FeedbackController()

/**
 * @swagger
 * /lovs/services:
 *   get:
 *     summary: Send feedback message
 *     tags: [Feedbacks]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedbackMessage'
 */
feedbackRoutes.post("/feedbacks", feedbackRoutesValidator.addNewFeedbackvalidador, feedbackRoutesValidator.validate, feedbackControler.add_new_feedback)

/**
 * @swagger
 * /feedbacks/{id}:
 *   get:
 *     summary: Get feedback message detail
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Feedback message ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedbackMessageDetail'
 */

feedbackRoutes.get("/feedbacks/:id", feedbackControler.get_feedback_detail)
/**
 * @swagger
 * /feedbacks:
 *   get:
 *     summary: Get feedback message list
 *     tags: [Feedbacks]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedbackMessageList'
 */

feedbackRoutes.get("/feedbacks", feedbackRoutesValidator.getFeedbackListValidator, feedbackRoutesValidator.validate, feedbackControler.get_feedback_list)
/**
 * @swagger
 * /feedbacks/{id}:
 *   put:
 *     summary: Update feedback message status
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Feedback message ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: Feedback message not found
 */
feedbackRoutes.put("/feedbacks/:id", feedbackRoutesValidator.updateSchedulingValidator, feedbackRoutesValidator.validate, feedbackControler.update_feedback_status)


export default feedbackRoutes
