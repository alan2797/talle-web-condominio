import React, { Component } from 'react';
import axios from 'axios';
import { Table, Divider, Tag , Button, Col, Row, Typography} from 'antd';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'; 
const { Title, Paragraph, Text } = Typography;

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
     
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
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
const WS_DATOS = 'https://condomiosevilla.000webhostapp.com/WS/obtener_areas_sociales.php';

class AreaSocialIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            areas_sociales : []
        }
    }

    componentDidMount() {
      this.getAreasSociales();
    }

    getAreasSociales() {
      axios.get(WS_DATOS)
      .then((resp) => {
        let result = resp.data;
        console.log('RESULT ==> 123123');
        console.log('RESULT ==> ', result);
        if (result.response == 1) {
          let data = result.data;
          let length = data.length;
          let arr = [];
          for (let i = 0; i < length; i++) {
            arr.push({
              key: i,
              nombre: data[i].nombre,
              descripcion: data[i].descripcion,
            });
          }
          this.setState({
            areas_sociales: arr
          })
        }
      }).catch((error) => {
        console.log("error")
        console.log(error)
      })
    }
    render(){
      const { areas_sociales } = this.state;
        return(
            <div>
            <Row>
                <Col span={18}>
                    <Title>Lista De Areas Sociales</Title>
                </Col>
                <Col span={6}>
                  <Button type="primary"><Link to ="/areasocial/create">Registrar Nueva Area Social</Link></Button>
                </Col>
            </Row>
                
                <Table columns={columns} dataSource={areas_sociales} />
            </div>

        )
    }
}
export default AreaSocialIndex;

