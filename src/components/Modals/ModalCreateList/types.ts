import { FormInstance, InputRef, ModalProps } from 'antd'
import { ListData } from 'src/store/features/list'

export type ModalCreateListHookProps = {
  closeModal?: () => void
  form: FormInstance
  onSubmit?: (listData: ListData) => Promise<void>
}

export type ModalCreateListHookReturn = {
  handleAfterOpenChange: (open: boolean) => void
  handleOk: () => void
  handleSubmit: (listData: ListData) => void
  inputRef: React.RefObject<InputRef>
  isSubmitting: boolean
}

export type ModalCreateListProps = ModalProps & {
  closeModal?: () => void
  onSubmit?: (listData: ListData) => Promise<void>
}
