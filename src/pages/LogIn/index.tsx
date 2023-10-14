import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Divider, Form, Input } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { ButtonSecondary } from "../../styles/global";
import styles from "./Styles.module.scss";
import { ButtonPrimary, Container, Content } from "./styles";
import logoImg from "../../assets/logoPS.svg";
import useAuth from "../../hooks/useAuth";



export function LogIn() {
  const navigate = useNavigate();

  const {  signin } = useAuth()

  const onFinish = async (values: any) => {
    // console.log("Received values of form: ", values);

    try {
      await signin(values.username, values.password);
       navigate("/new-query", {
        preventScrollReset: false,
      });
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed')

    }


  };

  function handleLogIn(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    navigate("/", {
      preventScrollReset: false,
    });
  }

  function handleRegister(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    navigate("/register", {
      preventScrollReset: false,
    });
  }

  return (
    <Container>
      <div
        style={{
          width: "100%",
          backgroundColor: "#702331",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 200,
        }}
      >
        <div
          style={{
            width: 400,
          }}
        >
          <h2
            style={{
              fontSize: 36,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            Enhance Renal Pathology Research with PathoSpotter Semantic Search.
          </h2>

          <span
            style={{
              fontSize: 16,
              color: "#fff",
            }}
          >
             PathoSpotter Semantic Search empowers renal pathologists by enabling 
            image-based searches for glomeruli renal biopsies, streamlining research through semantic image retrieval.
          </span>

          <ButtonSecondary
            style={{
              marginTop: 50,
              height: 60,
            }}
            className={styles.loginFormButton}
          >
            Know More...
          </ButtonSecondary>
        </div>
      </div>
      <Content>
        <img src={logoImg} alt="logo" height={100} />

        <Form
          name="normal_login"
          className={styles.loginForm}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <h5>Username:</h5>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Type your username"
              className={styles.FormInput}
            />
          </Form.Item>
          <h5>Password:</h5>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Type your email password"
              className={styles.FormInput}
            />
          </Form.Item>

          <Form.Item>
            <a
              style={{ float: "right" }}
              className={styles.loginFormForgot}
              href=""
            >
              Forgot Password?
            </a>
          </Form.Item>

          <Form.Item>
            <ButtonPrimary
              className={styles.loginFormButton}
              onClick={handleLogIn}
            >
              Log In
            </ButtonPrimary>

            <Divider style={{ marginBottom: 40, fontWeight: "600" }}>
              Not registered yet?
            </Divider>

            <ButtonSecondary
              onClick={handleRegister}
              className={styles.loginFormButton}
            >
              Sign Up
            </ButtonSecondary>
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <a
              className={styles.loginFormForgot}
              style={{ fontSize: 22 }}
              href="/"
            >
              Access the platform without registration
            </a>
          </Form.Item>
        </Form>
      </Content>
    </Container>
  );
}
