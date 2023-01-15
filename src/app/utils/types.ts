interface IUser {
    id: string,
    username: string,
    age: number,
    hobbies: string[];
}

interface IUserProperties {
    username: string,
    age: number,
    hobbies: string[];
}

export { IUser, IUserProperties };
