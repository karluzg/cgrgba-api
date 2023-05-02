export interface  IUserActivable{
  
    active (): void;

    suspend (): void;
  
    remove (): void;
}