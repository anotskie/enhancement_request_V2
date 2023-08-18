import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, ListGroup, Container  } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import BadgeMUI from '@mui/material/Badge';
import "../../../App.css";
import CommentSection from "../../../test/comment";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEnhancementRequests, voteForEnhancementRequest} from '../../../API/API_Services'; // Import createComment
import NavbarComponent from "../../Navigation/Header";

const CommentComponent = ({ onEdit }) => {
  const statusColor = "#6ec5b8";
  const displayStatus = "Active";
  const commentCount = 1000;
  const [forumRetrieved, setForumRetrieved] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchEnhancementRequests()
      .then((data) => {
        const selectedRequest = data.find(request => request.id === parseInt(id));
        setForumRetrieved(selectedRequest);
        
      })
      .catch((error) => {
        console.error("Error fetching Enhancement Request", error);
      });
  }, []);

  return (
<div>

    <NavbarComponent></NavbarComponent>
  {forumRetrieved && (
    <Row className="comments-card" key={forumRetrieved.id}>
      <Col sm={2}>
        <div className="vote-button">
          <BadgeMUI
            badgeContent={forumRetrieved.votes}
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
            <Card.Title>{forumRetrieved.title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>{forumRetrieved.description}</Card.Text>
          </Card.Body>
        </Card>
        <Container>

          
       <CommentSection enhancementRequestId={forumRetrieved.id} />
        {forumRetrieved?.comments && forumRetrieved.comments.length > 0 && (
          <div className="comments-section">
            <h3>Comments of the Users:</h3>
            <p>Total Comments: {forumRetrieved.comments.length}</p>
            <ListGroup>
              {forumRetrieved.comments.map(comment => (
                <ListGroup.Item key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <strong>Posted by:</strong> {comment.username}
                  </div>
                  <p className="comment-content">{comment.content}</p>
                  <div>
                    <span className="comment-created-at">
                      Created at: {comment.created_at}
                  </span>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
        </Container>
      </Col>
    </Row>
  )}
</div>
  );
};

export default CommentComponent;