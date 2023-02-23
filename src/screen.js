import React from "react";
import { Layout } from "antd";


const { Header, Footer, Sider, Content} = Layout;


function Test(){
    return(
        <div className="test">
            <Layout>
                <Header>Header</Header>   
            <Layout>
            <Sider style={{background:'tomato'}}>Sider</Sider>
                    <Layout>
                        <Content>Content</Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};

export default Test;