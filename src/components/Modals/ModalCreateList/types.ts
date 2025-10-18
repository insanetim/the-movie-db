import { FormInstance, InputRef, ModalProps } from 'antd'
import { ListData } from 'src/store/features/list'

export type ModalCreateListHookProps = {
  form: FormInstance
  onSubmit?: (listData: ListData) => Promise<void>
}

export type ModalCreateListHookReturn = {
  handleAfterOpenChange: (open: boolean) => void
  handleOk: () => void
  handleSubmit: (listData: ListData) => void
  inputRef: React.RefObject<InputRef>
}

export type ModalCreateListProps = ModalProps & {
  onSubmit?: (listData: ListData) => Promise<void>
}
