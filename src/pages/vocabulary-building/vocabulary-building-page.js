import React from "react";
import HeaderPages from '../../Components/header-pages'
import { Form, Input, Button, Switch, Row, Col } from 'antd';
import FormInput from './form-input'
import TableVocabulary from './table'
import {
  SyncOutlined,
  SearchOutlined
} from '@ant-design/icons';

const VocabulayBuidingPages = () =>{

  return <>
    <HeaderPages onback="null" title="Manager Task"
    />  
    <Row>
    <Col xs={4} sm={6} md={6} lg={6} xl={8}>
      <FormInput />
    </Col>
    <Col xs={20} sm={18} md={18} lg={18} xl={14} >
      <TableVocabulary/>
    </Col>
  </Row>
</>
}
export default VocabulayBuidingPages;
