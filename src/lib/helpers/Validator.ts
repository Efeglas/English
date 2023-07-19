export class Validator {

    static notEmpty = (value: string) : boolean => {
        return value.trim() !== "";
    }

    static longerThan = (value: string, min: number) : boolean => {
        return value.trim().length > min;
    }

    static containsNumber = (value: string) : boolean => {
        return /\d/.test(value);
    }

    static containsUpperCase = (value: string) : boolean => {
        return /[A-Z]/.test(value);
    }

    static password = (value: string) : boolean => {
        return this.longerThan(value, 7) && this.containsNumber(value) && this.containsUpperCase(value);
    }

    static passwordPartial = (value: string) : Array<boolean> => {
        return [this.longerThan(value, 7), this.containsNumber(value), this.containsUpperCase(value)];
    }
}