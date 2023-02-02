interface IUser {
    id?: string,
    username: string,
    age: number,
    hobbies: string[];
}

interface IError {
    code: number;
    message: string;
}

interface IValidationResult {
    isValid: boolean;
    code: number;
    body: IUser | IError | null;
}

interface IMessage {
    newDatabase: IUser[];
}

export { IUser, IError, IValidationResult, IMessage };
