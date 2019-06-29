export interface Contact {
    id?: number;
    fname: string;
    lname: string;
    phonenumber: string;
}
export function createNewContact() {
    return { fname: null, lname: null, phonenumber: null };
}
