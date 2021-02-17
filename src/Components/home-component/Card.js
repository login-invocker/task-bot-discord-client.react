import React from 'react'

import { Statistic, Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './Card.css'

function NumberCard({ icon, color, title, number, countUp, value, isUp }) {
  return (
    <Card>
      {title}
          <Statistic
            title="So với hôm qua:"
            value={value}
            precision={2}
            valueStyle={ isUp? { color: '#3f8600' }: { color: '#cf1322' }}
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
