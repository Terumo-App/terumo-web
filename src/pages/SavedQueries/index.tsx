import { Header } from '../../components/Header';
import { Container, PageTittle } from './styles';
import { FiDatabase } from 'react-icons/fi';



export function SavedQueries() {
    return (
    <>
      <Header />
      
      <Container>
        <PageTittle>
          <FiDatabase />
          <h3>Saved Queries</h3>
        </PageTittle>

        
      </Container>
    </>
  );
}