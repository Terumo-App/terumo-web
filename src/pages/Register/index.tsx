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

export function Register() {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
    navigate("/", {
      preventScrollReset: false,
    });
  }

  const handleGender = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleJob = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleJobSearch = (value: string) => {
    console.log("search:", value);
  };

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
              fontSize: 50,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur.
          </h2>

          <span
            style={{
              fontSize: 16,
              color: "#fff",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
        {/* {<PageTittle>
          <h2>Welcome!</h2>
        </PageTittle>} */}

        <Form
          name="normal_login"
          className={styles.loginForm}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <h5>First Name:</h5>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Type your first name"
              className={styles.FormInput}
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <h5>Last Name:</h5>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Type your last name"
              className={styles.FormInput}
            />
          </Form.Item>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Form.Item>
              <h5>Gender:</h5>
              <Select
                className={styles.SelectInput}
                suffixIcon={<SkinOutlined />}
                defaultValue="not-informed"
                style={{ width: 120 }}
                onChange={handleGender}
                options={[
                  { value: "not-informed", label: "Not informed" },
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="job"
              rules={[
                {
                  required: true,
                  message: "Please input your Job!",
                },
              ]}
            >
              <h5>Job title:</h5>
              <Select
                className={styles.SelectInput}
                suffixIcon={<IdcardOutlined />}
                showSearch
                placeholder="Select a Job"
                optionFilterProp="children"
                onChange={handleJob}
                onSearch={handleJobSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "graduationStudent",
                    label: "Graduation Student",
                  },
                  {
                    value: "masterDegree",
                    label: "Master's Degree",
                  },
                  {
                    value: "phDStudent",
                    label: "PhD Student",
                  },
                  {
                    value: "researcher",
                    label: "Researcher",
                  },
                  {
                    value: "professor",
                    label: "Professor",
                  },
                  {
                    value: "doctor",
                    label: "Doctor",
                  },
                  {
                    value: "other",
                    label: "Other",
                  },
                ]}
              />
            </Form.Item>
          </div>

          {/*Undegraduate Student
            Graduate Student
            Faculty
            Researcher
            other*/}

          <Form.Item
            name="organization"
            rules={[
              {
                required: true,
                message: "Please input your Organization!",
              },
            ]}
          >
            <h5>Organization:</h5>
            <Input
              prefix={<GlobalOutlined className="site-form-item-icon" />}
              placeholder="Type your organization"
              className={styles.FormInput}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <h5>Email:</h5>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Type your email"
              className={styles.FormInput}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <h5>Password:</h5>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Type your email password"
              className={styles.FormInput}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <h5>Confirm Password:</h5>
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
              onClick={handleLogIn}
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
