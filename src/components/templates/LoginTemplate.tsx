import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { Input } from "components"
import { PATH } from "constant"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { LoginSchema, LoginSchemaType } from "schema"
import { useAppDispatch, useAppSelector } from "store"
import { loginThunk } from "store/quanLyNguoiDung/thunk"

export const LoginTemplate = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm<LoginSchemaType>({
        mode: "onChange",
        resolver: zodResolver(LoginSchema)
    })
    const { isFetchLoading } = useAppSelector(state => state.quanLyNguoiDung)
    const setSubmit: SubmitHandler<LoginSchemaType> = (values) => {
        dispatch(loginThunk(values)).unwrap().then(() => {
            navigate('/')
            toast.success('Đăng nhập thành công')
        }).catch((err) => {
            toast.error(err.response.data.content)
        })
    }
    return (
        <form onSubmit={handleSubmit(setSubmit)}>
            <h1 className="title">Đăng nhập</h1>
            <Input className="input" label="Tài khoản" placeholder="Tài khoản" id="taiKhoan" error={errors?.taiKhoan?.message} register={register} />
            <Input className="input" label="Mật khẩu" placeholder="Mật khẩu" id="matKhau" error={errors?.matKhau?.message} register={register} />
            <Button htmlType="submit" className="btn-register" loading={isFetchLoading}>Đăng nhập</Button>
            <div className="flex justify-center">
                <span className="text-white mr-[15px] cursor-pointer" onClick={() => {
                    toast.info('Chức năng đang cập nhật')
                }}>Quên mật khẩu?</span>
                <span className="text-white">|</span>
                <span className="text-white ml-[15px] cursor-pointer" onClick={() => { navigate(PATH.register) }}>Đăng ký</span>
            </div>
        </form>
    )
}
