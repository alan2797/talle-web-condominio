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
      render: (text, record) => {
        return (
          <span>
            <Link to ={"propietario/edit/" + record.id}>Editar</Link>
            <a href="javascript:;">Delete</a>
          </span>
        )
      },
    },
  ];

const WS_PROPIETARIOS = 'https://condomiosevilla.000webhostapp.com/WS/obtener_propietarios.php';
//const WS_PROPIETARIOS = 'http://localhost:8080/ServerCondominio/WS/obtener_propietarios.php';

class PropietarioIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            propietarios : []
        }
    }

    componentDidMount() {
      this.getPropietarios();
    }

    edit(e) {
      console.log(e);
    }

    getPropietarios() {
      axios.get(WS_PROPIETARIOS)
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
              id: data[i].idpropietario,
              ci: data[i].ci,
              nombre: data[i].nombre,
              apellido: data[i].apellido,
              fecha_nac : data[i].fecha_nac,
              sexo: data[i].sexo == 'M' ? 'Masculino' : 'Femenino',
              accion: this.edit.bind(this)
            });
          }
          this.setState({
            propietarios: arr
          })
        }
      })
    }
    render(){
      const { propietarios } = this.state;
        return(
            <div>
            <Row>
                <Col span={18}>
                    <Title>Lista De Propietarios</Title>
                </Col>
                <Col span={6}>
                  <Button type="primary"><Link to ="/propietario/create">Registrar Nuevo Propietario</Link></Button>
                </Col>
            </Row>
                
                <Table 
                  columns={columns} dataSource={propietarios} 
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: event => { console.log('evento ===> ', event.target)}, // click row
                      onDoubleClick: event => {}, // double click row
                      onContextMenu: event => {}, // right button click row
                      onMouseEnter: event => {}, // mouse enter row
                      onMouseLeave: event => {}, // mouse leave row
                    };
                  }}
                  />
            </div>

        )
    }
}
export default PropietarioIndex;

