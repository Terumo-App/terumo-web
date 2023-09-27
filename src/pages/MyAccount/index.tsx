import { Divider } from "antd";
import { Header } from "../../components/Header";
import { contentStyle } from "../../styles/global";
import { Container, PageTittle } from "./styles";
import { FiUser } from "react-icons/fi";

export function MyAccount() {
  return (
    <>
      <Header />

      <Container>
        <PageTittle>
          <FiUser />
          <h3>My Account</h3>
        </PageTittle>

        <div style={contentStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 100,
              marginTop: 100,
            }}
          >
            <div
              style={{
                backgroundColor: "#A33B4E",
                width: 120,
                height: 120,
                borderRadius: 80,
              }}
            ></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <h2>Yuri Alberto</h2>
              <span>yuri.alberto@email.com</span>
              <div>
                <img></img>
                <h4>Upload profile picture</h4>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "beige",
            }}
          >
            <h3>Profile</h3>
            <Divider />
          </div>
        </div>
      </Container>
    </>
  );
}
