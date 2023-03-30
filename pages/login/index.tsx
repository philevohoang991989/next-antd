import { authApi } from '@/api-client'
import { EmptyLayout } from '@/components/layout'
import { storageKeys } from '@/constants/storage-keys'
import { Button, Form, Input } from 'antd'
import { setCookie } from 'cookies-next'
import styles from './styles.module.scss'

export default function Login() {
  const [form] = Form.useForm()
  const onFinish = async (values: any) => {
    console.log('Success:', values)
    const datalogin: any = await authApi.login(values)
    setCookie(storageKeys.accessToken, datalogin.data.access_token)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <Form
          form={form}
          name='login'
          wrapperCol={{ span: 24 }}
          layout='vertical'
          labelCol={{ span: 8 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className={styles.loginContent}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            className={styles.formInput}
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input className={styles.inputField} />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            className={styles.formInput}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password className={styles.inputField} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button className={styles.btnLogin} type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

Login.Layout = EmptyLayout
