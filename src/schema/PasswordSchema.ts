import {z} from 'zod'
export const PasswordSchema = z.object({
    matKhau: z.string().nonempty('Vui lòng nhập mật khẩu'),
    matKhauChange1: z.string().nonempty('Vui lòng nhập mật khẩu mới'),
    matKhauChange2: z.string().nonempty('Vui lòng nhập lại mật khẩu mới')
})
export type PasswordSchemaType = z.infer<typeof PasswordSchema>