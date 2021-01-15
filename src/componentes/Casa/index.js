import React, { Component } from 'react';
import axios from 'axios';
import { Table, Divider, Tag , Button, Col, Row, Typography} from 'antd';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'; 
const { Title, Paragraph, Text } = Typography;

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
     
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
     
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
        title: 'Nro Hab',
        dataIndex: 'nro_hab',
        key: 'nro_hab',
    },
    {
      title: 'Accion',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to ={"casa/edit/" + record.id}>Editar</Link>
          <Divider type="vertical" />
          <a href="javascript:;">Eliminar</a>
        </span>
      ),
    },
  ];


class CasaIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            casas : []
        }
    }

    componentDidMount() {
      this.getCasas();
    }

    getCasas() {
        axios.get('http://127.0.0.1:8000/api/casa')
        .then((resp) => {
            let result = resp.data;
            let data = result.casas;
            let length = data.length;
            let arr = [];
            for (let i = 0; i < length; i++) {
                arr.push({
                    key: i,
                    id: data[i].id,
                    descripcion: data[i].descripcion,
                    area: data[i].area + ' m2',
                    nro_hab: data[i].nro_hab
                });
            }
            this.setState({
            casas: arr
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render(){
      const { casas } = this.state;
        return(
            <div>
            <Row>
                <Col span={18}>
                    <Title>Lista De Casas</Title>
                </Col>
                <Col span={6}>
                  <Button type="primary"><Link to ="/casa/create">Registrar Nueva Casa</Link></Button>
                </Col>
            </Row>
                
                <Table columns={columns} dataSource={casas} />
            </div>

        )
    }
}
export default CasaIndex;

