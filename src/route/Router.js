import { BrowserRouter, Route, Routes } from "react-router-dom";
import Canvas from "../screenMode/Canvas";
import Drawing2 from "../screenMode/Drawing/Drawing2";
import {Layout, Typography} from "antd";
import MenuBar from "../components/menubar/MenuBar";
import { LaptopOutlined} from '@ant-design/icons'

const { Header, Sider} = Layout;
const {Title} = Typography;

function Router(){
    return(
    <BrowserRouter>
        <div className="test">
            <Header style={{background: 'blue', padding:35}}>
            <Title style={{color:"white", float:"left"}} level={3}><LaptopOutlined />  과제</Title>
            </Header>
        <Layout>
            <Layout>
        <Sider style={{background:'white'}}>
            <MenuBar />
        </Sider>
            <Routes>
                <Route path="/drawing" element={<Canvas />}/>
                <Route path="/drawinglist" element ={<Drawing2 />}/>
            </Routes>
            </Layout>
        </Layout>
        </div>
    </BrowserRouter>
    )
}

export default Router;