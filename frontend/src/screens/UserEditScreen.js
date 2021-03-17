import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/common/Message";
import Loader from "../components/common/Loader";
import FormContainer from "../components/common/FormContainer";
import { getUserDetails } from "../redux/actions/user";

const UserEditScreen = ({ match, history }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const userId = match.params.id;

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    useEffect(() => {
        if(!user.name || user._id !== userId){
            dispatch(getUserDetails(userId))
        } else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user, dispatch, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3 border">Go Back</Link>

            <FormContainer>
                <h1>Edit user</h1>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="email">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="isAdmin">
                            <Form.Label></Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => {
                                    setIsAdmin(e.target.checked);
                                }}
                            ></Form.Check>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
