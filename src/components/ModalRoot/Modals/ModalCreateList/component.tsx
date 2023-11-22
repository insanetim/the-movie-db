import { Form, Input, Modal } from 'antd'

import useContainer from './hook'
import { ModalCreateListProps } from './types'

const ModalCreateList: React.FC<ModalCreateListProps> = ({
  movieId,
  onSuccess,
  ...props
}) => {
  const [form] = Form.useForm()
  const {
    handleAfterClose,
    handleAfterOpenChange,
    handleOk,
    handleSubmit,
    inputRef
  } = useContainer({
    form,
    movieId,
    onSuccess
  })

  return (
    <Modal
      afterClose={handleAfterClose}
      afterOpenChange={handleAfterOpenChange}
      destroyOnClose
      okText='Create'
      onOk={handleOk}
      open
      title='Create list'
      {...props}
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
          <Input
            placeholder='Name'
            ref={inputRef}
          />
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
