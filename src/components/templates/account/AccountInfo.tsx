import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "components"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "store"
import { zodResolver } from "@hookform/resolvers/zod"
import { AccountSchema, AccountSchemaType } from "schema"
import { ThongTinTaiKhoanThunk } from "store/quanLyNguoiDung"
import { toast } from 'react-toastify'
import { Button } from "antd"
import { quanLyNguoiDungServices } from "services"
export const AccountInfo = () => {
    const { handleSubmit, reset, register, formState: { errors } } = useForm<AccountSchemaType>({
        mode: "onChange",
        resolver: zodResolver(AccountSchema)
    })
    const dispatch = useAppDispatch()
    const { updateUser } = useAppSelector(state => state.quanLyNguoiDung)
    useEffect(() => {
        reset(updateUser)
    }, [updateUser, reset])
    const setSubmit: SubmitHandler<AccountSchemaType> = async (values) => {
        try {
            await quanLyNguoiDungServices.CapNhatThongTinNguoiDung(values)
            dispatch(ThongTinTaiKhoanThunk())
            toast.success('Cập nhật thành công')
        } catch (error) {
            toast.error(error.response.data.content)
        }
    }
    return (
        <form className="mt-[10px]" onSubmit={handleSubmit(setSubmit)}>
            <Input colorLabel="black" className="input pointer-events-none !text-gray-400" label="Tài khoản" placeholder="Tài khoản" id="taiKhoan" error={errors?.taiKhoan?.message} register={register} />
            <Input colorLabel="black" className="input" label="Họ tên" placeholder="Họ tên" id="hoTen" error={errors?.hoTen?.message} register={register} />
            <Input colorLabel="black" className="input" label="Số điện thoại" placeholder="Số điện thoại" id="soDt" error={errors?.soDt?.message} register={register} />
            <Input colorLabel="black" className="input" label="Email" placeholder="Email" id="email" error={errors?.email?.message} register={register} />
            <Input colorLabel="black" hidden={true} className="input pointer-events-none !text-gray-400" label="Mật khẩu" placeholder="Mật khẩu" id="matKhau" error={errors?.matKhau?.message} register={register} />
            <Input colorLabel="black" className="input pointer-events-none !text-gray-400" label="Mã nhóm" placeholder="Mã nhóm ( GP01, GP02, ..., GP13)" id="maNhom" error={errors?.maNhom?.message} register={register} />
            <Input colorLabel="black" className="input pointer-events-none !text-gray-400" label="Mã loại người dùng" placeholder="Mã loại người dùng" id="maLoaiNguoiDung" error={errors?.maLoaiNguoiDung?.message} register={register} />
            <Button htmlType="submit" className="btn-register">Cập nhật</Button>
        </form>
    )
}

