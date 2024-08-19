import React from 'react'
import { Tabs } from 'antd'
import PageTitle from '../../components/PageTitle'
import MovieList from './MovieList'
import TheatresList from './TheatresList'

const Admin = () => {
  return (
    <>
      <PageTitle title="Admin" />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Movies" key="1">
          <MovieList/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theatres" key="2">
          <TheatresList/>
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}

export default Admin