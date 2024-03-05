import {
  FacebookFilled,
  InstagramOutlined,
  TikTokFilled,
  TwitterOutlined,
} from '@ant-design/icons'
import { Flex } from 'antd'
import isPresent from 'src/utils/helpers/isPresent'

import { SocialLinksProps } from './types'

const SocialLinks: React.FC<SocialLinksProps> = ({ externalIds }) => {
  return (
    <Flex
      className='social-link__list'
      gap={16}
    >
      {isPresent(externalIds.facebook_id) && (
        <a
          className='social-link'
          href={`https://facebook.com/${externalIds.facebook_id}`}
          rel='noreferrer'
          target='_blank'
        >
          <FacebookFilled />
        </a>
      )}
      {isPresent(externalIds.instagram_id) && (
        <a
          className='social-link'
          href={`https://instagram.com/${externalIds.instagram_id}`}
          rel='noreferrer'
          target='_blank'
        >
          <InstagramOutlined />
        </a>
      )}
      {isPresent(externalIds.tiktok_id) && (
        <a
          className='social-link'
          href={`https://tiktok.com/@${externalIds.tiktok_id}`}
          rel='noreferrer'
          target='_blank'
        >
          <TikTokFilled />
        </a>
      )}
      {isPresent(externalIds.twitter_id) && (
        <a
          className='social-link'
          href={`https://twitter.com/${externalIds.twitter_id}`}
          rel='noreferrer'
          target='_blank'
        >
          <TwitterOutlined />
        </a>
      )}
    </Flex>
  )
}

export default SocialLinks
