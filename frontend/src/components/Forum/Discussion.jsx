
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
import { editEnhancementRequest } from "../../API/API_Services";


const Forums = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedRequests, setExpandedRequests] = useState([]);
    const [refreshed, setRefreshed] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null); // State for selected enhancement request ID
     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedRequestId(null);
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
          const refreshToken = localStorage.getItem("refresh_token");
          await ApiService.logout(refreshToken);
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_id");
        } catch (error) {
          console.error("Logout error:", error);
        }
      };
  
  return (
    <div >

      <div className="d-flex justify-content-center">
        <Container className="mt-3">
          <Row>
            <Col md={3}>
            
            <ModalComponent
                setRefreshed = {setRefreshed}
                refreshed = {refreshed}
                show={isModalOpen}
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
                    expandedRequests={expandedRequests}
                    setExpandedRequests={setExpandedRequests}
                    refreshed={refreshed}
                    openEditModal={openEditModal}
                    />

                    <ModalComponentEdit
                      showEdit={isEditModalOpen}
                      handleCloseEdit={closeEditModal}
                      editArticle={selectedRequestId}
                      article={selectedArticle}
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