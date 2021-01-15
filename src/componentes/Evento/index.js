import React, { Component } from 'react';
import axios from 'axios';
import { Table, Divider , Button, Col, Row, Typography} from 'antd';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'; 
const { Title, Paragraph, Text } = Typography;
const dataSource = [
    {
      key: '1',
      Titulo: 'Mike',
      Fecha: 32,
      Tipo: '10 Downing Street',
      Importancia : 'alta'
    },
    {
        key: '1',
        Titulo: 'Mike',
        Fecha: 32,
        Tipo: '10 Downing Street',
        Importancia : 'alta'
      },
      {
        key: '1',
        Titulo: 'Mike',
        Fecha: 32,
        Tipo: '10 Downing Street',
        Importancia : 'alta'
      },
      {
        key: '1',
        Titulo: 'Mike',
        Fecha: 32,
        Tipo: '10 Downing Street',
        Importancia : 'alta'
      },
  ];
  const columns = [
    {
      title: 'Titulo',
      dataIndex: 'Titulo',
      key: 'Titulo',
     
    },
    {
      title: 'Descripcion',
      dataIndex: 'Descripcion',
      key: 'Descripcion',
    },
    {
        title: 'Fecha',
        dataIndex: 'Fecha',
        key: 'Fecha',
    },
    {
        title: 'Hora Inicio',
        dataIndex: 'Hora Inicio',
        key: 'Hora Inicio',
    },
    {
        title: 'Hora Fin',
        dataIndex: 'Hora Fin',
        key: 'Hora Fin',
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
          <a href="javascript:;">Ver</a>
          <Divider type="vertical" />
          <a href="javascript:;">Eliminar</a>
        </span>
      ),
    },
  ];
const WS_DATOS = 'https://condomiosevilla.000webhostapp.com/WS/obtener_evento.php';
//const WS_DATOS = 'http://localhost:8080/ServerCondominio/WS/obtener_eventos.php';

class EventoIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            eventos : []
        }
    }

    componentDidMount() {
      this.getEventos();
    }

    getEventos() {
      axios.get(WS_DATOS)
      .then((resp) => {
        console.log(resp)
        let result = resp.data;
        if (result.response == 1) {
          let data = result.data;
          let length = data.length;
          let arr = [];
          for (let i = 0; i < length; i++) {
            arr.push({
              key: i,
              Titulo: data[i].titulo,
              Descripcion: data[i].descripcion,
              Fecha: data[i].fecha,
              'Hora Inicio': data[i].hora_ini,
              'Hora Fin': data[i].hora_fin,
              'Propietario': data[i].fkidpropietario
            });
          }
          this.setState({
            eventos: arr
          })
        }
      })
    }
    render(){
      const { eventos } = this.state;
        return(
            <div>
            <Row>
                <Col span={18}>
                    <Title>Lista De Eventos</Title>
                </Col>
                <Col span={6}>
                  {/*<Button type="primary"><Link to ="/evento/create">Registrar Nuevo Evento</Link></Button>*/}
                </Col>
            </Row>
                
                <Table columns={columns} dataSource={eventos} />
            </div>

        )
    }
}
export default EventoIndex;

