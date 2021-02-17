import React, { useEffect, useState } from "react";
import HeaderPage from '../Components/header-pages'
import { Row, Col,Card, Button } from 'antd';
import {getTaskByDate} from '../services/task-bot-discord'
import CardComponent from '../Components/home-component/Card'
import moment from "moment"
import Notification from "../Components/nofication-component";
import {
  SyncOutlined,
} from '@ant-design/icons';

const style = { background: '#0092ff', padding: '8px 0' };

const HomePage = () =>{
  const [cardData, setCardData] = useState([])
  const [reload, setReload] = useState("")
  useEffect(() => {
    async function getData(){

      
      const fistData = await getTaskByDate(moment());
      const secondData = await getTaskByDate(moment().subtract(1, "days"));
      let countTaskDone = [];
      let countTaskUnfinished = []
      countTaskDone[0] = countTaskDone[1] = 0

      if(!fistData){
          return Notification({
            type: "error",
            message: "Không có dữ liệu hoặc lấy dữ liệu thất bại"
          })
      }
      fistData.forEach(task => {
        if(task.status === true) countTaskDone[0] += 1 
      })
      secondData.forEach(task => {
        if(task.status === true) countTaskDone[1] += 1 
      })
      countTaskUnfinished[0] =  fistData.length - countTaskDone[0];
      countTaskUnfinished[1] = secondData.length - countTaskDone[1];
      

      setCardData([
        {
          numberC: fistData.length,

          value: (fistData.length/secondData.length)*100 - 100,
          isUp: fistData.length > secondData.length ? true : false,
          title: `All Task hôm nay: `,
          color: fistData.length > secondData.length ? "#3f8600": "#cf1322"
        },
        {
          value: (countTaskDone[0]/countTaskDone[1])*100 - 100,
          isUp: countTaskDone[0] > countTaskDone[1] ? true : false,
          title: `Task Done hôm nay: `,
          numberC: `${countTaskDone[0]}`,
          color: countTaskDone[0] > countTaskDone[1] ? "#3f8600": "#cf1322"
        },
        {
          value: (countTaskUnfinished[0]/countTaskUnfinished[1])*100 - 100,
          isUp: countTaskUnfinished[0] > countTaskUnfinished[1] ? true : false,
          title: `Task chưa hoàn thành hôm nay: `,
          numberC: countTaskUnfinished[0],
          color: countTaskUnfinished[0] < countTaskUnfinished[1] ? "#3f8600": "#cf1322"
        },
        {
          value: NaN,
          isUp: true,
          title: "Task Done Tuần này:",
          // countUpNum: 2
        }
      ])
    }
    
    getData()

  },[])
  const numberCards = cardData.map((item, key) => (
    <Col key={key} className="gutter-row" lg={6} md={12} span={6}>
      <CardComponent 
      value={item.value} 
      isUp={item.isUp}
      title={item.title}
      numberC = {item.numberC}
      color = {item.color}
      loading = {false}
      />
    </Col>
))
  return <>
    <HeaderPage onback="null" 
        title="Dasboard"
        extra={[
            <Button type="primary" 
            icon={<SyncOutlined spin/>}
            onClick={() => setReload("")}>
                Click to async data
            </Button>
        ]}
    />
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {numberCards}
    </Row>
<br />
    
<Row gutter={16}>
      <Col span={18}>
        <Card title="Những công việc cần làm ngay:" >
          Những công việc cần làm ngay:
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Card title">
          Card content
        </Card>
      </Col>
    </Row>
    </>
}
export default HomePage;
