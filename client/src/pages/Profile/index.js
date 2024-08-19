import React from "react";
import PageTitle from "../../components/PageTitle";
import { Tabs } from "antd";
import TheatreList from "./TheatreList";
//import TheatreList from "./TheatreList";

const Profile = () => {
  return (
    <>
      <PageTitle title="Profile" />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
          Bookings
        </Tabs.TabPane>
        <Tabs.TabPane tab="Apply for Theatre" key="2">
          <TheatreList/>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default Profile;
