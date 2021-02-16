import React from "react";
import {Switch, Row, Col, Space} from 'antd'
import { Bar } from "react-chartjs-2";

const BarChartComponent = (props) => {
    const [dataTask, setDataTask] = React.useState(props.config)
    const [allTaslType, setAllTaskType] =   React.useState("bar")
    const [donetaskType, setDoneTaskType] =   React.useState("bar")
    const [unTaskType, setUntaskType] =   React.useState("bar")

    React.useEffect(() => {
        setDataTask(props.config)
    },[props.config])
        return(
          <>
              <Row>
      <Col span={8}>
      <Space>
            All task: 
           <Switch
                checkedChildren="line"
                unCheckedChildren="bar"
                onChange={(isChecked) => {
                    if(isChecked === true){
                      setAllTaskType('line')
                    }else{
                      setAllTaskType('bar')
                    }

                }}
            />
            </Space>
      </Col>
      <Col span={8}>
      <Space>
            Task done: 
           <Switch
                checkedChildren="line"
                unCheckedChildren="bar"
                onChange={(isChecked) => {
                    if(isChecked === true){
                      setDoneTaskType('line')
                    }else{
                      setDoneTaskType('bar')
                    }

                }}
            />
            </Space>
      </Col>
      <Col span={8}>
      <Space>
            Unfinished task: 
           <Switch
                checkedChildren="line"
                unCheckedChildren="bar"
                onChange={(isChecked) => {
                    if(isChecked === true){
                      setUntaskType('line')
                    }else{
                      setUntaskType('bar')
                    }

                }}
            />
            </Space>
      </Col>
    </Row>
        <Bar
    data={{
      labels: dataTask.date,
      datasets: [
        {
          label: "All Task",
          backgroundColor: "rgba(51, 100, 255, 0.7)",
          borderColor: "rgba(100,100,255,1)",
          borderWidth: 1,
        //   stack: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: dataTask.allTask,
          type: allTaslType,
          fill: false,
        },

        {
          label: "Task done",
          backgroundColor: "rgba(86, 255, 138, 1)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
        //   stack: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: dataTask.taskDone,
          type: donetaskType
        },
        {
            label: "Task Unfinished",
            backgroundColor: "red",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            // stack: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: dataTask.taskUnfinished,
            type: unTaskType,
          }
      ]
    }}
    options={{
      legend: { display: true },
      title: {
        display: true,
        text: `Bảng thống kê khối lượng công việc trong ${dataTask.date?dataTask.date.length: ""} ngày từ ${dataTask.date?dataTask.date[0]: ""} đến ${dataTask.date?dataTask.date[dataTask.date.length - 1]: ""}` 
      }
    }}
  />
</>
    )
}

export default BarChartComponent