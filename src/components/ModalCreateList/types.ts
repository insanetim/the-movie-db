import { FormInstance, InputRef, ModalProps } from 'antd'
import { IMovie } from 'src/interfaces/movie.interface'

export interface ModalCreateListProps extends ModalProps {
  movieId?: IMovie['id']
  onSuccess?: () => void
}

export interface ModalCreateListHookProps {
  form: FormInstance
  movieId?: IMovie['id']
  onSuccess?: () => void
}

export type ListData = { description: string; name: string }

export interface ModalCreateListHook {
  handleAfterClose: () => void
  handleAfterOpenChange: (open: boolean) => void
  handleOk: () => void
  handleSubmit: (listData: ListData) => void
  inputRef: React.RefObject<InputRef>
}
