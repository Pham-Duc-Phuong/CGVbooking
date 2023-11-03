import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { Input } from "components"
import { PATH } from "constant"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { LoginSchema, LoginSchemaType } from "schema"
import { useAppDispatch, useAppSelector } from "store"
import { loginThunk } from "store/quanLyNguoiDung/thunk"
import cn from 'classnames'

export const LoginTemplate = () => {
    const taiKhoanDangNhap = [
        {
            taiKhoan: "phuongporo8123",
            matKhau: '123'
        },
        {
            taiKhoan: "phuongporo123",
            matKhau: '123'
        },
        {
            taiKhoan: "phuongporo456",
            matKhau: '123'
        },
        {
            taiKhoan: "phuongporo789",
            matKhau: '123'
        }
    ]
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm<LoginSchemaType>({
        mode: "onChange",
        resolver: zodResolver(LoginSchema)
    })
    const { isFetchLoading } = useAppSelector(state => state.quanLyNguoiDung)
    const [openCopyUser, setOpenCopyUser] = useState(false)
    const setSubmit: SubmitHandler<LoginSchemaType> = (values) => {
        dispatch(loginThunk(values)).unwrap().then(() => {
            navigate('/')
            toast.success('Đăng nhập thành công')
        }).catch((err) => {
            toast.error(err.response.data.content)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(setSubmit)}>
                <div className="flex items-center justify-between">
                    <h1 className="title">Đăng nhập</h1>
                    <div className="flex items-center justify-between bg-red-600 hover:bg-red-800 p-2 rounded-lg" onClick={() => { setOpenCopyUser(true) }}>
                        <i className="fa-regular fa-user text-white text-[11px] sm:text-[18px] mr-2"></i>
                        <span className="text-white font-[500] text-[11px] sm:text-[16px]">Lấy tài khoản</span>
                    </div>
                </div>
                <Input className="input" label="Tài khoản" placeholder="Tài khoản" id="taiKhoan" error={errors?.taiKhoan?.message} register={register} defaultValue={'phuongporo8123'} />
                <Input className="input" type='password' label="Mật khẩu" placeholder="Mật khẩu" id="matKhau" error={errors?.matKhau?.message} register={register} defaultValue={'123'} />
                <Button htmlType="submit" className="btn-register" loading={isFetchLoading}>Đăng nhập</Button>
                <div className="flex justify-center">
                    <span className="text-white mr-[15px] cursor-pointer" onClick={() => {
                        toast.info('Chức năng đang cập nhật')
                    }}>Quên mật khẩu?</span>
                    <span className="text-white">|</span>
                    <span className="text-white ml-[15px] cursor-pointer" onClick={() => { navigate(PATH.register) }}>Đăng ký</span>
                </div>
            </form>
            <div className={cn("absolute top-0 left-0 bg-[#111827] rounded-lg w-full", {
                "hidden": !openCopyUser
            })}>
                <div className="flex justify-end">
                    <button className="btn-reset me-3 mt-3 py-[4px]" onClick={() => { setOpenCopyUser(false) }}>X</button>
                </div>
                {
                    taiKhoanDangNhap?.map((a, index) => (
                        <div className="border border-white m-3 rounded-lg" key={a.taiKhoan}>
                            <div className="flex items-end gap-3 p-2">
                                <div className="w-full">
                                    <p className="label">{`Tài khoản ${index + 1}`}</p>
                                    <p className="input">{a.taiKhoan}</p>
                                </div>
                                <div className="w-full">
                                    <p className="label">{`Mật khẩu ${index + 1}`}</p>
                                    <p className="input">{a.matKhau}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
