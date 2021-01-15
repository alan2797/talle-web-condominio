import React, { Component } from 'react';
import axios from 'axios';
import { Table, Divider, Tag,
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete
} from 'antd';
import {Redirect} from 'react-router-dom'; 

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const WS_EDITAR = 'http://localhost:8080/ServerCondominio/WS/editar_vivienda.php';
const WS_GET_VIVIENDA = 'http://localhost:8080/ServerCondominio/WS/obtener_vivienda.php';
const WS_PROPIETARIOS = 'http://localhost:8080/ServerCondominio/WS/obtener_propietarios.php';

class ViviendaCreate extends Component{
    constructor(props){
        super(props)
        this.state = {
            nro_vivienda: '',
            calle: '',
            idpropietario: '',
            propietarios: []
        }

        this.onChangeNroVivienda = this.onChangeNroVivienda.bind(this);
        this.onChangeCalle = this.onChangeCalle.bind(this);
        this.onChangePropietario = this.onChangePropietario.bind(this);
        this.guardar = this.guardar.bind(this);

    }

    componentDidMount(){
        this.getPropietarios();
        this.getVivienda();
    }

    getVivienda() {
        axios.get(WS_GET_VIVIENDA + '?id=' + this.props.match.params.id)
        .then((resp) => {
          let result = resp.data;
          if (result.response == 1) {
            let vivienda = result.data;
            this.setState({
              nro_vivienda: vivienda.nro_vivienda,
              calle: vivienda.calle,
              idpropietario: vivienda.fkidpropietario
            })
          }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    getPropietarios() {
        axios.get(WS_PROPIETARIOS)
        .then((resp) => {
          let result = resp.data;
          if (result.response == 1 && result.data.length > 0) {
            this.setState({
              propietarios: result.data,
              idpropietario: result.data[0].idpropietario
            })
          }
        })
    }

    onChangeNroVivienda(e) {
        this.setState({
            nro_vivienda: e.target.value
        })
    }

    onChangeCalle(e) {
        this.setState({
            calle: e.target.value
        })
    }

    onChangePropietario(e) {
        this.setState({
            idpropietario: e
        })
    }

    guardar(e) {
        e.preventDefault();
        let body = {
            nro_vivienda: this.state.nro_vivienda,
            calle: this.state.calle,            
            //fkidpropietario : this.state.idpropietario,
        };
        //console.log('BODY ', JSON.stringify(body));
        axios.post(WS_EDITAR, body)
        .then((resp) => {
            let result = resp.data;
            console.log('RESP SERVER ', result);
            if (result.response == 1) {
                this.setState({
                    redirect: true
                })
            }
        })
        .catch((error) => {
            console.log('RESP SERVER ', error.response.data);
            console.log(error);
        })
    }

    render(){
        if (this.state.redirect) {
            return (
                <Redirect to="/vivienda"/>
            );
        }
        return(
            <div>
                <h1>Registrar Vivienda </h1>
                <div style={{padding:40}}>
                <Form 
                    layout="inline"
                    onSubmit={this.guardar}>
                    <Row justify='center'>
                        <Col span={8}>
                         <Form.Item label="Nro Vivienda" colon={false} >
                                <Input 
                                    style={{ width: 150 }}
                                    placeholder="Nro Vivienda"
                                    value={this.state.nro_vivienda}
                                    onChange={this.onChangeNroVivienda}
                                />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                         <Form.Item label="Calle" colon={false} >
                                <Input 
                                    style={{ width: 150 }}
                                    placeholder="Calle"
                                    value={this.state.calle}
                                    onChange={this.onChangeCalle}
                                />
                          </Form.Item>
                        </Col>                      
                    </Row>
                    <Row>
                        <Col span={8}>
                             <Form.Item label="Propietario" colon={false}>
                                <Select 
                                    value={this.state.idpropietario}
                                    defaultValue="M" 
                                    style={{ width: 150 }}
                                    onChange={this.onChangePropietario}>
                                {
                                    this.state.propietarios.map((item, key) => (
                                        <Option key={key} value={item.idpropietario}>{item.nombre + ' ' + item.apellido}</Option>
                                    ))
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{marginTop:200}}>
                        <Row type="flex" justify="center">
                            <Col span={4}></Col>
                            <Col span={4}>
                                <Button type="primary" htmlType="submit">
                                    Cancelar
                                </Button></Col>
                            <Col span={4}>
                                <Button type="primary" htmlType="submit">
                                    Registrar
                                </Button>
                            </Col>
                            <Col span={4}></Col>
                        </Row>
                    </div>
                </Form>
                </div>
            </div>
        )
    }
}
export default ViviendaCreate;