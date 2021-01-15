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

//const WS_REGISTRAR = 'http://localhost:8080/ServerCondominio/WS/registrar_propietario.php';
const WS_REGISTRAR = 'https://condomiosevilla.000webhostapp.com/WS/registrar_propietario.php';
class PropietarioCreate extends Component{
    constructor(props){
        super(props)
        this.state = {
            nombre: '',
            apellido: '',
            fecha_nac: '',
            sexo: 'M',
            tipo: 'A',
            redirect: false,
        }

        this.onChangeCi = this.onChangeCi.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeApellido = this.onChangeApellido.bind(this);
        this.onChangeFechaNac = this.onChangeFechaNac.bind(this);
        this.onChangeSexo = this.onChangeSexo.bind(this);
        this.onChangeTipo = this.onChangeTipo.bind(this);
        this.guardar = this.guardar.bind(this);

    }

    onChangeCi(e) {
        this.setState({
            ci: e.target.value
        })
    }

    onChangeNombre(e) {
        this.setState({
            nombre: e.target.value
        })
    }

    onChangeApellido(e) {
        this.setState({
            apellido: e.target.value
        })
    }

    onChangeFechaNac(e) {
        this.setState({
            fecha_nac: e.target.value
        })
    }

    onChangeSexo(e) {
        this.setState({
            sexo: e
        })
    }

    onChangeTipo(value) {
        this.setState({
            tipo: value
        })
    }

    guardar() {
        //e.preventDefault();
        let body = {
            ci: this.state.ci,
            nombre: this.state.nombre,
            apellido: this.state.apellido,            
            fecha_nac : this.state.fecha_nac,
            sexo : this.state.sexo,
            tipo : this.state.tipo,
        };
        console.log('BODY ', JSON.stringify(body));
        axios.post(WS_REGISTRAR, JSON.stringify(body))
        .then((resp) => {
            let result = resp.data;
            console.log(result);
            if (result.response == 1) {
                this.setState({
                    redirect: true
                })
            }
        })
        .catch((error) => {
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
                <Redirect to="/propietario"/>
            );
        }
        return(
            <div>
                <h1>REGISTRAR PROPIETARIO </h1>
                <div style={{padding:40}}>
                {/*<Form 
                    layout="inline"
                onSubmit={this.guardar}>*/}
                    <Row justify='center'>
                        <Col span={8}>
                         <Form.Item label="Ci" colon={false} >
                                <Input 
                                    style={{ width: 250 }}
                                    placeholder="Ci"
                                    value={this.state.ci}
                                    onChange={this.onChangeCi}
                                />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                         <Form.Item label="Nombre" colon={false} >
                                <Input 
                                    style={{ width: 250 }}
                                    placeholder="Nombre"
                                    value={this.state.nombre}
                                    onChange={this.onChangeNombre}
                                />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Apellido" colon={false}>
                                <Input
                                    style={{ width: 250 }}
                                    type="text"
                                    placeholder="Apellido"
                                    value={this.state.apellido}
                                    onChange={this.onChangeApellido}
                                />
                            </Form.Item>
                        </Col>                        
                    </Row>
                    <Row>
                        <Col span={8}>
                             <Form.Item label="Fecha Nacimiento" colon={false} >
                                <Input 
                                    style={{ width: 250 }}
                                    type="date"
                                    placeholder="Fecha Nacimiento"
                                    value={this.state.fecha_nac}
                                    onChange={this.onChangeFechaNac}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                             <Form.Item label="sexo" colon={false}>
                                <Select 
                                    value={this.state.sexo}
                                    defaultValue="M" 
                                    style={{ width: 250 }}
                                    onChange={this.onChangeSexo}>

                                    <Option value="M">Masculino</Option>
                                    <Option value="F">Femenino</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Tipo" colon={false} >
                                <Select 
                                    value={this.state.tipo}
                                    defaultValue="A" 
                                    style={{ width: 250 }}
                                    onChange={this.onChangeTipo}>

                                    <Option value="A">A</Option>
                                    <Option value="B">B</Option>
                                    <Option value="C">C</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{marginTop:100}}>
                        <Row type="flex" justify="center">
                            <Col span={4}></Col>
                            <Col span={4}>
                                <Button type="danger" 
                                    onClick={this.salir.bind(this)}>
                                    Cancelar
                                </Button></Col>
                            <Col span={4}>
                                <Button 
                                    onClick={this.guardar}
                                    type="primary" htmlType="submit">
                                    Registrar
                                </Button>
                            </Col>
                            <Col span={4}></Col>
                        </Row>
                    </div>
                {/*</Form>*/}
                </div>
            </div>
        )
    }
}
export default PropietarioCreate;