import React, { Component } from 'react';
import axios from 'axios';
import { Table, Divider , Button, Col, Row, Typography, Skeleton,Avatar,List, Icon} from 'antd';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'; 
const { Title, Paragraph, Text } = Typography;
const count = 3;
  const columns = [
    {
      title: 'Titulo',
      dataIndex: 'Titulo',
      key: 'Titulo',
     
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
          <a href="javascript:;">Ver</a>
          <Divider type="vertical" />
          <a href="javascript:;">Eliminar</a>
        </span>
      ),
    },
  ];


const WS_COMUNICADOS = 'https://condomiosevilla.000webhostapp.com/WS/obtener_comunicado_detalle.php';

class ComunicadoDetalle extends Component {
    constructor(props){
        super(props);
        this.state = {
            detalle : [],
            initLoading: true,
            loading: false,
            data: [],
            list: [],
        }
    }

    componentDidMount() {
      this.getComunicadosDetalle();
    }

    getComunicadosDetalle() {
        let body = {
            idcomunicado: this.props.match.params.id,
        };
      axios.post(WS_COMUNICADOS,JSON.stringify(body))
      .then((resp) => {
        let result = resp.data;
        if (result.response == 1) {
          let data = result.data;
          let length = data.length;
          let arr = [];
          this.setState({
            initLoading: false,
            data: result.data,
            list: result.data,
          })
          /*for (let i = 0; i < length; i++) {
            arr.push({
              key: 4,
              Titulo: data[i].titulo,
              Fecha: data[i].fecha,
              Tipo: data[i].tipo,
              Importancia : data[i].importancia
            });
          }
          this.setState({
            comunicados: arr
          })*/
        }
      })
    }
    getComunicadosDetalle2() {
        
        let body = {
            idcomunicado: this.props.match.params.id,
        };
        axios.post(WS_COMUNICADOS,JSON.stringify(body))
        .then((resp) => {
          let result = resp.data;
          if (result.response == 1) {
            let arr = [];
            const data = this.state.data.concat( result.data);
            this.setState(
                {
                data,
                list: data,
                loading: false,
                },
                () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
                },
            );
          }
        })
      }
    onLoadMore = () => {
        this.setState({
          loading: true,
          list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
        });
        this.getComunicadosDetalle2()
      };
    render(){
        const { initLoading, loading, list } = this.state;
        const loadMore =
          !initLoading && !loading ? (
            <div
              style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
              }}
            >
              <Button>Cargar Mas</Button>
            </div>
          ) : null;
    
        return (
          <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                <List.Item
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                        avatar={
                        <Avatar  icon="user" style={{ backgroundColor: '#87d068' }} />
                        }
                        title={<a href="https://ant.design">{item.nombre + " "+ item.apellido}</a>}
                        description={"Cedula : " + item.ci}
                    />
                    <div ><Text style={{fontWeight : 'bold', fontSize : 20}}>{item.estado == 'L' ? 'Leido' : 'No Leido'}</Text></div>
                    </Skeleton>
                </List.Item>
                )}
            />
            );
    }
}
export default ComunicadoDetalle;

