import React from "react";
import { Row, Col,Button, DatePicker, Space } from 'antd';
import BarChartComponent from '../Components/Bar-chart.component'
import {getDataForBarChar} from "../services/task-bot-discord"
import HeaderPage from '../Components/header-pages'
import Notification from "../Components/nofication-component";
import {
    SyncOutlined,
  } from '@ant-design/icons';
  import moment from "moment"
  const { RangePicker } = DatePicker;


const ManagerTimePage = () => {
    const [dataTask, setDataTask] = React.useState({})

    React.useEffect( () => {
         getDataForBarChar().then(data=> {
            setDataTask(data)
            if(data){
                Notification({
                    type: "success",
                    message: "Lấy dữ liệu thành công!"
                })
            }else{
                Notification({
                    type: "success",
                    message: "Không có dữ liệu hoặc không lấy được dữ liệu!"
                })
            }
        })
    return true
    }, [])

    function onChange(dates, dateStrings) {
        const ranger = {
            startDate: dateStrings[0],
            endDate: dateStrings[1]
        }
        getDataForBarChar(ranger).then(data=> {
            setDataTask(data)
            if(data){
                Notification({
                    type: "success",
                    message: "Lấy dữ liệu mới thành công!"
                })
            }
        })
      }

    return (
        <>
        <HeaderPage onback="null" 
        title="Analytic Task"
        extra={[
            <Space direction="vertical" size={12}>
                <RangePicker
                ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'This week': [moment().startOf('week'), moment().endOf('week')],

                }}
                onChange={onChange}   
            //    showTime
               />
                
            </Space>,
            <Button type="primary" 
            icon={<SyncOutlined spin/>}
            onClick={() => {
                getDataForBarChar().then(data=> {
                    setDataTask(data)
                    if(data){
                        Notification({
                            type: "success",
                            message: "Đã load xong dữ liệu mới!"
                        })
                    }
                })
            }}>
                Click to async data
            </Button>
        ]}
        />
        <Row>
        <Col span={18} push={6}>
        <BarChartComponent config={dataTask}/>

        </Col>
        <Col span={6} pull={18}>

        </Col>
      </Row>
      </>
    )
}

export default ManagerTimePage