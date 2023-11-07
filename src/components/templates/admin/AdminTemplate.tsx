import { useState } from 'react'
import { AddNguoiDung, AdminLichChieu, AdminNguoiDung } from '.'


export const AdminTemplate = () => {
  const [activeTabs, setActiveTabs] = useState(1)
  const ActiveTabs = (index) => {
    setActiveTabs(index)
  }
  return (
    <div className="mt-[30px] max-w-screen-2xl m-auto p-[20px]">
      <div>
        <ul className="max-w-screen-2xl flex flex-wrap gap-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 border-b pb-[15px]">
          <li className="mr-2">
            <a href="#" className={activeTabs === 1 ? 'tabs-info-active' : 'tabs-info'} onClick={() => ActiveTabs(1)}>Thêm tài khoản</a>
          </li>
          <li className="mr-2">
            <a href="#" className={activeTabs === 2 ? 'tabs-info-active' : 'tabs-info'} onClick={() => ActiveTabs(2)}>Quản lý tài khoản</a>
          </li>
          <li className="mr-2">
            <a href="#" className={activeTabs === 3 ? 'tabs-info-active' : 'tabs-info'} onClick={() => ActiveTabs(3)}>Quản lý lịch chiếu</a>
          </li>
        </ul>
      </div>
      <div className={activeTabs === 1 ? 'block' : 'hidden'}>
        <AddNguoiDung />
      </div>
      <div className={activeTabs === 2 ? 'block' : 'hidden'}>
        <AdminNguoiDung />
      </div>
      <div className={activeTabs === 3 ? 'block' : 'hidden'}>
        <AdminLichChieu />
      </div>
    </div>
  )
}
