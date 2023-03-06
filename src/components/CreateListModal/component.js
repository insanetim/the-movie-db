import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input } from 'antd'

import useContainer from './hook'

const CreateListModal = ({ movieId, ...rest }) => {
  const [form] = Form.useForm()
  const { handleOk, handleSubmit, handleAfterClose } = useContainer({ form, movieId })

  return (
    <Modal
      destroyOnClose
      title='Create list'
      okText='Create'
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
  movieId: PropTypes.number
}

CreateListModal.defaultProps = {
  movieId: undefined
}

export default CreateListModal
