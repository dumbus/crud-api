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

export { IUser, IError };
