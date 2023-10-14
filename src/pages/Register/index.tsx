import {
  GlobalOutlined,
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  SkinOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Checkbox, Divider, Form, Input, Select } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { ButtonSecondary } from "../../styles/global";
import styles from "./Styles.module.scss";
import { ButtonPrimary, Container, Content } from "./styles";
import useAuth from "../../hooks/useAuth";

export function Register() {
  const navigate = useNavigate();
  const { signup, signin } = useAuth()

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);

    try {
      await signup(values)

    } catch (error: any) {
      console.error('Registration Failed:', error);
      alert(`Registration Failed: ${error.response.data.detail}`)
      throw new Error('Registration Failed');
    }

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
    navigate("/login", {
      preventScrollReset: false,
    });
  }

  function handleRegister(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {

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

          <h5>First Name:</h5>
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Type your first name"
              className={styles.FormInput}
            />
          </Form.Item>

          <h5>Last Name:</h5>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Type your last name"
              className={styles.FormInput}
            />
          </Form.Item>


          <h5>Email:</h5>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Type your email"
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

          <h5>Confirm Password:</h5>
          <Form.Item
            name="password_confirm"
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
            <Checkbox> I have read and agree to the Terms of Service</Checkbox>
          </Form.Item>

          <Form.Item>
            <ButtonPrimary
              className={styles.loginFormButton}
              onClick={handleRegister}
            >
              Sign Up
            </ButtonPrimary>

            <Divider style={{ marginBottom: 40, fontWeight: "600" }}>
              Already have an account?
            </Divider>

            <ButtonSecondary

              onClick={handleLogIn}
              className={styles.loginFormButton}
            >
              Log In
            </ButtonSecondary>
          </Form.Item>
        </Form>
      </Content>
    </Container>
  );
}
