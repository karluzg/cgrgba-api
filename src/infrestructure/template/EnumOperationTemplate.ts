export class EnumOperationTemplate<T> {


    private enumValues: T[];

    constructor(enumValues: any) {
      this.enumValues = enumValues;
    }
  


    public getDescription(value: string): string{
        const indexOfS = Object.keys(this.enumValues).indexOf(value);
        return Object.values(this.enumValues)[indexOfS].toString();
      }

    public  getKey(value: T): string {
        const indexOfS = Object.values(this.enumValues).indexOf(value as unknown as T);
        const enumMember = Object.keys(this.enumValues)[indexOfS] as unknown as T;
        return enumMember.toString();
    }

    public getEnumKey(value: string): T {
        const indexOfS = Object.keys(this.enumValues).indexOf(value);
        const enumMember = Object.keys(this.enumValues)[indexOfS] as unknown as T;
        return enumMember;
      }
}