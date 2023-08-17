
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Button,
  Card,
  Form,
  FormControl,
  Navbar,
} from "react-bootstrap";
import ModalComponent from "./Modal/NewIdeas";


import ArticleCardComponent from "./Card/ForumCard";
import "../../App.css";
import ModalComponentEdit from "./Modal/EditIdeas";
import ApiService from "../../API/userAPI";


const Forums = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [expandedRequests, setExpandedRequests] = useState([]);
    const [refreshed, setRefreshed] = useState(false);


    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const openEditModal = (article) => {
        setSelectedArticle(article);
        setIsEditModalOpen(true);
      };
    
      const closeEditModal = () => {
        setSelectedArticle(null);
        setIsEditModalOpen(false);
      };

      const handleLogout = async () => {
        try {
          const refreshToken = localStorage.getItem("refresh_token"); // Assuming you store the refresh token in localStorage
          await ApiService.logout(refreshToken);
          // Clear user-related data from localStorage
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_id");
          // Redirect or perform other actions after logout
        } catch (error) {
          console.error("Logout error:", error);
        }
      };
    

  
 

 

  return (
    <div>

      <div className="d-flex justify-content-center">
        <Container className="mt-3">
          <Row>
            <Col md={3}>
            <Button onClick={openModal}>Create Article</Button>
            <ModalComponent
                setRefreshed = {setRefreshed}
                refreshed = {refreshed}
                show={isModalOpen} // Pass the modal state as a prop
                onClose={closeModal}
              />
            </Col>
            <Col md={{ span: 8, offset: 0 }}>
              <Tabs
                defaultActiveKey="trending"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="recent" title="Recent"></Tab>
                <Tab eventKey="trending" title="Trending"></Tab>
                <Tab eventKey="popular" title="Popular"></Tab>
              </Tabs>
              <Row>
                <Col md={{ span: 12 }}>
                  
                    <ArticleCardComponent 
                    expandedRequests = {expandedRequests}
                    setExpandedRequests = {setExpandedRequests}
                    refreshed={refreshed}

                    onEdit={openEditModal} />
                    <ModalComponentEdit
                        showEdit={isEditModalOpen}
                        handleCloseEdit={closeEditModal}
      
                    />
                </Col>
              </Row>
            </Col>
            <Col> <Button variant="danger" onClick={handleLogout}>Logout</Button></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Forums;