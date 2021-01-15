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

//const WS_REGISTRAR = 'http://localhost:8080/ServerCondominio/WS/registrar_mascota.php';
const WS_REGISTRAR = 'https://condomiosevilla.000webhostapp.com/WS/registrar_mascota.php';
//const WS_PROPIETARIOS = 'http://localhost:8080/ServerCondominio/WS/obtener_propietarios.php';
const WS_PROPIETARIOS = 'https://condomiosevilla.000webhostapp.com/WS/obtener_propietarios.php';

class MascotaCreate extends Component{
    constructor(props){
        super(props)
        this.state = {
            nombre: '',
            edad: '',
            raza: '',
            tipoanimal: 'Aves',
            idpropietario: '',
            propietarios: []
        }

        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeEdad = this.onChangeEdad.bind(this);
        this.onChangeRaza = this.onChangeRaza.bind(this);
        this.onChangeTipoAnimal = this.onChangeTipoAnimal.bind(this);
        this.onChangePropietario = this.onChangePropietario.bind(this);
        this.guardar = this.guardar.bind(this);

    }

    componentDidMount(){
        this.getPropietarios();
    }

    getPropietarios() {
        axios.get(WS_PROPIETARIOS)
        .then((resp) => {
          let result = resp.data;
          console.log('RESULT ==> ', result);
          if (result.response == 1 && result.data.length > 0) {
            this.setState({
              propietarios: result.data,
              idpropietario: result.data[0].idpropietario
            })
          }
        })
      }
    onChangeNombre(e) {
        this.setState({
            nombre: e.target.value
        })
    }

    onChangeEdad(e) {
        this.setState({
            edad: e.target.value
        })
    }

    onChangeRaza(e) {
        this.setState({
            raza: e.target.value
        })
    }

    onChangeFechaNac(e) {
        this.setState({
            fecha_nac: e.target.value
        })
    }

    onChangeTipoAnimal(e) {
        this.setState({
            tipoanimal: e
        })
    }

    onChangePropietario(e) {
        this.setState({
            idpropietario: e
        })
    }

    guardar() {
        //e.preventDefault();
        let body = {
            nombre: this.state.nombre,
            edad: this.state.edad,            
            raza : this.state.raza,
            tipoanimal : this.state.tipoanimal,
            fkidpropietario : this.state.idpropietario,
        };
        //console.log('BODY ', );
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
                <Redirect to="/mascota"/>
            );
        }
        return(
            <div>
                <h1>REGISTRAR Mascota </h1>
                <div style={{padding:40}}>
                {/*<Form 
                    layout="inline"
                onSubmit={this.guardar}>*/}
                    <Row justify='center'>
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
                         <Form.Item label="Edad" colon={false} >
                                <Input 
                                    style={{ width: 250 }}
                                    placeholder="Edad"
                                    value={this.state.edad}
                                    onChange={this.onChangeEdad}
                                />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Raza" colon={false}>
                                <Input
                                    style={{ width: 250 }}
                                    type="text"
                                    placeholder="Raza"
                                    value={this.state.raza}
                                    onChange={this.onChangeRaza}
                                />
                            </Form.Item>
                        </Col>                        
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="Tipo Animal" colon={false}>
                                <Select 
                                    value={this.state.tipoanimal}
                                    style={{ width: 250 }}
                                    onChange={this.onChangeTipoAnimal}>

                                    <Option value="Aves">Aves</Option>
                                    <Option value="Canino">Canino</Option>
                                    <Option value="Felino">Felino</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                             <Form.Item label="Propietario" colon={false}>
                                <Select 
                                    value={this.state.idpropietario}
                                    style={{ width: 250 }}
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
                    <div style={{marginTop:100}}>
                        <Row type="flex" justify="center">
                            <Col span={4}></Col>
                            <Col span={4}>
                                <Button type="danger" onClick={this.salir.bind(this)}>
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
export default MascotaCreate;