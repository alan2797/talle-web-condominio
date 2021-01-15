import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Icon, Avatar,Divider,Row,Col, Typography ,Tooltip,Affix,Dropdown ,
        message } from 'antd';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'; 
import ComunicadoView from './componentes/Comunicado/ComunicadoView';
import ComunicadoCreate from './componentes/Comunicado/ComunicadoCreate';
import ComunicadoDetalle from './componentes/Comunicado/ComunicadoDetalle';

import PropietarioIndex from './componentes/Propietario';
import PropietarioCreate from './componentes/Propietario/create';
import PropietarioEdit from './componentes/Propietario/edit';

import MascotaIndex from './componentes/Mascota/index';
import MascotaCreate from './componentes/Mascota/create';

import ViviendaIndex from './componentes/Vivienda/index';
import ViviendaCreate from './componentes/Vivienda/create';
import ViviendaEdit from './componentes/Vivienda/edit';

import EventoIndex from './componentes/Evento/index';

import QuejasIndex from './componentes/Quejas/index';

import PersonalIndex from './componentes/Personal/index';
import PersonalCreate from './componentes/Personal/create';
import PersonalEdit from './componentes/Personal/edit';

import AreaSocialCreate from './componentes/AreaSocial/create';
import AreaSocialIndex from './componentes/AreaSocial/index';

import CasaIndex from './componentes/Casa/index';
import CasaCreate from './componentes/Casa/create';

import NotaAlquilerIndex from './componentes/NotaAlquiler/index';

const { Header, Sider, Content,Footer } = Layout;
const SubMenu = Menu.SubMenu;
const { Title, Paragraph, Text } = Typography;

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};
const menuLogout = (
  <Menu onClick={onClick}>
    <Menu.Item key="0">
      <Text>Cerrar Sesion</Text>
    </Menu.Item>
  </Menu>
);
class App extends Component {
  state = {
    collapsed: false,
    sizeAvatar : 100,
    top: 10
  };
  componentDidMount(){
    if(this.state.collapsed){
      this.setState({
        sizeAvatar : 60
      })
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      sizeAvatar : this.state.sizeAvatar == 100 ? 60 : 100
    });
  };
  cerrarSesion = () => {
    console.log("cerrar sesion")
  }
  render() {
    return (
      
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed} 
                  style={{background:'#fff',width:400

                  }}>
            <div className="logo" />
            <div style={{height:'155px'}}>
                  <Row type="flex" justify="center" align="middle"> 
                    <Col>
                      <Tooltip placement="right" title={"vladimir"}>
                        <Avatar size={this.state.sizeAvatar} icon="user" style={{margin:15}}/>
                      </Tooltip>
                    </Col>
                  </Row>
                
                  <Row type="flex" justify="center" align="middle" > 
                    <Col >
                      <Text strong>Vladimir Vasquez</Text>
                    </Col>
                  </Row>
                  </div>
                  
                <Divider/>
            <Menu    mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="project" />
                    <span>Informacion</span>
                  </span>
                }
              > 
                
                <Menu.Item key="3"><Link to ="/Comunicado" >Comunicados</Link></Menu.Item>
                <Menu.Item key="4"><Link to ="/quejas" >Quejas de Propietarios</Link></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="solution" />
                    <span>Administracion</span>
                  </span>
                }
              >
                <Menu.Item key="6"><Link to ="/propietario" >Propietarios</Link></Menu.Item>
                <Menu.Item key="10"><Link to ="/vivienda" >Registrar Vivienda</Link></Menu.Item>
                <Menu.Item key="12"><Link to ="/mascota" >Mascotas</Link></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="schedule" />
                    <span>Acontecimiento</span>
                  </span>
                }
              >
                <Menu.Item key="120"><Link to ="/areasocial" >Area Social</Link></Menu.Item>
                <Menu.Item key="100"><Link to ="/evento" >Eventos</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>

          <Layout>
            <Header style={{ background: '#53a9ff',borderBottomLeftRadius:10,paddingLeft:3,paddingRight:4,
                            margin:'0px 15px',borderBottomRightRadius:10}}>
              <Affix offsetTop={this.state.top}>
                <Icon
                
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                  style={{color:'#fff',fontSize:25,background:'#53a9ff',padding:5,borderRadius:5,float:'left'}}
                />
              </Affix>
              <Dropdown overlay={menuLogout} trigger={['click']} placement="bottomCenter">
                <Icon
                  type='logout'
                  style={{color:'#fff',fontSize:30,background:'#53a9ff',float:'right',
                          padding:5,justifyContent:'center',borderRadius:5,marginTop:10,marginRight:15}}

                />
              </Dropdown>
              <Text strong style={{color:'#fff',fontSize:30,float:'right',marginRight:15}}>Condominio Sevilla Los Jardines</Text> 
            </Header>
            <Content
              style={{
                margin: '15px 15px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
                borderTopLeftRadius:10,
                borderTopRightRadius: 10
              }}
            >
              <Route path="/casa" exact component={CasaIndex}/>
              <Route path="/casa/create" exact component={CasaCreate}/>

              <Route path="/alquiler" exact component={NotaAlquilerIndex}/>

              <Route path="/Comunicado" exact component={ComunicadoView}/>
              <Route path="/ComunicadoCreate" exact component={ComunicadoCreate}/>
              <Route path="/detalle/:id" exact component={ComunicadoDetalle}/>
              <Route path="/propietario" exact component={PropietarioIndex}/>
              <Route path="/propietario/create" exact component={PropietarioCreate}/>
              <Route path="/propietario/edit/:id" exact component={PropietarioEdit}/>
              <Route path="/mascota" exact component={MascotaIndex}/>
              <Route path="/mascota/create" exact component={MascotaCreate}/>
              <Route path="/vivienda" exact component={ViviendaIndex}/>
              <Route path="/vivienda/create" exact component={ViviendaCreate}/>
              <Route path="/vivienda/edit/:id" exact component={ViviendaEdit}/>
              <Route path="/evento" exact component={EventoIndex}/>
              <Route path="/quejas" exact component={QuejasIndex}/>
              <Route path="/personal" exact component={PersonalIndex}/>
              <Route path="/personal/create" exact component={PersonalCreate}/>
              <Route path="/personal/edit/:id" exact component={PersonalEdit}/>
              <Route path="/areasocial" exact component={AreaSocialIndex}/>
              <Route path="/areasocial/create" exact component={AreaSocialCreate}/>
            </Content>
            
          </Layout>
        </Layout>
        
      </Router>
    );
  }
}

export default App;
