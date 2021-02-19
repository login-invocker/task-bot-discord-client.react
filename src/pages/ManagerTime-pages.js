import React from "react";
import { Row, Col,Button } from 'antd';
import DoughnutComponent from '../Components/Doughnut.component'
import PiceChartRechar from '../Components/PiceChartRechar.component'
import {getMatrixTasks} from "../services/task-bot-discord"
import HeaderPage from '../Components/header-pages'
import Notification from "../Components/nofication-component";
import {
    SyncOutlined,
  } from '@ant-design/icons';

let allTask = []
let colors = []
const ManagerTimePage = () => {
    const [reload, setReload] = React.useState({})
    // const [color, setColors] = React.useState([])
    React.useEffect(async () => {
        const dataTask = await getMatrixTasks()
        if(dataTask && dataTask.length > 0){
            Notification({
                type: "success",
                message: "Lấy dữ liệu thành công!"
            })
            allTask = dataTask

            const setBg = () => {
                    allTask.forEach(() => {
                    let randomColor = Math.floor(Math.random()*16777215).toString(16);
                    randomColor = "#" + randomColor;
                    colors.push(randomColor)
                })    
            }
            setBg()
            setReload('')
        }else if(dataTask.length === 0){
            Notification({
                type: "warning",
                message: "Không có dữ liệu!"
            })
        }else{
            Notification({
                type: "error",
                message: "Lấy dữ liệu thất bại!"
            })
        }

    },[])

    const wrap2ArrayTask = () => {
        const titleArray = allTask.map(task => task.title);
        const timePercentArray  =  allTask.map(task => task.timePercent);
        const result = {
            labels:titleArray,
            data: timePercentArray
        }
        return result
    }

    const dataForPiceChartRechar = () => {
        let data = [];
        allTask.forEach(task => {
            const x = {
                name: task.title,
                value:  task.timePercent
            }
            data.push(x)
        })
        return data
    }

    return (
        <>
        <HeaderPage onback="null" 
        title="Manager Time with matrix EISENHOWER"
        extra={[
            <Button type="primary" 
            icon={<SyncOutlined spin/>}
            onClick={() => setReload()}>
                Click to async data
            </Button>
        ]}
        />
        <Row>
        <Col span={18} push={6}>
        <DoughnutComponent colors={colors} config={wrap2ArrayTask()}/>

        </Col>
        <Col span={6} pull={18}>
        <PiceChartRechar colors={colors} config={dataForPiceChartRechar()}/>

        </Col>
      </Row>
      </>
    )
}

export default ManagerTimePage