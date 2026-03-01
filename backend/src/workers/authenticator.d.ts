import "dotenv/config";
export declare const registerUser: (email: string, password: string) => Promise<{
    token: string;
    user: {
        id: string;
        email: string;
    };
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    token: string;
    user: {
        id: string;
        email: string;
    };
}>;
//# sourceMappingURL=authenticator.d.ts.map