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
import ArticleCard from "../components/Forum/Articles";

function AutoLayoutExample() {
  return (

   <div>
    <Header/>
    <Container>

    

      <Row>
        <Col xs={2}>Sidebar
        <br></br>
        <br></br>
            <Button variant="primary">Create Article</Button>
        </Col>


        <Col>Main Menu

            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Recent">
                                Tab content for Home
                    </Tab>
                        <Tab eventKey="profile" title="Trending">
                                <ArticleCard></ArticleCard>
                        </Tab>
                    <Tab eventKey="contact" title="Popular">
                                Tab content for Contact
                </Tab>
            </Tabs>
        
        
        </Col>
        <Col xs={3}>Search Bar
        
            <Form inline>
            <Row>
            <Col xs="auto">
                <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                />
                <Button type="submit">Submit</Button>
            </Col>
           
                
            
            </Row>
        </Form>
        
        </Col>
      </Row>
      
    </Container>

</div>
  );
}

export default AutoLayoutExample;