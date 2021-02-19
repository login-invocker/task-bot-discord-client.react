import React from 'react'

import { Statistic, Card, Row, Col, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import CountUp from 'react-countup'
import './Card.css'

function NumberCard({  title, numberC, countUp, value, isUp, color, loading }) {
  return (
    <Card>
      {title}
      <Row>
      <Col flex={5}></Col>
      <Col flex={1}> <p className="number" >
      <CountUp
            start={0}
            end={numberC}
            duration={2.75}
            useEasing
            useGrouping
            separator=","
            {...(countUp || {})}
          />
          </p></Col>
      </Row>
          <Statistic
            title="So với hôm qua:"
            value={value}
            precision={2}
            valueStyle={ {color}}
            prefix={isUp? <ArrowUpOutlined />: <ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
  )
}

// NumberCard.propTypes = {
//   icon: PropTypes.string,
//   color: PropTypes.string,
//   title: PropTypes.string,
//   number: PropTypes.number,
//   countUp: PropTypes.object,
// }

export default NumberCard
