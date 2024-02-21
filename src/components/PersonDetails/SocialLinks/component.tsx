import {
  FacebookFilled,
  InstagramOutlined,
  TikTokFilled,
  TwitterOutlined,
} from '@ant-design/icons'
import { Flex } from 'antd'
import { isNotNil } from 'ramda'

import { SocialLinksProps } from './types'

const SocialLinks: React.FC<SocialLinksProps> = ({ externalIds }) => {
  return (
    <Flex
      className='social-link__list'
      gap={16}
    >
      {isNotNil(externalIds.facebook_id) && (
        <a
          className='social-link'
          href={`https://facebook.com/${externalIds.facebook_id}`}
          rel='noreferrer'
          target='_blank'
        >
          <FacebookFilled />
        </a>
      )}
      {isNotNil(externalIds.instagram_id) && (
        <a
          className='social-link'
          href={`https://instagram.com/${externalIds.instagram_id}`}
          rel='noreferrer'
          target='_blank'
        >
          <InstagramOutlined />
        </a>
      )}
      {isNotNil(externalIds.tiktok_id) && (
        <a
          className='social-link'
          href={`https://tiktok.com/@${externalIds.tiktok_id}`}
          rel='noreferrer'
          target='_blank'
        >
          <TikTokFilled />
        </a>
      )}
      {isNotNil(externalIds.twitter_id) && (
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
