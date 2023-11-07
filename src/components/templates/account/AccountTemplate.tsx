import { useState } from "react"
import { AccountInfo, HistoryBooking, Password } from "."

export const AccountTemplate = () => {
  const [activeTabs, setActiveTabs] = useState(1)
  const ActiveTabs = (index) => {
    setActiveTabs(index)
  }
  return (
    <div className="mt-[30px] max-w-screen-2xl m-auto p-[20px]">
      <div>
        <ul className="max-w-screen-2xl flex flex-wrap gap-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 border-b pb-[15px]">
          <li className="mr-2">
            <a href="#" className={activeTabs === 1 ? 'tabs-info-active' : 'tabs-info'} onClick={() => ActiveTabs(1)}>Thông tin tài khoản</a>
          </li>
          <li className="mr-2">
            <a href="#" className={activeTabs === 2 ? 'tabs-info-active' : 'tabs-info'} onClick={() => ActiveTabs(2)}>Đổi mật khẩu</a>
          </li>
          <li className="mr-2">
            <a href="#" className={activeTabs === 3 ? 'tabs-info-active' : 'tabs-info'} onClick={() => ActiveTabs(3)}>Lịch sử đặt vé</a>
          </li>
        </ul>
      </div>
      <div className={activeTabs === 1 ? 'block h-auto sm:h-[800px]' : 'hidden'}>
        <AccountInfo />
      </div>
      <div className={activeTabs === 2 ? 'block h-auto sm:h-[800px]' : 'hidden'}>
        <Password />
      </div>
      <div className={activeTabs === 3 ? 'block h-auto sm:h-[800px]' : 'hidden'}>
        <HistoryBooking />
      </div>
    </div>
  )
}
