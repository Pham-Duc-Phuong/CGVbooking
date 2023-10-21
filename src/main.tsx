import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { store } from 'store'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ToastContainer />
    <ConfigProvider theme={{ token: { colorBgContainer: 'transparent' }, components: { Modal: { contentBg: '#111827' } } }}>
      <StyleProvider hashPriority="high">
        <Provider store={store}>
          <App />
        </Provider>
      </StyleProvider>
    </ConfigProvider>
  </BrowserRouter>

)
