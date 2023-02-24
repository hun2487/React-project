import React from "react";
import { Layout , Typography} from "antd";
import { LaptopOutlined} from '@ant-design/icons'
import "./app.css"
import MenuBar from './components/menubar/MenuBar';
import ScreenMode from "./screenMode/screenMode";

const { Header, Sider} = Layout;
const {Title} = Typography;

function Test(){
    return(
        <div className="test">
            <Layout>
                <Header style={{background: 'blue', padding:10}}>
                <Title style={{color:"white", float:"left"}} level={3}><LaptopOutlined />  과제</Title>
                </Header>   
            <Layout>
                <Sider style={{background:'white'}}>
                    <MenuBar />
                </Sider>
                        <ScreenMode />
                </Layout>
            </Layout>
        </div>
    );
};

export default Test;