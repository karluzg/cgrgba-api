import { CipherCCMTypes, createCipher, createCipheriv, createDecipher, createDecipheriv, randomBytes } from 'crypto';
import { PlataformConfig } from '../config/plataform';


export class EncryptTemplate {

    static  algorithm = 'aes-128-gcm'; // Specify the CCM algorithm
    

    public static encryptColumn(value:string) : string{
        const cipher = createCipheriv(EncryptTemplate.algorithm, PlataformConfig.encryptionKey16, PlataformConfig.encryptionKey12);
        let encryptedValue = cipher.update(value, 'utf8', 'hex');
        return encryptedValue;
      }
    
      public static decryptedColumn(value:string): string {
        
        const decipher = createDecipheriv(EncryptTemplate.algorithm, PlataformConfig.encryptionKey16, PlataformConfig.encryptionKey12);
        let decryptedValue = decipher.update(value, 'hex', 'utf8');
        return decryptedValue;
      }
}