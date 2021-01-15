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
      title: 'Fecha Inicio',
      dataIndex: 'fecha_ini',
      key: 'fecha_ini',
     
    },
    {
      title: 'Fecha Fin',
      dataIndex: 'fecha_fin',
      key: 'fecha_fin',
    },
    {
        title: 'Cliente',
        dataIndex: 'cliente',
        key: 'cliente',
    },
    {
        title: 'Cuota Mex',
        dataIndex: 'cuota_mes',
        key: 'cuota_mes',
    },
    {
      title: 'Accion',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to ={"alquiler/edit/" + record.id}>Editar</Link>
          <Divider type="vertical" />
          <a href="javascript:;">Eliminar</a>
        </span>
      ),
    },
  ];


class NotaAlquilerIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            alquileres : []
        }
    }

    componentDidMount() {
      this.getAlquileres();
    }

    getAlquileres() {
        axios.get('http://127.0.0.1:8000/api/alquiler')
        .then((resp) => {
            let result = resp.data;
            let data = result.data;
            console.log(data)
            let length = data.length;
            let arr = [];
            for (let i = 0; i < length; i++) {
                arr.push({
                    key: i,
                    id: data[i].id,
                    fecha_ini: data[i].fecha_ini,
                    fecha_fin: data[i].fecha_fin,
                    cliente: data[i].nombre + ' ' + data[i].apellido,
                    cuota_mes: data[i].cuota_mes
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
                    <Title>Lista De Alquileres</Title>
                </Col>
                <Col span={6}>
                  <Button type="primary"><Link to ="/alquiler/create">Registrar Nuevo Alquiler</Link></Button>
                </Col>
            </Row>
                
                <Table columns={columns} dataSource={casas} />
            </div>

        )
    }
}
export default NotaAlquilerIndex;

