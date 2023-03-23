import React, { Component } from 'react';
import { Card, CardTitle, CardBody, CardText, CardImg, CardImgOverlay, Breadcrumb, BreadcrumbItem, NavItem, Button, Nav, Input, Label, ModalHeader, ModalBody, Collapse, NavbarToggler, FormGroup, Modal, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import Form from "reactstrap/es/Form";
import Row from "reactstrap/es/Row";
import { Control, Errors, LocalForm } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleComment(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render() {
        return (
            <div>
                <Button outline color='primary' onClick={this.toggleModal}>
                    <span className='fa fa-pencil fa-lg'></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleComment(values)}>
                            <Row className='form-group'>
                                <Label htmlFor='rating' className='ml-3'>Rating</Label>
                                <Col md={12}>
                                    <Control.select model='.rating' id='rating' name='rating' className='form-control'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='rating' className='ml-3'>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model='.author' id='author' name='author' className='form-control'
                                                  placeholder='Your Name' validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}/>
                                    <Errors className='text-danger' model='.author' show='touched' messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be less than 15 characters'
                                    }}/>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='rating' className='ml-3'>Rating</Label>
                                <Col md={12}>
                                    <Control.textarea model='.comment' id='comment' name='comment'
                                                      className='form-control' placeholder='Comment' rows='6'/>
                                </Col>
                            </Row>
                            <Button type='submit' value='submit' className='primary' color='primary'>Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

    function RenderDish({dish}) {
        return (
            <div>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({comments, postCom, dishId, addComment}) {

        return (
            <div>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <div>{comment.comment}</div>
                                <br/>
                                <div>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit'
                                }).format(new Date(Date.parse(comment.date)))}</div>
                            </li>
                        );
                    })}
                </ul>
                <CommentForm dishId={dishId} postCom={postCom} addComment={addComment}/>
            </div>
        );
    }

    const DishDetailComponent = (props) => {

        if (props.dish != null) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-5 m-1'>
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className='col-12 col-md-5 m-1'>
                            <h4>Comments</h4>
                            <RenderComments comments={props.comments}
                                addComment={props.addComment}
                                dishId={props.dish.id} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

export default DishDetailComponent;