import React, { Component } from 'react';
import axios from 'axios';
import { Table, Divider, Tag , Button, Col, Row, Typography} from 'antd';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'; 
const { Title, Paragraph, Text } = Typography;

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
        title: 'Ci',
        dataIndex: 'ci',
        key: 'ci',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
        title: 'Apellido',
        dataIndex: 'apellido',
        key: 'apellido',
    },
    {
        title: 'Fecha Nac',
        dataIndex: 'fecha_nac',
        key: 'fecha_nac',
    },
    {
        title: 'Sexo',
        dataIndex: 'sexo',
        key: 'sexo',
    },
    {
        title: 'Tipo',
        dataIndex: 'tipo',
        key: 'tipo',
    },
    {
      title: 'Accion',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to ={"personal/edit/" + record.id}>Editar</Link>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      ),
    },
  ];


//const WS_DATOS = 'https://condomiosevilla.000webhostapp.com/WS/obtener_personales.php';
const WS_DATOS = 'http://localhost:8080/ServerCondominio/WS/obtener_personales.php';

class PersonalIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            personales : []
        }
    }

    componentDidMount() {
      this.getPersonales();
    }

    getPersonales() {
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
              id: data[i].idadministrador,
              ci: data[i].ci,
              nombre: data[i].nombre,
              apellido: data[i].apellido,
              fecha_nac : data[i].fecha_nac,
              sexo: data[i].sexo == 'M' ? 'Masculino' : 'Femenino',
              tipo: data[i].tipo
            });
          }
          this.setState({
            personales: arr
          })
        }
      })
    }
    render(){
      const { personales } = this.state;
        return(
            <div>
            <Row>
                <Col span={18}>
                    <Title>Lista De Personales</Title>
                </Col>
                <Col span={6}>
                  <Button type="primary"><Link to ="/personal/create">Registrar Nuevo Personal</Link></Button>
                </Col>
            </Row>
                
                <Table columns={columns} dataSource={personales} />
            </div>

        )
    }
}
export default PersonalIndex;

