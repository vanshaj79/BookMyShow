
import React, { useEffect, useState } from 'react'
import { message, Table } from "antd";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/loaderSlice';
import { GetAllTheatres, UpdateTheatre } from '../../apicalls/theatres';

const TheatresList = () => {
    const [theatres, setTheatres] = useState([])
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(showLoading());
            const response = await GetAllTheatres();
            if(response.success) {
                setTheatres(response.data)
            } else {
                message.error(response.message)
            }
            dispatch(hideLoading())
        } catch (error) {
            message.error(error)
            dispatch(hideLoading())
        }
    }

    const handleStatusChange = async (theatre) => {
        try {
            dispatch(showLoading());
            const response = await UpdateTheatre({
                ...theatre,
                theatreId: theatre._id,
                isActive: !theatre.isActive
            });
            if(response.success) {
                setTheatres(response.data)
                getData()
            } else {
                message.error(response.message)
            }
            dispatch(hideLoading())
        } catch (error) {
            message.error(error)
            dispatch(hideLoading())
        }
    }

    const columns = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Address",
          dataIndex: "address",
        },
        {
          title: "Phone",
          dataIndex: "phone",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Owner",
          dataIndex: "owner",
          render: (text, record) => {
            return record.owner.name;
          },
        },
        {
          title: "Status",
          dataIndex: "isActive",
          render: (text, record) => {
            if (text) {
              return "Approved";
            } else {
              return "Pending / Blocked";
            }
          },
        },
        {
          title: "Action",
          dataIndex: "action",
          render: (text, record) => {
            return (
              <div className="flex gap-1">
                {record.isActive && (
                  <span
                    className="underline"
                     onClick={() => handleStatusChange(record)}
                  >
                    Block
                  </span>
                )}
                {!record.isActive && (
                  <span
                    className="underline"
                    onClick={() => handleStatusChange(record)}
                  >
                    Approve
                  </span>
                )}
              </div>
            );
          },
        },
      ];

      useEffect(() => {
        getData()
      }, [])

  return (
    <div>
      <Table columns={columns} dataSource={theatres}  />
    </div>
  );
}

export default TheatresList
