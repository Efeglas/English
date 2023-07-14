export class Validator {

    static notEmpty = (value: string) : boolean => {
        return value.trim() !== "";
    }
}