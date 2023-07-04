import { FiHelpCircle } from 'react-icons/fi';
import { Header } from '../../components/Header';
import { Container, PageTittle } from './styles';

export function Help() {
 
  return (
    <>
      <Header />
      
      <Container>
        <PageTittle>
          <FiHelpCircle />
          <h3>Help</h3>
        </PageTittle>

      
      </Container>
    </>
  );
}
