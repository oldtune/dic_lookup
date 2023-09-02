export type Result<T> = (Ok<T> | Error);

export type Ok<T> = {
    data: T
};

export type Error = {
    errorMessage: string;
    error: any;
};

export function createError(message?: string, error?: any) {
    return {
        errorMessage: error,
        error: error
    };
}

export function createOk<T>(value: T): Ok<T> {
    return { data: value };
}

export async function createResultPromise<T>(promise: Promise<T>): Promise<Result<T>> {
    try {
        const data = await promise;
        return createOk(data);
    }
    catch (ex) {
        if (typeof ex == "string") {
            return createError(ex as string, null) as Result<T>;
        }

        return createError("", ex) as Result<T>;
    }
}

export function match<T>(result: Result<T>, onOk: (data: Ok<T>) => void, onError: (error: Error) => void): void {
    if (result instanceof Error) {
        onError(result as Error);
    }

    onOk(result as Ok<T>);
}
