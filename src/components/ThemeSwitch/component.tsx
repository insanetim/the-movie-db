import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Segmented } from 'antd'
import { SegmentedOptions } from 'antd/es/segmented'
import { Theme } from 'src/store/features/app'

import useContainer from './hook'

const ThemeSwitch = () => {
  const { currentTheme, handleChange } = useContainer()

  const options: SegmentedOptions<Theme> = [
    { icon: <SunOutlined />, value: 'light' },
    { icon: <MoonOutlined />, value: 'dark' },
  ]

  return (
    <Segmented
      onChange={handleChange}
      options={options}
      shape='round'
      value={currentTheme}
    />
  )
}

export default ThemeSwitch
