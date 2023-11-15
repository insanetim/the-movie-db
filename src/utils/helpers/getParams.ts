type getParamsProps = {
  page?: number | string
  search?: string
}

type getParamsResult = {
  page?: string
  search?: string
}

const getParams = ({ page, search }: getParamsProps) => {
  const params: getParamsResult = {}

  if (search) {
    params.search = search
  }
  if (page && Number(page) > 1) {
    params.page = page.toString()
  }

  return params
}

export default getParams
