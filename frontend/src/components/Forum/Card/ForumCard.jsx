import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Pagination } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import BadgeMUI from "@mui/material/Badge";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import { fetchEnhancementRequests, voteForEnhancementRequest, createComment } from '../../../API/API_Services'; // Import createComment
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Link } from 'react-router-dom';
import ModalComponentEdit from "../Modal/EditIdeas";

const ArticleCardComponent = ({
  expandedRequests,
  setExpandedRequests,
  refreshed,
  openEditModal,
}) => {

  const statusColor = "#6ec5b8";
  const displayStatus = "Active";
  
  const handleSeeMore = (requestId) => {
    setExpandedRequests([...expandedRequests, requestId]);
  };

  const isExpanded = (requestId) => {
    return expandedRequests.includes(requestId);
  };

  const [enhancementRequests, setEnhancementRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetchEnhancementRequests()
        .then(data => {
          const updatedRequests = data.map(request => ({
            ...request,
            commentCount: request.comments ? request.comments.length : 0,
          }));
          setEnhancementRequests(updatedRequests);
        })
        .catch(error => console.error('Error fetching enhancement requests:', error));
    } catch (error) {
      console.error('Error fetching enhancement requests:', error);
    }
  }, [refreshed]);

  const handleVote = async (enhancementRequestId) => {
    try {
      const token = localStorage.getItem('access_token');
      await voteForEnhancementRequest(enhancementRequestId, token);
      fetchEnhancementRequests()
        .then(data => setEnhancementRequests(data))
        .catch(error => console.error('Error fetching enhancement requests:', error));
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div>
      {enhancementRequests.map(request => (
      <Row className="article-card">
      <Col sm={2}>
        <div className="vote-button" onClick={() => handleVote(request.id)} style={{ cursor: 'pointer' }}>
          <BadgeMUI
            badgeContent={request.votes}
            color="info"
            invisible={false}
            size="large"
          >
            <ThumbUpOffAltIcon fontSize="large" />
          </BadgeMUI>
       </div>
      </Col>
      <Col sm={10}>
        <Card className="article-content" style={{ border: "none" }}>
          <Card.Header>
            <Card.Title className="d-flex justify-content-between align-items-center">
              {request.title}
              <Link to={`/comments/${request.id}`}>
                  <OpenInNewIcon fontSize="small"/>
              </Link>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <div>
              <Card.Text>
              {request.description && request.description.length > 250
                  ? request.description.substring(0, 250) + "..."
                  : request.description}
              </Card.Text>
            </div>
          </Card.Body>
          <Button variant="primary" onClick={() => openEditModal(request)}>
            Edit  
          </Button>
        </Card>
        <div className="comments-section d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <b>Created by: {request.owner}</b>
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
                <Link to={`/comments/${request.id}`}>
                  <BadgeMUI
                    badgeContent={request.commentCount}
                    color="info"
                    invisible={false}
                    size="large"
                  >
                    <ForumOutlinedIcon fontSize="large" />
                  </BadgeMUI>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
    ))}
  </div>
  );
};

export default ArticleCardComponent;
