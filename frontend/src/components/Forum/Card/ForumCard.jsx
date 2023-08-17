import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import BadgeMUI from "@mui/material/Badge";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import "../../../App.css";

const ArticleCardComponent = ({ article, onEdit}) => {


 

  const statusColor = "#6ec5b8"; // Replace with your actual color
  const displayStatus = "Active"; // Replace with your actual status
  const commentCount = 1000;

  return (
    <Row className="article-card">
      <Col sm={2}>
        <div>
          <Button
            variant="primary"
            size="sm"

            className="vote-button-inner"
          >

            <Badge pill variant="light" className="vote-count">
                1
            </Badge>
          </Button>
        </div>
      </Col>
      <Col sm={10}>
        <Card className="article-content" style={{ border: "none" }}>
          <Card.Body>
            
            <div>
              <Card.Title>Title</Card.Title>
              <Card.Text>
               Desc
              </Card.Text>
            </div>
            
          </Card.Body>
          <Button onClick={() => onEdit(article)}>Edit</Button>
        </Card>
        <div className="comments-section d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <b>Created by:</b>
          
          </div>
          <div className="d-flex align-items-center">
            <div
              className="status mr-3"
              style={{
                backgroundColor: statusColor || "#999",
                borderRadius: "5px",
                color: "#fff",
              }}
            >
              {displayStatus}
            </div>

            <div className="comment-info d-flex align-items-center">
              <div className="comment-count mr-1">
                <BadgeMUI badgeContent={commentCount} color="primary">
                  <ForumOutlinedIcon />
                </BadgeMUI>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ArticleCardComponent;
