export type Take = {
    i: string;
    o: string;
    name?: string;
    o2?: string;
};
declare const form: {
    (text: string): string;
    ASCII_TO_UNICODE: (Take | {
        i: string;
        o: string;
        o2?: undefined;
    } | {
        i: string;
        o: string;
        o2: string;
    })[];
    map: {
        u: {
            grave: string;
            acute: string;
            dacute: string;
            dgrave: string;
            up: string;
            down: string;
            dot: string;
            ddot: string;
            ring: string;
            tilde: string;
            macron: string;
        };
        d: {
            grave: string;
            acute: string;
            ring: string;
            dot: string;
            ddot: string;
            down: string;
            tilde: string;
            macron: string;
            cedilla: string;
            up: string;
        };
    };
    VOWELS: Take[];
    CONSONANTS: ({
        i: string;
        o: string;
        o2?: undefined;
    } | {
        i: string;
        o: string;
        o2: string;
    })[];
};
export default form;
