export interface IServerResponse<T> {
    responseCode: boolean;
    message: string;
    result: T;
}
