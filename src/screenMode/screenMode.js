import { Layout, Breadcrumb } from "antd";
import Canvas from "./Canvas";

const { Content} = Layout;

function ScreenMode(){
    return(
<Layout>
<Content style={{padding: "0 50px"}}>
    <Breadcrumb style={{margin: "16px 0"}}>
    </Breadcrumb>
    <div style={{background:"#fff", padding:24, minHeight:500}}>
        <Canvas />
    </div>
</Content>
</Layout>

);
}

export default ScreenMode;
