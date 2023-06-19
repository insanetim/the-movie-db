import type { FormInstance, ModalProps } from 'antd'

export interface ModalCreateListProps extends ModalProps {
  movieId?: number
}

export interface ModalCreateListHookProps {
  form: FormInstance
  movieId?: number
}

export type ListData = { description: string; name: string }

export interface ModalCreateListHook {
  handleAfterClose: () => void
  handleOk: () => void
  handleSubmit: (listData: ListData) => void
}
