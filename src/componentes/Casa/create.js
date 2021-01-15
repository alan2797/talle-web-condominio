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
    AutoComplete,
    Upload, message
} from 'antd';
import {Redirect} from 'react-router-dom'; 

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class CasaCreate extends Component{
    constructor(props){
        super(props)
        this.state = {
            descripcion: '',
            area: 0,
            nro_hab: '',
            idcliente: 1,
            clientes: [],
            files: [],
            filesUp: [],
            filesExt: [],
            filesName: [],
            uploading: false,
        }

        this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
        this.onChangeArea = this.onChangeArea.bind(this);
        this.onChangeCliente = this.onChangeCliente.bind(this);
        this.onChangeNroHab = this.onChangeNroHab.bind(this);
        this.onRemoveFile = this.onRemoveFile.bind(this);
        this.beforeUploadFile = this.beforeUploadFile.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.guardar = this.guardar.bind(this);

    }

    componentDidMount(){
        this.getDatosCreate();
    }

    getDatosCreate() {
        axios.get('http://127.0.0.1:8000/api/casa/create')
        .then((resp) => {
            console.log('RESP ', resp);
            let result = resp.data;
            if (result.ok) {
                this.setState({
                    clientes: result.clientes
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    createImage(file) {

        let reader = new FileReader();

        reader.onload = (e) => {
            console.log('RESUTL == ', e.target.result);
            this.setState({
                filesUp: [
                    ...this.state.filesUp,
                    e.target.result
                ]
            });
        };
        reader.readAsDataURL(file);
    }

    handleUploadFile(file) {
        console.log('HANDLE FILE ', file);
    }

    onRemoveFile(file) {
        console.log('FILE REMOV ', file);
        let index = this.state.files.indexOf(file);
        if (index >= 0) {
            this.state.files.splice(index, 1);
            this.state.filesExt.splice(index, 1);
            this.state.filesUp.splice(index, 1);
            this.state.filesName.splice(index, 1);
        }
    }

    beforeUploadFile(file) {
        console.log('FILE UP ', file);
        this.createImage(file);
        let ext = this.getExtension(file.type);
        if (ext != 'N') {
            let name = file.name.split('.');
            console.log('NAME ===> ', name[0])
            this.setState({
                files: [
                    ...this.state.files,
                    file
                ],
                filesExt: [
                    ...this.state.filesExt,
                    ext
                ],
                filesName: [
                    ...this.state.filesName,
                    name[0]
                ]
            });
        } else {
            message.error('Archivo no permitido, solo se permiten documentos docx o pdf, imagenes png o jpg');
        }
        return false;
    }

    getExtension(type) {
        switch (type) {
            case 'application/pdf' :
                return 'pdf';
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                return 'docx';
            case 'image/jpeg' :
                return 'jpg';
            case 'image/jpg' :
                return 'jpg';
            case 'image/png' :
                return 'png';
            default :
                return 'N';
        }
    }

    onChangeDescripcion(e) {
        this.setState({
            descripcion: e.target.value
        })
    }

    onChangeNroHab(e) {
        if (!isNaN(e.target.value)) {
            this.setState({
                nro_hab: e.target.value
            })
        }
    }

    onChangeArea(e) {
        if (!isNaN(e.target.value)) {
            this.setState({
                area: e.target.value
            })
        }
    }

    onChangeCliente(e) {
        this.setState({
            idcliente: e
        })
    }

    guardar(e) {
        e.preventDefault();
        let body = {
            descripcion: this.state.descripcion,
            area: this.state.area,
            nro_hab: this.state.nro_hab,
            idcliente: this.state.idcliente,
            files: JSON.stringify(this.state.filesUp),
            filesName: JSON.stringify(this.state.filesName),
            filesExt: JSON.stringify(this.state.filesExt)
        };
        //console.log('BODY ', JSON.stringify(body));
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/casa',
            data: body,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }

        })
        //axios.post('http://127.0.0.1:8000/api/casa', body)
        .then((resp) => {
            let result = resp.data;
            if (result.ok) {
                message.success('Se registro correctamente');
                this.setState({
                    redirect: true
                })
            }
        })
        .catch((error) => {
            console.log('RESP SERVER ', error);
            //console.log(error);
        })
    }

    render(){
        if (this.state.redirect) {
            return (
                <Redirect to="/casa"/>
            );
        }
        return(
            <div>
                <h1>Registrar Casa </h1>
                <div style={{padding:40}}>
                {/*<Form 
                    layout="inline"
                onSubmit={this.guardar}>*/}
                    <Row justify='center'>
                        <Col span={8}>
                            <Form.Item label="Descripcion" colon={false} >
                                    <Input 
                                        style={{ width: 150 }}
                                        placeholder="Descripcion"
                                        value={this.state.descripcion}
                                        onChange={this.onChangeDescripcion}
                                    />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                         <Form.Item label="Area" colon={false} >
                                <Input 
                                    style={{ width: 150 }}
                                    placeholder="Area"
                                    value={this.state.area}
                                    onChange={this.onChangeArea}
                                />
                          </Form.Item>
                        </Col>   
                        <Col span={8}>
                         <Form.Item label="Nro Habitaciones" colon={false} >
                                <Input 
                                    style={{ width: 150 }}
                                    placeholder="Habitaciones"
                                    value={this.state.nro_hab}
                                    onChange={this.onChangeNroHab}
                                />
                          </Form.Item>
                        </Col>                         
                    </Row>
                    <Row>
                        <Col span={8}>
                             <Form.Item label="Cliente" colon={false}>
                                <Select 
                                    value={this.state.idcliente}
                                    style={{ width: 150 }}
                                    onChange={this.onChangeCliente}>
                                {
                                    this.state.clientes.map((item, key) => (
                                        <Option key={key} value={item.id}>{item.nombre + ' ' + item.apellido}</Option>
                                    ))
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Upload 
                                onRemove={this.onRemoveFile}
                                beforeUpload={this.beforeUploadFile}
                                fileList={this.state.files}
                                //disabled={true}
                                multiple={true}
                            >

                                <Button>
                                    <Icon type="upload" /> Seleccione un Archivo
                                </Button>
                            </Upload>
                            {/*}
                            <Button
                                type="primary"
                                onClick={this.handleUploadFile}
                                disabled={this.state.files.length === 0}
                                loading={this.state.uploading}
                                style={{ marginTop: 16 }}
                            >
                            {this.state.uploading ? 'Uploading' : 'Start Upload'}
                            </Button>
                            */}
                        </Col>
                    </Row>
                    <div style={{marginTop: 200}}>
                        <Row type="flex" justify="center">
                            <Col span={4}></Col>
                            <Col span={4}>
                                <Button type="primary" htmlType="submit">
                                    Cancelar
                                </Button>
                            </Col>
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
export default CasaCreate;