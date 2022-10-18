import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input } from 'antd'
import { useContainer } from './hook'

const CreateListModal = ({ onCancel, cb, ...rest }) => {
  const [form] = Form.useForm()
  const { handleOk, handleSubmit, handleAfterClose } = useContainer(form, cb)

  return (
    <Modal
      destroyOnClose
      title='Create list'
      okText='Create'
      onCancel={onCancel}
      onOk={handleOk}
      afterClose={handleAfterClose}
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

CreateListModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  cb: PropTypes.func
}

CreateListModal.defaultProps = {
  cb: null
}

export default CreateListModal
