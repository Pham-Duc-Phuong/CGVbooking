import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { PasswordSchema, PasswordSchemaType } from "schema"
import { Input } from 'components'
import { quanLyNguoiDungServices } from "services"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "store"
import { Button } from "antd"
import { ThongTinTaiKhoanThunk } from "store/quanLyNguoiDung"

export const Password = () => {
  const dispatch = useAppDispatch()
  const { handleSubmit, register, formState: { errors } } = useForm<PasswordSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(PasswordSchema)
  })
  const { updateUser } = useAppSelector(state => state.quanLyNguoiDung)
  const setSubmit: SubmitHandler<PasswordSchemaType> = async (values) => {
    if (values.matKhau === updateUser.matKhau && values.matKhauChange1 === values.matKhauChange2) {
      const doiMatKhau = { ...updateUser, matKhau: values.matKhauChange1 }
      try {
        await quanLyNguoiDungServices.CapNhatThongTinNguoiDung(doiMatKhau)
        dispatch(ThongTinTaiKhoanThunk())
        toast.success('Đổi mật khẩu thành công')
      } catch (error) {
        toast.error('Đổi mật khẩu thất bại')
      }
    } if (values.matKhauChange1 !== values.matKhauChange2) {
      toast.error('Mật khẩu mới nhập lại bị không đúng')
    } if (values.matKhau !== updateUser.matKhau) {
      toast.error('Đổi mật khẩu thất bại')
    }
  }
  return (
    <form className="mt-3" onSubmit={handleSubmit(setSubmit)}>
      <Input colorLabel="black" className="input" label="Mật khẩu" placeholder="Mật khẩu" id="matKhau" error={errors?.matKhau?.message} register={register} />
      <Input colorLabel="black" className="input" label="Mật khẩu mới" placeholder="Mật khẩu mới" id="matKhauChange1" error={errors?.matKhauChange1?.message} register={register} />
      <Input colorLabel="black" className="input" label="Nhập lại mật khẩu mới" placeholder="Nhập lại mật khẩu mới" id="matKhauChange2" error={errors?.matKhauChange2?.message} register={register} />
      <Button htmlType="submit" className="btn-register">Đổi mật khẩu</Button>
    </form>
  )
}
