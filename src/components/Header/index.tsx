import logoImg from '../../assets/logoPS.svg';
import Image from '../../assets/image.svg';


import { Container, Content } from './styles';
import { 
    FiBell,
} from 'react-icons/fi';
import { Drawer } from '../Drawer';

export function Header() {
    return (
        <Container>
            <Content>
            <Drawer />

            <img src={logoImg} alt="logo" height={80}/>

            <div>
                <button type="button">
                    <FiBell />
                </button>

                <button type="button">
                    <img src={Image} alt="img" />
                </button>
            </div>
            
            </Content>
        </Container>
    )
}