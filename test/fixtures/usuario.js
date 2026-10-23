import bcrypt from "bcrypt";

export const usuarioJson = {
    Usuario: "usuario2@gmail.com",
    Password: "usuario2",
    Estado: "Inactivo",
    Rol: "USER"
    
};

export const usuarioJsonRepeated = {
    Usuario: "usuario1@gmail.com",
    Password: "usuario01",
    Estado: "Activo",
    Rol: "USER"
};

export const usuarioJsonUpdate = {
    Usuario: "usuario10@gmail.com",
    Password: "usuario2",
    Estado: "Activo",
    Rol: "USER"
}

export const usuarioJsonEmpty = {
    Usuario: '',
    Password: '',
    Estado: '',
    Rol: ''
}

export const usuarioJWTCorrect = {
    Usuario: "test@gmail.com",
    Password: "123456"
}

export const usuarioJWTIncorrect = {
    Usuario: "test@gmail.com",
    Password: "654321"
}

export const usuarioJWTInvalid = {
    Usuario: "test#mail.mx",
    Password: "123456"
}

const passwordHash = bcrypt.hashSync('usuario1', 10);
export const usuarioArray = ["usuario1@gmail.com", passwordHash, "Inactivo", "USER"];