import { Col, Flex, Image, Row, Segmented, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import NoImage from 'src/assets/images/no-image.svg'
import Empty from 'src/components/UI/Empty'
import Error from 'src/components/UI/Error'
import GoBackLink from 'src/components/UI/GoBackLink'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'
import {
  releaseDateSorter,
  titleSorter,
} from 'src/utils/helpers/creditsSorters'
import metaTitle from 'src/utils/helpers/metaTitle'

import useContainer from './hook'
import { FilterOptions, ICredit } from './types'

const Credits: React.FC = () => {
  const { dataSource, error, handleChangeFilter, loading, person, personSlug } =
    useContainer()

  if (loading) {
    return (
      <div className='container top-margin'>
        <Loading />
      </div>
    )
  } else if (error) {
    return (
      <div className='container top-margin'>
        <Error error={error} />
      </div>
    )
  } else if (!person) {
    return <Empty description='Person not found' />
  }

  const columns: ColumnsType<ICredit> = [
    {
      align: 'center',
      dataIndex: 'releaseDateTitle',
      fixed: 'left',
      key: 'releaseDateTitle',
      sorter: releaseDateSorter,
      title: 'Release Date',
      width: 180,
    },
    {
      dataIndex: 'title',
      key: 'title',
      render: (title: string, credit) => {
        return <Link to={`/movie/${credit.movieSlug}`}>{title}</Link>
      },
      sorter: titleSorter,
      title: 'Title',
    },
    {
      dataIndex: 'role',
      key: 'role',
      title: 'Role',
    },
    {
      align: 'center',
      dataIndex: 'posterPath',
      key: 'posterPath',
      render: (posterPath: null | string, credit) => {
        const POSTER_HEIGHT = 120

        let poster: JSX.Element
        if (posterPath) {
          poster = (
            <Image
              alt={credit.title}
              height={POSTER_HEIGHT}
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              style={{ borderRadius: 8 }}
            />
          )
        } else {
          poster = (
            <div
              className='person-poster--no-image'
              style={{ height: POSTER_HEIGHT, margin: '0 auto' }}
            >
              <img
                alt={credit.title}
                src={NoImage}
              />
            </div>
          )
        }

        return poster
      },
      title: 'Poster',
    },
  ]

  return (
    <>
      <Helmet title={metaTitle(person.name)} />
      <div className='container top-margin'>
        <GoBackLink
          href={`/person/${personSlug}`}
          title='Back to person details'
        />
        <PageTitle>
          <Typography.Title
            level={1}
            style={{ marginBottom: 0 }}
          >
            {person.name}
          </Typography.Title>
        </PageTitle>
        <Row>
          <Col
            span={24}
            style={{ marginBottom: 12 }}
          >
            <Flex justify='end'>
              <Segmented
                onChange={handleChangeFilter}
                options={Object.values(FilterOptions)}
              />
            </Flex>
          </Col>
          <Col span={24}>
            <Table<ICredit>
              className='credits-table'
              columns={columns}
              dataSource={dataSource}
              pagination={{
                hideOnSinglePage: true,
                pageSize: 5,
                position: ['bottomCenter'],
                showSizeChanger: false,
              }}
              scroll={{ x: 744 }}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Credits
