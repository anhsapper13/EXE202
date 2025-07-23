import { RootState } from "@/store/store";
import { Badge, Layout, Row } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";

const { Header } = Layout;

const HeaderDashboard = () => {
  //   const name = useSelector((state:RootState) => state.auth.userAuth?.userData.name)
  const currentUser = useSelector((state: RootState) => state.user.currentUser );
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
        <Badge color="#1890ff" text={`Hello ${currentUser?.firstName} ${currentUser?.lastName}!`} />
      </Row>
    </Header>
  );
};

export default HeaderDashboard;
