import { Form, Input, Modal } from 'antd'

import type { ModalCreateListProps } from './types'

import useContainer from './hook'

const ModalCreateList: React.FC<ModalCreateListProps> = ({ movieId, ...rest }) => {
  const [form] = Form.useForm()
  const { handleAfterClose, handleOk, handleSubmit } = useContainer({ form, movieId })

  return (
    <Modal
      afterClose={handleAfterClose}
      destroyOnClose
      okText='Create'
      onOk={handleOk}
      open
      title='Create list'
      {...rest}
    >
      <Form
        autoComplete='off'
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name='name'
          rules={[{ message: 'Name is required', required: true }]}
        >
          <Input placeholder='Name' />
        </Form.Item>
        <Form.Item
          name='description'
          rules={[{ message: 'Description is required', required: true }]}
        >
          <Input placeholder='Description' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalCreateList
