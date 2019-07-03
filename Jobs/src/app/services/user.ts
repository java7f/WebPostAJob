export interface User {
    name : string,
    lastName : string,
    email : string,
    userType : {
        administrator : boolean,
        user : boolean
        poster : boolean
    }
}
