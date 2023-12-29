import { FormInstance, InputRef, ModalProps } from 'antd'
import { IMovie } from 'src/interfaces/movie.interface'

export type ListData = { description: string; name: string }

export type ModalCreateListProps = ModalProps & {
  movieId?: IMovie['id']
  onSuccess?: () => void
}

export type ModalCreateListHookProps = {
  form: FormInstance
  movieId?: IMovie['id']
  onSuccess?: () => void
}

export type ModalCreateListHook = {
  handleAfterClose: () => void
  handleAfterOpenChange: (open: boolean) => void
  handleOk: () => void
  handleSubmit: (listData: ListData) => void
  inputRef: React.RefObject<InputRef>
}
