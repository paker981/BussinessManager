export interface AbstractStorageService {
    clear(): void;
    getData(email: string): string,
    saveData(email: string, token: string): void
}