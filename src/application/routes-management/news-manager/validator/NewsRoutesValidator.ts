import { body, param, query, ValidationChain } from 'express-validator';
import { ParamsValidatorTemplate } from '../../../../infrestructure/template/ParamsValidatorTemplate';



export class NewsRoutesValidator extends ParamsValidatorTemplate {
   getAllNews(): ValidationChain[] {
      return [
         query('page').isInt({ min: 1 }).optional(),
         query('size').isInt({ min: 1 }).optional(),
         query('category').isLength({ max: 50 }).isString().optional(),
         query('direction').isIn(['ASC', 'DESC']).optional(),
         query('orderColumn').isString().optional(),
      ]
   }

   deleteImageNews(): ValidationChain[] {
      return []
   }
   uploadImageNews(): ValidationChain[] {
      return []
   }
   updateNews(): ValidationChain[] {
      return []
   }
   createNews(): ValidationChain[] {
      return [
         body('title').notEmpty().isLength({ max: 50 }).isString(),
         body('message').notEmpty().isLength({ max: 16383 }).isString(),
         body('categoryCode').notEmpty().isLength({ max: 50 }).isString(),
      ]
   }
   getNewsById(): ValidationChain[] {
      return [param('id').notEmpty().isInt()]
   }
   addNews(): ValidationChain[] {
      return []
   }






}