import { UnsuccessfullOperationException } from "../../exceptions/UnsuccessfullOperationException";
import { Field } from "../../exceptions/enum/Field";

export enum DirectionEnum {
    ASC = "ASC",
    DESC = "DESC",
}

export function convertToDirectionEnum(direction: string): DirectionEnum {
    const upperCaseDirection = direction.toUpperCase();

    if (upperCaseDirection === "ASC") {
        return DirectionEnum.ASC;
    } else if (upperCaseDirection === "DESC") {
        return DirectionEnum.DESC;
    }

    throw new UnsuccessfullOperationException(Field.SYSTEM, `Invalid direction: ${direction}`);
}


