import React from 'react'
import { Modal, Form, Input } from 'antd'

const CreateListModal = () => (
  <Modal
    open={false}
    okText='Create'
    title='Create list'
  >
    <Form>
      <Form.Item
        validateStatus='error'
        help='Should be combination of numbers &#38; alphabets'
      >
        <Input placeholder='Name' />
      </Form.Item>
      <Form.Item>
        <Input placeholder='Description' />
      </Form.Item>
    </Form>
  </Modal>
)

export default CreateListModal
