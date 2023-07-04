import { CollectionCheckBox } from "../CollectionCheckBox";
import { Header } from "./styles";     
      
export function CollectionsSelect() {
    return <>
        <Header>
            <div>
                <p>Select</p>
            </div>

            <div>
                <p>Type</p>
            </div>

            <div>
                <p>Name</p>
            </div>

            <div>
                <p>Items</p>
            </div>

            <div>
                <p>Last Upload</p>
            </div>

            <div>
                <p>Owner</p>
            </div>      
        </Header>
    <CollectionCheckBox />
    <CollectionCheckBox />
    <CollectionCheckBox />
    <CollectionCheckBox />
    </>


   
}