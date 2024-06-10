
export interface CodeArea {
    code: string;
    city: string;
    grup: 'lokal' | 'internasional';
}

export type CodeAreaResponse = CodeArea[];