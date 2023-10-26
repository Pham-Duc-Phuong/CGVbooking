import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Modal } from 'antd'
import cn from 'classnames'
import { Input } from 'components'
import { xIconSVG } from 'constant'
import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AccountSchema, AccountSchemaType } from 'schema'
import { quanLyNguoiDungServices } from 'services'
import { useAppDispatch, useAppSelector } from 'store'
import { ThongTinTaiKhoanThunk, TimKiemNguoiDungThunk, XoaNguoiDungThunk, quanLyNguoiDungActions } from 'store/quanLyNguoiDung'

export const AdminNguoiDung = () => {
    const dispatch = useAppDispatch()
    const [chonMaNhom, setChonMaNhom] = useState('GP13')
    const [locNguoiDungTheoTen, setLocNguoiDungTheoTen] = useState('')
    const { handleSubmit, register, reset, formState: { errors } } = useForm<AccountSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(AccountSchema)
    })
    const { danhSachNguoiDung, timKiemNguoiDung } = useAppSelector(state => state.quanLyNguoiDung)
    const locNguoiDung = danhSachNguoiDung?.filter(a => a.taiKhoan.toLowerCase().includes(locNguoiDungTheoTen.toLowerCase()))
    useEffect(() => {
        reset({ ...timKiemNguoiDung, maNhom: chonMaNhom, soDt: timKiemNguoiDung?.soDT })
        dispatch(TimKiemNguoiDungThunk(chonMaNhom))
    }, [reset, timKiemNguoiDung, dispatch, chonMaNhom])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
        <div>
            <div className='flex justify-between gap-[10px] sm:gap-[30px]'>
                <form className='my-[15px] w-[40%]'>
                    <label htmlFor="setMaNhom" className={cn("label", { "text-black": 'bg-white' })}>Mã nhóm</label>
                    <select id="setMaNhom" className='input' defaultValue={"GP13"} onChange={(e) => { setChonMaNhom(e.target.value) }}>
                        <option value="GP00">GP00</option>
                        <option value="GP01">GP01</option>
                        <option value="GP02">GP02</option>
                        <option value="GP03">GP03</option>
                        <option value="GP04">GP04</option>
                        <option value="GP05">GP05</option>
                        <option value="GP06">GP06</option>
                        <option value="GP07">GP07</option>
                        <option value="GP08">GP08</option>
                        <option value="GP09">GP09</option>
                        <option value="GP10">GP10</option>
                        <option value="GP11">GP11</option>
                        <option value="GP12">GP12</option>
                        <option value="GP13">GP13</option>
                    </select>
                </form>
                <form className='my-[15px] w-full'>
                    <label htmlFor="search" className={cn("label", { "text-black": 'bg-white' })}>Tìm kiếm</label>
                    <div className='flex'>
                        <input type="text" id='search' className='input w-full !rounded-r-none !rounded-l-lg' onChange={(e) => { setLocNguoiDungTheoTen(e.target.value) }} />
                        <button className='btn-reset !rounded-l-none px-[10px] !rounded-r-lg sm:!px-[20px]'><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-[10px] text-gray-700 bg-gray-50 lg:text-[18px] md:text-[16px] sm:text-[14px] dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-[10px] py-3">
                            Tài khoản
                        </th>
                        <th scope="col" className="px-[5px] py-3">
                            <p className="flex items-center"><i className="fa-regular fa-pen-to-square text-sky-400 mr-[8px]"></i><span className="text-sky-400">Edit</span></p>
                        </th>
                        <th className="px-[8px] py-3">
                            <i className="fa-regular fa-trash-can text-16 text-red-600"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (locNguoiDung ? locNguoiDung : danhSachNguoiDung)?.map((a, index) => (
                            <tr key={index} className="bg-white border-b text-[10px] lg:text-[18px] md:text-[16px] sm:text-[14px] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white px-[10px] py-4">
                                    {a.taiKhoan}
                                </th>
                                <td className="px-[5px] py-4">
                                    <button type="button" className="text-[10px] md:text-[16px] sm:text-[14px] cursor-pointer text-sky-400 flex items-center" onClick={() => {
                                        showModal()
                                        dispatch(quanLyNguoiDungActions.timKiemUser(a))
                                    }}><i className="fa-regular fa-pen-to-square mr-[5px]"></i><span>Edit</span></button>
                                </td>
                                <td className="px-[8px] py-4">
                                    <button onClick={() => {
                                        dispatch(XoaNguoiDungThunk(a.taiKhoan)).unwrap().then(() => { dispatch(TimKiemNguoiDungThunk(chonMaNhom)), toast.success('Xóa thành công') }).catch((error) => { toast.error(error.response.data.content) })
                                    }}><i className="fa-regular fa-trash-can text-[10px] md:text-[16px] sm:text-[14px] cursor-pointer text-red-600"></i></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Modal footer={false} open={isModalOpen} onCancel={handleCancel} closeIcon={false}>
                <form onSubmit={handleSubmit(setSubmit)}>
                    <div className="flex justify-end">
                        <button type="reset" className="btn-reset !from-orange-400 !to-red-600 ml-[10px] p-2" onClick={() => { handleCancel() }}>{xIconSVG()}</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-[20px]">
                        <Input className="input pointer-events-none !text-gray-400" label="Tài khoản" placeholder="Tài khoản" id="taiKhoan" error={errors?.taiKhoan?.message} register={register} />
                        <Input className="input" label="Mật khẩu" placeholder="Mật khẩu" id="matKhau" error={errors?.matKhau?.message} register={register} />
                        <Input className="input" label="Họ tên" placeholder="Họ tên" id="hoTen" error={errors?.hoTen?.message} register={register} />
                        <Input className="input" label="Số điện thoại" placeholder="Số điện thoại" id="soDt" error={errors?.soDt?.message} register={register} />
                        <Input className="input" label="Email" placeholder="Email" id="email" error={errors?.email?.message} register={register} />
                        <Input className="input pointer-events-none !text-gray-400" label="Mã nhóm" placeholder="Mã nhóm" id="maNhom" error={errors?.maNhom?.message} register={register} />
                    </div>
                    <div className="mb-6 sm:h-[70px] h-[50px]s sm:mt-[20px]">
                        <label htmlFor="maLoaiNguoiDung" className='label'>Mã loại người dùng</label>
                        <select name="maLoaiNguoiDung" id="maLoaiNguoiDung" className="input" {...register('maLoaiNguoiDung')}>
                            <option value="">Mã loại người dùng</option>
                            <option value="QuanTri">Quản trị</option>
                            <option value="KhachHang">Khách hàng</option>
                        </select>
                        {
                            errors?.maLoaiNguoiDung && <p className="text-red-600 text-right py-[5px] text-[11px] sm:text-[16px]">{errors?.maLoaiNguoiDung.message}</p>
                        }
                    </div>
                    <Button htmlType="submit" className={cn("btn-register sm:!mt-[16px]")}>Cập nhật</Button>
                    <Button htmlType="reset" className="btn-cancel" onClick={() => { handleCancel() }}>Thoát</Button>
                </form>
            </Modal>
        </div>
    )
}
