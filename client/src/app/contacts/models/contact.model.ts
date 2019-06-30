/**
 * Contact model
 */
export interface Contact {
    id?: number;
    fname: string;
    lname: string;
    phonenumber: string;
}
/**
 * Creates new empty contact
 */
export function createNewContact() {
    return { fname: null, lname: null, phonenumber: null };
}
