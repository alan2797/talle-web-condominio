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

const WS_REGISTRAR = 'https://condomiosevilla.000webhostapp.com/WS/registrar_comunicado.php';
class ComunicadoCreate extends Component{
    constructor(props){
        super(props)
        this.state = {
            comunicado : [],
            titulo : '',
            descripcion : '',
            fecha : '',
            hora : '',
            tipo : 'Sancion',
            importancia : 'Alta',
            redirect: false,
        }

        this.onChangeTitulo = this.onChangeTitulo.bind(this);
        this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
        this.onChangeFecha = this.onChangeFecha.bind(this);
        this.onChangeHora = this.onChangeHora.bind(this);
        this.onChangeTipo = this.onChangeTipo.bind(this);
        this.onChangeImportancia = this.onChangeImportancia.bind(this);
        this.guardarComunicado = this.guardarComunicado.bind(this);

    }

    onChangeTitulo(e) {
        this.setState({
            titulo: e.target.value
        })
    }

    onChangeDescripcion(e) {
        this.setState({
            descripcion: e.target.value
        })
    }

    onChangeFecha(e) {
        console.log(e.target.value);
        this.setState({
            fecha: e.target.value
        })
    }

    onChangeHora(e) {
        console.log(e.target.value);
        this.setState({
            hora: e.target.value
        })
    }

    onChangeTipo(value) {
        this.setState({
            tipo: value
        })
    }

    onChangeImportancia(value) {
        this.setState({
            importancia: value
        })
    }

    guardarComunicado() {
        //e.preventDefault();
        console.log("ENTRO A GUARDAR");
        let body = {
            titulo: this.state.titulo,
            descripcion: this.state.descripcion,            
            fecha : this.state.fecha,
            hora : this.state.hora,
            tipo : this.state.tipo,
            importancia : this.state.importancia,
        };
        console.log('BODY ', JSON.stringify(body));
        axios.post(WS_REGISTRAR, JSON.stringify(body))
        .then((resp) => {
            let result = resp.data;
            console.log('result', result);
            if (result.response == 1) {
                this.setState({
                    redirect: true
                })
            }
        })
        .catch((error) => {
            console.log('Error ', error);
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
                <Redirect to="/comunicado"/>
            )
        }
        return(
            <div>
                <h1>REGISTRAR COMUNICADO</h1>
                <div style={{padding:40}}>
                {/*<Form 
                    layout="inline"
                onSubmit={this.guardarComunicado}>*/}
                    <Row justify='center'>
                        <Col span={8}>
                         <Form.Item label="Titulo" colon={false} >
                                <Input 
                                    style={{ width: 250 }}
                                    placeholder="Titulo"
                                    value={this.state.titulo}
                                    onChange={this.onChangeTitulo}
                                />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Descripcion" colon={false}>
                                <Input
                                    style={{ width: 250 }}
                                    type="text"
                                    placeholder="Descripcion"
                                    value={this.state.descripcion}
                                    onChange={this.onChangeDescripcion}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                             <Form.Item label="Fecha" colon={false} >
                                <Input 
                                    style={{ width: 250 }}
                                    type="date"
                                    placeholder="Fecha"
                                    value={this.state.fecha}
                                    onChange={this.onChangeFecha}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                         <Form.Item label="Hora" colon={false}>
                                <Input
                                    style={{ width: 250 }}
                                    type="time"
                                    placeholder="Hora"
                                    value={this.state.hora}
                                    onChange={this.onChangeHora}
                                />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Tipo" colon={false} >
                                <Select 
                                    value={this.state.tipo}
                                    defaultValue="Informativo" 
                                    style={{ width: 250 }}
                                    onChange={this.onChangeTipo}>

                                    <Option value="Sansion">Sancion</Option>
                                    <Option value="Informativo">Informativo</Option>
                                    <Option value="Pago">
                                        Pago
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                             <Form.Item label="Importancia" colon={false}>
                                <Select 
                                    value={this.state.importancia}
                                    defaultValue="Normal" 
                                    style={{ width: 250 }}
                                    onChange={this.onChangeImportancia}>

                                    <Option value="Alta">Alta</Option>
                                    <Option value="Normal">Normal</Option>
                                    <Option value="Pago"> Pago</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{marginTop:100}}>
                        <Row type="flex" justify="center">
                            <Col span={4}></Col>
                            <Col span={4}>
                                <Button 
                                    onClick={this.salir.bind(this)}
                                    type="danger">
                                    Cancelar
                                </Button></Col>
                            <Col span={4}>
                                <Button 
                                    onClick={this.guardarComunicado}
                                    type="primary" 
                                    htmlType="submit">
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
export default ComunicadoCreate;