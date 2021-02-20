import React, { useState, useEffect } from 'react';
import "./vocabulary.css"
import { 
  Table, Input,
  Popconfirm, Form, 
  Typography, DatePicker,
  Alert, Tag, Switch,
  Button, Space
} from 'antd';
import {listVocabulary} from '../../services/vocabulary-service'
import Highlighter from 'react-highlight-words';
import {
  SyncOutlined,
  SearchOutlined
} from '@ant-design/icons';

import Notification from "../../Components/nofication-component";
import moment from 'moment'

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'YYYY-MM-DD'];

const TableVocabulary = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    
    callApi()
  }, [])
  // 

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    }
  };

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };


  const callApi = async () => {
    const dataRes = await MapVocabulary()
      if(dataRes){
      setData(dataRes)
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

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
        id: '',
      english: '',
      vietnamese: '',
      example: '',
      date: '',
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
            // const isUpdate = await updateTask(newData[index]);
            const isUpdate = false

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
            // const isRemoved = await removeTask(newData[index]);
            const isRemoved = false
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
        width: '5%',
        editable: false,
      },
    {
      title: 'English',
      dataIndex: 'english',
      width: '15%',
      editable: true,
      ...getColumnSearchProps('english')
    },
    {
      title: 'Vietnamese',
      dataIndex: 'vietnamese',
      width: '20%',
      editable: true,
      ...getColumnSearchProps('vietnamese')
    },
    {
      title: 'Example',
      dataIndex: 'example',
      width: '30%',
      editable: true,
      ...getColumnSearchProps('example')
    },
    {
      title: `Date (${dateFormatList[2]})`,
      dataIndex: 'date',
      width: '30%',
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
              <a href="javascript:;">Cancel</a>
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
        : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // component end
  return (
    <>
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

const MapVocabulary = async () => {
  const dataRes = await listVocabulary();
  let dataMap = []
  if(dataRes !== false){
    for (let i = 0; i < dataRes.length; i++) {
        dataMap.push({
          key: i.toString(),
          id: dataRes[i]['_id'],
          english: dataRes[i]['english'] || "Chưa cập nhật",
          vietnamese: dataRes[i]['vietnamese'] || "Chưa cập nhật",
          example: dataRes[i]['example'] || "Chưa cập nhật",
          date: moment(dataRes[i]['date']).format(dateFormatList[2]),
        });
   }
    
   return dataMap
}
}

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
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
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
      : (
        children
      )}
    </td>
  );
};

export default TableVocabulary