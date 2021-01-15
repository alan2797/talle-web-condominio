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

const WS_REGISTRAR = 'https://condomiosevilla.000webhostapp.com/WS/registrar_area_social.php';

class ViviendaCreate extends Component{
    constructor(props){
        super(props)
        this.state = {
            nombre: '',
            descripcion: ''
        }

        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
        this.guardar = this.guardar.bind(this);

    }

    onChangeNombre(e) {
        this.setState({
            nombre: e.target.value
        })
    }

    onChangeDescripcion(e) {
        this.setState({
            descripcion: e.target.value
        })
    }

    guardar(e) {
        e.preventDefault();
        let body = {
            nombre: this.state.nombre,
            descripcion: this.state.descripcion,            
        };
        //console.log('BODY ', JSON.stringify(body));
        axios.post(WS_REGISTRAR, JSON.stringify(body))
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
    salir(){
        this.setState({
            redirect : true
        })
    }
    render(){
        if (this.state.redirect) {
            return (
                <Redirect to="/areasocial"/>
            );
        }
        return(
            <div>
                <h1>Registrar Area Social </h1>
                <div style={{padding:40}}>
                <Form 
                    layout="inline"
                    onSubmit={this.guardar}>
                    <Row justify='center'>
                        <Col span={12}>
                         <Form.Item label="Nombre" colon={false} >
                                <Input 
                                    style={{ width: 300 }}
                                    placeholder="Nombre"
                                    value={this.state.nombre}
                                    onChange={this.onChangeNombre}
                                />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                         <Form.Item label="Descripcion" colon={false} >
                                <Input 
                                    style={{ width: 300 }}
                                    placeholder="Descripcion"
                                    value={this.state.descripcion}
                                    onChange={this.onChangeDescripcion}
                                />
                          </Form.Item>
                        </Col>                      
                    </Row>
                    <div style={{marginTop:150}}>
                        <Row type="flex" justify="center">
                            <Col span={4}></Col>
                            <Col span={4}>
                                <Button type="danger" onClick={this.salir.bind(this)}>
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