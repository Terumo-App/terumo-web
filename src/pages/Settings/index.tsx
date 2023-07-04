import { Header } from '../../components/Header';
import { Container, PageTittle } from './styles';
import { FiSettings } from 'react-icons/fi';


export function Settings() {

  return (
    <>
      <Header />
      
      <Container>
        <PageTittle>
          <FiSettings />
          <h3>Settings</h3>
        </PageTittle>

      
      </Container>
    </>
  );
}
