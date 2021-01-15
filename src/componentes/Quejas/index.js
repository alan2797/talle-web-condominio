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
      dataIndex: 'titulo',
      key: 'titulo',
     
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha',
    },
    {
        title: 'Propietario',
        dataIndex: 'propietario',
        key: 'propietario',
    },
    {
        title: 'Importancia',
        dataIndex: 'importancia',
        key: 'importancia',
    },
  ];
const WS_DATOS = 'https://condomiosevilla.000webhostapp.com/WS/obtener_quejas.php';
//const WS_DATOS = 'http://localhost:8080/ServerCondominio/WS/obtener_eventos.php';

class QuejasIndex extends Component {
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
              titulo : data[i].titulo,
              descripcion: data[i].descripcion,
              fecha: data[i].fecha,
              propietario : data[i].nombre,
              importancia: data[i].importancia
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
                    <Title>Lista De Quejas de Propietarios</Title>
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
export default QuejasIndex;

