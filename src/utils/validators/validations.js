import { z } from 'zod'


// auth schema
const authSchema = z.object({
    email: z.string({
        required_error: "El email es obligatorio",
        invalid_type_error: "El email debe ser un string"
    }).email({
        message: "El email debe ser un email valido"
    }),
    password: z.string({
        required_error: "La contraseña es obligatoria",
        invalid_type_error: "La contraseña debe ser un string"
    }).min(8),
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


// validate schema
function validateSchema(schema, data) {
    try {
        return schema.parse(data)
    } catch (error) {
        return error
    }
}

// exports
export { authSchema }
export default validateSchema