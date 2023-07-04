import logoImg from '../../assets/logoPS.svg';
import { Content } from '../styles';
import { QueryTypeSelect } from '../../QueryTypeSelect';


export function QueryImageTypeStep() {
    return <Content><h2>Query image type</h2> <QueryTypeSelect/> </Content>
}