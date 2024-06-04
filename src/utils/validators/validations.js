import { z } from 'zod'


// auth schemas

// register
const registerSchema = z.object({
    email: z.string({
        required_error: "El email es obligatorio",
        invalid_type_error: "El email debe ser un string"
    }).email({
        message: "El email debe ser un email valido"
    }),
    password: z.string({
        required_error: "La contraseña es obligatoria",
        invalid_type_error: "La contraseña debe ser un string"
    }).min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    username: z.string().min(3, { message: "El nombre de usuario debe contener al menos 3 caracteres" }),
    role: z.enum(["artist", "buyer"], {
        errorMap: (issue, ctx) => {
            if (issue.code === 'invalid_enum_value') {
                return { message: "El rol ingresado no es válido" };
            }
            return { message: ctx.defaultError };
        }
    })
})

// login
const loginSchema = z.object({
    password: z.string({
        required_error: "La contraseña es obligatoria",
        invalid_type_error: "La contraseña debe ser un string"
    }).min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    username: z.string().min(3, { message: "El nombre de usuario debe contener al menos 3 caracteres" }).optional(),
})

// validate schema
function validateSchema(schema, data) {
    try {
        return schema.parse(data)
    } catch (error) {
        return error
    }
}

// exports
export { registerSchema, loginSchema }
export default validateSchema