import Form from "./Form/Form";
import { ContactList } from "./ContactList/ContactList";
import { FormFiler } from "./FormFilter/FormFilter";

export default function App() {
    return (
      <>
        <Form/>
        <FormFiler/>
        <ContactList/>
      </>
    )
};