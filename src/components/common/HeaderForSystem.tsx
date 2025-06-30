import { Badge, Layout, Row } from "antd";
import Link from "next/link";

const { Header } = Layout;

const HeaderDashboard = () => {
  //   const name = useSelector((state:RootState) => state.auth.userAuth?.userData.name)
  return (
    <Header
      style={{
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Row justify="space-between" align="middle">
        {/* {role !== "customer" && ( */}
        <div className="text-2xl">
          <Link href={"/"}>Paw Care</Link>
        </div>
        <Badge color="#1890ff" text={`Hello ${"Anhsapper"}!`} />
      </Row>
    </Header>
  );
};

export default HeaderDashboard;
