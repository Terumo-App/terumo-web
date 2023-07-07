import 'antd/dist/antd.css';
import styles from './Styles.module.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { ButtonPrimary, Container, Content, PageTittle } from './styles';
import { useNavigate } from 'react-router-dom';

export function LogIn () {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  function handleLogIn(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    navigate("/", {
      preventScrollReset: false
    });
  }

  return (
    <Container>
      <div style={{
        width: "100%"
      }}>
          <span>Image</span>
      </div>
      <Content>
            <PageTittle>
              <h3>Welcome PathoSpotter</h3>

            </PageTittle>
            <Form
              name="normal_login"
              className={styles.loginForm}     
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              layout='vertical'
            >
              <h5>Email:</h5>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ]}
              >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Type your email" className={styles.FormInput} />
              </Form.Item>
              <h5>Password:</h5>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
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
                <a className={styles.loginFormForgot}   href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                
                <ButtonPrimary className={styles.loginFormButton} onClick={handleLogIn}>
                  Log in
                </ButtonPrimary>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </Content>



    </Container>
    
  );
};

