import type { FormInstance, ModalProps } from 'antd'

export interface ModalCreateListProps extends ModalProps {
  movieId?: number
}

export interface ModalCreateListHookProps {
  form: FormInstance
  movieId?: number
}

export type ListData = { name: string; description: string }

export interface ModalCreateListHook {
  handleOk: () => void
  handleSubmit: (listData: ListData) => void
  handleAfterClose: () => void
}
