import { notification } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import React from 'react'

const CustomNotification: React.FC<NotificationProps> = ({
  message = 'Tiêu đề thông báo',
  showProgress = false,
  pauseOnHover = false,
  duration = 4,
  placement = 'topRight',
  onClose,
}) => {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api.open({
      message,
      showProgress,
      pauseOnHover,
      duration,
      placement,
      onClose,
      icon: getNotificationIcon(message), 
    })
  }

  return (
    <>
      {contextHolder}
      <button onClick={openNotification} style={{ display: 'none' }} />
    </>
  )
}

export const useCustomNotification = () => {
  const [api, contextHolder] = notification.useNotification()

  const showNotification = (props: NotificationProps) => {
    api.open({
      message: props.message || 'Tiêu đề thông báo',
      showProgress: props.showProgress ?? false,
      pauseOnHover: props.pauseOnHover ?? false,
      duration: props.duration ?? 4,
      placement: props.placement || 'topRight',
      onClose: props.onClose,
      icon: getNotificationIcon(props.message), 
    })
  }

  return { showNotification, contextHolder }
}

const getNotificationIcon = (message: string | undefined) => {
  if (!message) return null

  if (message.toLowerCase().includes('thành công') || message.toLowerCase().includes('success')) {
    return <CheckCircleOutlined style={{ color: '#52c41a' }} /> 
  } else if (message.toLowerCase().includes('thất bại') || message.toLowerCase().includes('failed')) {
    return <CloseCircleOutlined style={{ color: '#ff4d4f' }} /> 
  } else if (message.toLowerCase().includes('lỗi') || message.toLowerCase().includes('error')) {
    return <ExclamationCircleOutlined style={{ color: '#faad14' }} /> 
  }
  return null
}

export default CustomNotification