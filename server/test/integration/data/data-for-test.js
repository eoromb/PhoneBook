class DataForTest {
    static getRecord ({index, fname, lname, phonenumber}) {
        return {
            fname: (fname !== null && fname !== '') ? (fname || `fname${index}`) : fname,
            lname: (lname !== null && lname !== '') ? (lname || `lname${index}`) : lname,
            phonenumber: phonenumber || `7123456789${index % 10}`};
    }
}

module.exports = DataForTest;
