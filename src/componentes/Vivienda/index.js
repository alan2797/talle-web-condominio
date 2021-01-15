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
      title: 'Nro Vivienda',
      dataIndex: 'Nro Vivienda',
      key: 'Nro Vivienda',
     
    },
    {
      title: 'Calle',
      dataIndex: 'Calle',
      key: 'Calle',
    },
    {
        title: 'Propietario',
        dataIndex: 'Propietario',
        key: 'Propietario',
    },
    {
      title: 'Accion',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to ={"vivienda/edit/" + record.id}>Editar</Link>
          <Divider type="vertical" />
          <a href="javascript:;">Eliminar</a>
        </span>
      ),
    },
  ];


const WS_PROPIETARIOS = 'https://condomiosevilla.000webhostapp.com/WS/obtener_propietarios.php';
//const WS_DATOS = 'http://localhost:8080/ServerCondominio/WS/obtener_viviendas.php';
const WS_DATOS = 'https://condomiosevilla.000webhostapp.com/WS/obtener_viviendas.php';

class ViviendaIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            viviendas : []
        }
    }

    componentDidMount() {
      this.getViviendas();
    }

    getViviendas() {
      axios.get(WS_DATOS)
      .then((resp) => {
        let result = resp.data;
        console.log('RESULT ==> ', result);
        if (result.response == 1) {
          let data = result.data;
          let length = data.length;
          let arr = [];
          for (let i = 0; i < length; i++) {
            arr.push({
              key: i,
              id: data[i].idvivienda,
              'Nro Vivienda': data[i].nro_vivienda,
              Calle: data[i].calle,
              Propietario: data[i].fkidpropietario
            });
          }
          this.setState({
            viviendas: arr
          })
        }
      })
    }
    render(){
      const { viviendas } = this.state;
        return(
            <div>
            <Row>
                <Col span={18}>
                    <Title>Lista De Viviendas</Title>
                </Col>
                <Col span={6}>
                  <Button type="primary"><Link to ="/vivienda/create">Registrar Nueva Vivienda</Link></Button>
                </Col>
            </Row>
                
                <Table columns={columns} dataSource={viviendas} />
            </div>

        )
    }
}
export default ViviendaIndex;

