import { BrowserRouter, Route, Routes } from "react-router-dom";
import Drawing from "../screenMode/Drawing";
import {Layout} from "antd";
import MenuBar from "../components/menubar/MenuBar";
import { LaptopOutlined} from '@ant-design/icons'
import Table from "../attribute/grid";

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
                <Route path="/drawing" element ={<Drawing />} /> 
                <Route path="/drawinglist" element ={<Table />}/>
            </Routes>
            </Layout>
        </Layout>
        </div>
    </BrowserRouter>
    )
}

export default Router;