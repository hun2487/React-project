import { BrowserRouter, Route, Routes } from "react-router-dom";
import Canvas from "../screenMode/Canvas";
import Drawing2 from "../screenMode/Drawing/Drawing2";
import {Layout} from "antd";
import MenuBar from "../components/menubar/MenuBar";
import { LaptopOutlined} from '@ant-design/icons'

const { Header, Sider} = Layout;

function Router(){
    return(
    <BrowserRouter>
        <div className="test">
            <Header style={{background: 'grey', padding:5}}>
                <h2 style={{textAlign:'left', color:'white'}}><LaptopOutlined /> 과제</h2>
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