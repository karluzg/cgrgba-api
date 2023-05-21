import { UserStatus } from "../UserStatus";

export enum UserStatusEnum {
   NEW = "Novo",
   ACTIVE = "Ativo",
   REMOVED = "Removido",
   SUSPENDED = "Suspenso"
}

export class UserStatusMapper {
   public static from(status: UserStatus): UserStatusEnum | null {
      if (status == null || status.getCode() == null) {
         return null;
      }

      if (status.getCode() === UserStatusEnum.ACTIVE) {
         return UserStatusEnum.ACTIVE;
      } else if (status.getCode() === UserStatusEnum.REMOVED) {
         return UserStatusEnum.REMOVED;
      } else {
         return UserStatusEnum.SUSPENDED;
      }
   }

   public static status(userStatusEnum: UserStatusEnum): UserStatus {
      return new UserStatus(userStatusEnum);
   }

   public static async getUserStatusDescription(status: string): Promise<string> {
      switch (status) {
         case "NEW":
            return "Novo";
         case "ACTIVE":
            return "Ativo";
         case "REMOVED":
            return "Removido";
         case "SUSPENDED":
            return "Supendido";
         default:
            return "Desconhecido";
      }
   }
}


