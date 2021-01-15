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

//const WS_GET_PROPIETARIO = 'http://localhost:8080/ServerCondominio/WS/obtener_propietario.php';
const WS_GET_PROPIETARIO = 'https://condomiosevilla.000webhostapp.com/WS/obtener_propietario.php';
//const WS_EDITAR = 'http://localhost:8080/ServerCondominio/WS/editar_propietario.php';
const WS_EDITAR = 'https://condomiosevilla.000webhostapp.com/WS/editar_propietario.php';
class PropietarioEdit extends Component{
    constructor(props){
        super(props);
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
        this.editar = this.editar.bind(this);

    }

    componentDidMount() {
        //console.log('PARAMETROS ', this.props.match.params.id);
        this.getPropietario();
    }

    getPropietario() {
        axios.get(WS_GET_PROPIETARIO + '?id=' + this.props.match.params.id)
        .then((resp) => {   
            let result = resp.data;
            if (result.response == 1) {
                let propietario = result.data
                this.setState({
                    ci: propietario.ci,
                    nombre: propietario.nombre,
                    apellido: propietario.apellido,
                    fecha_nac: propietario.fecha_nac,
                    sexo: propietario.sexo,
                    tipo: propietario.tipo
                })
            } else {

            }
        })
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

    editar(e) {
        e.preventDefault();
        let body = {
            ci: this.state.ci,
            nombre: this.state.nombre,
            apellido: this.state.apellido,            
            fecha_nac : this.state.fecha_nac,
            sexo : this.state.sexo,
            tipo : this.state.tipo,
            id: this.props.match.params.id
        };
        console.log('BODY ', JSON.stringify(body));
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
            console.log(error);
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
                <Form 
                    layout="inline"
                    onSubmit={this.editar}>
                    <Row justify='center'>
                        <Col span={8}>
                         <Form.Item label="Ci" colon={false} >
                                <Input 
                                    style={{ width: 150 }}
                                    placeholder="Ci"
                                    value={this.state.ci}
                                    onChange={this.onChangeCi}
                                />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                         <Form.Item label="Nombre" colon={false} >
                                <Input 
                                    style={{ width: 150 }}
                                    placeholder="Nombre"
                                    value={this.state.nombre}
                                    onChange={this.onChangeNombre}
                                />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Apellido" colon={false}>
                                <Input
                                    style={{ width: 150 }}
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
                                    style={{ width: 150 }}
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
                                    style={{ width: 150 }}
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
                                    style={{ width: 150 }}
                                    onChange={this.onChangeTipo}>

                                    <Option value="A">A</Option>
                                    <Option value="B">B</Option>
                                    <Option value="C">C</Option>
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
export default PropietarioEdit;