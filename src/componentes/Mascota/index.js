import React, { Component } from 'react';
import axios from 'axios';
import { Table, Divider, Tag , Button, Col, Row, Typography} from 'antd';
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
      title: 'Nombre',
      dataIndex: 'Nombre',
      key: 'Nombre',
     
    },
    {
      title: 'Edad',
      dataIndex: 'Edad',
      key: 'Edad',
    },
    {
        title: 'Raza',
        dataIndex: 'Raza',
        key: 'Raza',
    },
    {
        title: 'Tipo Animal',
        dataIndex: 'Tipo Animal',
        key: 'Tipo Animal',
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


//const WS_PROPIETARIOS = 'https://condomiosevilla.000webhostapp.com/WS/obtener_propietarios.php';
//const WS_MASCOTAS = 'http://localhost:8080/ServerCondominio/WS/obtener_mascotas.php';
const WS_MASCOTAS = 'https://condomiosevilla.000webhostapp.com/WS/obtener_mascotas.php';

class MascotaIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            mascotas : []
        }
    }

    componentDidMount() {
      this.getMascotas();
    }

    getMascotas() {
      axios.get(WS_MASCOTAS)
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
              Nombre: data[i].nombre,
              Edad: data[i].edad,
              Raza: data[i].raza,
              'Tipo Animal' : data[i].tipoanimal,
              Propietario: data[i].fkidpropietario
            });
          }
          this.setState({
            mascotas: arr
          })
        }
      })
    }
    render(){
      const { mascotas } = this.state;
        return(
            <div>
            <Row>
                <Col span={18}>
                    <Title>Lista De Mascotas</Title>
                </Col>
                <Col span={6}>
                  <Button type="primary"><Link to ="/mascota/create">Registrar Nueva Mascota</Link></Button>
                </Col>
            </Row>
                
                <Table columns={columns} dataSource={mascotas} />
            </div>

        )
    }
}
export default MascotaIndex;

