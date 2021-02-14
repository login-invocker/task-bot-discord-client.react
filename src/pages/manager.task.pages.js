import React, { useState, useEffect } from 'react';
import "./manage-task.css"
import { Table, Input, Popconfirm, Form, Typography, DatePicker, Alert, Tag, Switch } from 'antd';

import Notification from "../Components/nofication-component";
import {getTasks, updateTask, removeTask} from "../services/task-bot-discord"
import moment from 'moment'
import HeaderPage from '../Components/header-pages'

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'YYYY-MM-DD'];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'chinh-xac-la-date' 
  ? <DatePicker  
  format={dateFormatList}  />
  : inputType === "switch"
  ? <Switch checkedChildren="Yes" unCheckedChildren="No" />
  : <Input />;
  return (
    <td {...restProps}>
      {editing && inputType !== 'switch'? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) 
      : editing && inputType === 'switch'
      ? (
        <Form.Item
          name={dataIndex}
          // switch
          valuePropName= {(record.isModel === true || record.isModel === "Yes") && dataIndex === "isModel" || (record.isImportant === true || record.isImportant === "Yes" ) && dataIndex === "isImportant" ||  (record.isEmergency === true || record.isEmergency === "Yes") && dataIndex === "isEmergency" ? 'checked': ''}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) 
      
      : (
        children
      )}
    </td>
  );
};

const ManagerTask = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    const callApi = async () => {
      const dataRes = await getTasks();
      let dataMap = []
      if(dataRes){
        for (let i = 0; i < dataRes.length; i++) {
            dataMap.push({
              key: i.toString(),
              id: dataRes[i]['_id'],
              title: dataRes[i]['title'],
              content: dataRes[i]['content'] || "Chưa cập nhập",
              status: dataRes[i]['status'] ? "Đã hoàn thành" : "Chưa hoàn thành",
              date: moment(dataRes[i]['date']).format(dateFormatList[2]),
              isModel: dataRes[i]['isModel'] === true ? 'Yes': 'No',
              isImportant: dataRes[i]['isImportant'] === true ? "Yes": "No",
              isEmergency: dataRes[i]['isEmergency'] === true? "Yes": 'No',
            });
          }
        setData(dataMap)
        Notification({
          type: "success",
          message: "Lấy dữ liệu thành công!"
        })
      }
      else{
        Notification({
          type: "error",
          message: "Lấy dữ liệu thất bại!"
        })
      }
    }
    callApi()
  }, [])

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
        id: '',
      title: '',
      content: '',
      date: '',
      isImportant: false,
      isEmergency: false,
      isModel:false,
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      row.isModel = (row.isModel === true || row.isModel === "Yes")? 'Yes': 'No'
      row.isImportant = (row.isImportant === true || row.isImportant === "Yes") ? "Yes": "No"
      row.isEmergency = (row.isEmergency === true || row.isEmergency === "Yes")? "Yes": 'No'
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];    

        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
        try{
            const isUpdate = await updateTask(newData[index]);
            if(isUpdate)
            {
              Notification({
                type: "success",
                message: "Cập nhật thông tin thành công!"
            })
            setEditingKey('')
            }
            
            else
            Notification({
                type: "error",
                message: "Thử lại sau!"
            })
        }catch{
            Notification({
                type: "error",
                message: "Thử lại sau!"
            })
    }
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
    }
  };

  const remove = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        try{
            const isRemoved = await removeTask(newData[index]);
            newData.splice(index, 1);
            setData(newData);
            setEditingKey('');
            if(isRemoved)
            Notification({
                type: "success",
                message: "Xóa thành công!"
            })
            else
            Notification({
                type: "error",
                message: "Thử lại sau!"
            })
        }catch{
            Notification({
                type: "error",
                message: "Thử lại sau!"
            })
    }
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
    }
  };

  const columns = [
    {
        title: 'id Task',
        dataIndex: 'id',
        width: '10%',
        editable: false,
      },
    {
      title: 'Title Task',
      dataIndex: 'title',
      width: '20%',
      editable: true,
    },
    {
      title: 'Status Task',
      dataIndex: 'status',
      width: '10%',
      editable: false,
      render: status => {
        // console.log(status)
        let color = status === "Đã hoàn thành"? 'green' : 'geekblue' ;
        return (
          <>
                <Tag color={color} >
                  {status}
                </Tag>
          </>
        )
      }
    },
    {
      title: 'Content Task',
      dataIndex: 'content',
      width: '20%',
      editable: true,
    },
    {
      title: `Date (${dateFormatList[2]})`,
      dataIndex: 'date',
      width: '15%',
      editable: true,
      filters: [
        {
          text: 'Today',
          value: "no need value",
        }
      ],
      onFilter: (value, record) => {
        const date = new Date();
        return moment(date).format('YYYY-MM-DD') === record.date
      }
    },
    {
      title: 'Important',
      dataIndex: 'isImportant',
      width: '5%',
      editable: true,
    },
    {
      title: 'Emergency',
      dataIndex: 'isEmergency',
      width: '5%',
      editable: true,
    },
    {
      title: 'Model task',
      dataIndex: 'isModel',
      width: '5%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
            <a
              href="javascript:;"
              onClick={() => remove(record.key)}
              style={{
                marginLeft: 8,
              }}
            >
              Remove
            </a>
          </span>
        ) : (
        <>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'date' 
        ? 'date'
        : col.dataIndex ==='isModel' || col.dataIndex === 'isImportant' || col.dataIndex === 'isEmergency'
        ? 'switch'
        : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
    <HeaderPage onback="null" title="Manager Task"/><Alert message="Dùng lệnh `$done +idTask` channel discord để  đánh dấu hoàn thành task" type="warning" />

    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    </>
  );
};

export default ManagerTask