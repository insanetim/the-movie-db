import { Typography } from 'antd'
import { GENDERS } from 'src/constants'
import { getAge, getFormatedDate } from 'src/utils/helpers/getAge'

import { PersonalInfoProps } from './types'

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  birthday,
  deathday,
  gender,
  placeOfBirth,
}) => (
  <>
    <Typography.Title level={3}>Personal Info</Typography.Title>
    <Typography.Paragraph>
      <b>Gender: </b>
      <span>{GENDERS[gender]}</span>
    </Typography.Paragraph>
    {birthday && (
      <Typography.Paragraph>
        <b>Birthday: </b>
        <span>{deathday ? getFormatedDate(birthday) : getAge(birthday)}</span>
      </Typography.Paragraph>
    )}
    {deathday && birthday && (
      <Typography.Paragraph>
        <b>Deathday: </b>
        <span>{getAge(birthday, deathday)}</span>
      </Typography.Paragraph>
    )}
    {placeOfBirth && (
      <Typography.Paragraph>
        <b>Place of Birth: </b>
        <span>{placeOfBirth}</span>
      </Typography.Paragraph>
    )}
  </>
)

export default PersonalInfo
