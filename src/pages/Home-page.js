import React, { useEffect, useState } from "react";
import HeaderPages from '../Components/header-pages'
import { Row, Col,Card } from 'antd';
import {createtask} from '../services/task-bot-discord'
import CardComponent from '../Components/home-component/Card'

const style = { background: '#0092ff', padding: '8px 0' };

const HomePage = () =>{
  const [cardData, setCardData] = useState([])
  useEffect(() => {
    function getData(){

      setCardData([
        {
          value: 10,
          isUp: false,
          title: "All Task tuần này:"
        },
        {
          value: 10,
          isUp: true,
          title: "Task Done Tuần này:"
        },
        {
          value: 10,
          isUp: true,
          title: "Task Unf Tuần này:"
        },
        {
          value: 10,
          isUp: true,
          title: "Task Done Tuần này:"
        }
      ])
      return {
        value: 10,
        isUp: true
      }
    }
    
    getData()

  })
  const numberCards = cardData.map((item, key) => (
    <Col key={key} className="gutter-row" lg={6} md={12} span={6}>
      <CardComponent 
      value={item.value} 
      isUp={item.isUp}
      title={item.title}
      />
    </Col>
))
  return <>
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
