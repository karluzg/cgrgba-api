import { body, param, query, ValidationChain } from 'express-validator';
import { ParamsValidatorTemplate } from '../../../../infrestructure/template/ParamsValidatorTemplate';



export class NewsRoutesValidator extends ParamsValidatorTemplate {
    getAllNews():ValidationChain[] {
      return [
         query('page').isInt({ min: 1 }).optional(),
         query('size').isInt({ min: 1 }).optional(),
         query('category').isLength({ max: 50 }).isString().optional(),
         query('direction').isIn(['ASC', 'DESC']).optional(),
         query('orderColumn').isString().optional(),
     ]
   }
  
    deleteImageNews():ValidationChain[] {
       return []
    }
    uploadImageNews():ValidationChain[] {
       return []
    }
    updateNews():ValidationChain[] {
       return []
    }
    createNews():ValidationChain[] {
      return [
         body('title').notEmpty().isLength({ max: 50 }).isString(),
         body('content').notEmpty().isLength({ max: 50 }).isString(),
         body('message').notEmpty().isLength({ max: 2000 }).isString(),
         body('categoryCode').notEmpty().isLength({ max: 50 }).isString(),
     ]
    }
    getNewsById(): ValidationChain[] {
       return []
    }
    addNews():ValidationChain[] {
       return []
    }
  

    public addUser(): ValidationChain[] {
        return [
            body('fullName').notEmpty().isLength({ max: 50 }).isString(),
            body('mobileNumber').isLength({ min: 9, max: 21 }).isString().optional(),
            body('email').notEmpty().isLength({ max: 34 }).isEmail()
        ]

    }




}