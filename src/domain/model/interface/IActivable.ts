export interface IActivable {

    getActivationDate(): Date;
    getRevokingDate(): Date;
    activate(): void;
    isActive(): boolean;
}

