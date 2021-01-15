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
        title: 'Tipo',
        dataIndex: 'Tipo',
        key: 'Tipo',
    },
    {
        title: 'Importancia',
        dataIndex: 'Importancia',
        key: 'Importancia',
    },
    {
      title: 'Accion',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to = {"/detalle/" + record.id} >Ver Detalle</Link>
          <Divider type="vertical" />
          <a href="javascript:;">Eliminar</a>
        </span>
      ),
    },
  ];
  const data = [
    {
        key: '1',
        Titulo: 'Mike',
        Fecha: 32,
        Tipo: '10 Downing Street',
        Importancia : 'alta'
      },
      {
          key: '2',
          Titulo: 'Mike',
          Fecha: 32,
          Tipo: '10 Downing Street',
          Importancia : 'alta'
        },
        {
          key: '3',
          Titulo: 'Mike',
          Fecha: 32,
          Tipo: '10 Downing Street',
          Importancia : 'alta'
        },
        {
          key: '4',
          Titulo: 'Mike',
          Fecha: 32,
          Tipo: '10 Downing Street',
          Importancia : 'alta'
        },
  ];

const WS_COMUNICADOS = 'https://condomiosevilla.000webhostapp.com/WS/obtener_comunicados.php';

class ComunicadoView extends Component {
    constructor(props){
        super(props);
        this.state = {
            comunicados : []
        }
    }

    componentDidMount() {
      this.getComunicados();
    }

    getComunicados() {
      axios.get(WS_COMUNICADOS)
      .then((resp) => {
        let result = resp.data;
        if (result.response == 1) {
          let data = result.data;
          let length = data.length;
          let arr = [];
          for (let i = 0; i < length; i++) {
            arr.push({
              key: i,
              id : data[i].idcomunicado,
              Titulo: data[i].titulo,
              Descripcion: data[i].descripcion,
              Fecha: data[i].fecha,
              Tipo: data[i].tipo,
              Importancia : data[i].importancia
            });
          }
          this.setState({
            comunicados: arr
          })
        }
      })
    }
    render(){
      const { comunicados } = this.state;
        return(
            <div>
            <Row>
                <Col span={18}>
                    <Title>Lista De Comunicados</Title>
                </Col>
                <Col span={6}>
                  <Button type="primary"><Link to ="/ComunicadoCreate">Registrar Nuevo Comunicado</Link></Button>
                </Col>
            </Row>
                
                <Table columns={columns} dataSource={comunicados} />
            </div>

        )
    }
}
export default ComunicadoView;

