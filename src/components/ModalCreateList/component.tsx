import { Modal, Form, Input } from 'antd'

import type { ModalCreateListProps } from './types'
import useContainer from './hook'

const ModalCreateList: React.FC<ModalCreateListProps> = ({ movieId, ...rest }) => {
  const [form] = Form.useForm()
  const { handleOk, handleSubmit, handleAfterClose } = useContainer({ form, movieId })

  return (
    <Modal
      open
      title='Create list'
      okText='Create'
      onOk={handleOk}
      afterClose={handleAfterClose}
      destroyOnClose
      {...rest}
    >
      <Form
        form={form}
        autoComplete='off'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='name'
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input placeholder='Name' />
        </Form.Item>
        <Form.Item
          name='description'
          rules={[{ required: true, message: 'Description is required' }]}
        >
          <Input placeholder='Description' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalCreateList
