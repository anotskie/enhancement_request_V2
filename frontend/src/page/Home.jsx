import {
    Button,
    Row,
    Container,
    Col,
    Nav,
    Tab,
    Tabs,
    Card,
    Form
  } from "react-bootstrap";

// import './Home.css'; // Import a custom CSS file for styling

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Navigation/Header";

import Forums from "../components/Forum/Discussion";

function AutoLayoutExample() {
  return (

   <div>
    <Header/>
    <Container>

        <Forums/>

      
      
    </Container>

</div>
  );
}

export default AutoLayoutExample;