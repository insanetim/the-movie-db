import { Typography } from 'antd'
import { isNotNil } from 'ramda'
import { GENDERS } from 'src/constants/app'
import getAge from 'src/utils/helpers/getAge'

import { PersonalInfoProps } from './types'

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  birthday,
  gender,
  placeOfBirth,
}) => {
  return (
    <>
      <Typography.Title level={3}>Personal Info</Typography.Title>
      <Typography.Paragraph>
        <b>Gender: </b>
        <span>{GENDERS[gender]}</span>
      </Typography.Paragraph>
      {isNotNil(birthday) && (
        <Typography.Paragraph>
          <b>Birthday: </b>
          <span>{getAge(birthday)}</span>
        </Typography.Paragraph>
      )}
      {isNotNil(placeOfBirth) && (
        <Typography.Paragraph>
          <b>Place of Birth: </b>
          <span>{placeOfBirth}</span>
        </Typography.Paragraph>
      )}
    </>
  )
}

export default PersonalInfo
