import { UserStatus } from "../UserStatus";

export enum UserStatusEnum {
   NEW = "Novo",
   ACTIVE = "Ativo",
   REMOVED = "Removido",
   SUSPENDED = "Suspenso"
}

export class UserStatusMapper {
   public static status(userStatusEnum: UserStatusEnum): UserStatus {
      const status = this.mapper(userStatusEnum)
      return new UserStatus(status);

   }

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


   public static mapper(userStatusEnum: UserStatusEnum): string {
      switch (userStatusEnum) {
         case UserStatusEnum.NEW:
            return "NEW"
         case UserStatusEnum.ACTIVE:
            return "ACTIVE"
         case UserStatusEnum.REMOVED:
            "REMOVED"
         case UserStatusEnum.SUSPENDED:
            return "SUSPENDED"
         default:
            return "NEW"
      }
   }
}


