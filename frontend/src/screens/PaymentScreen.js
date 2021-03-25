import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/common/CheckoutSteps";
import FormContainer from "../components/common/FormContainer";
import { savePaymentMethod } from "../redux/actions/cart";

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);

    const { shippingAddress } = cart;

    if ((!shippingAddress.address)) {
        history.push("/shipping");
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));

        history.push("/placeorder");
    };

    return (
        <div>
            <FormContainer>
                <CheckoutSteps step1 step2 step3 />

                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as="legend">Select Method</Form.Label>

                        <Col>
                            <Form.Check
                                type="radio"
                                label="PayPal or Credit Card"
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                checked
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                }}
                            ></Form.Check>
                            {/* <Form.Check
                                type="radio"
                                label="Stripe"
                                id="Stripe"
                                name="paymentMethod"
                                value="Stripe"
                                checked
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                }}
                            ></Form.Check> */}
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </div>
    );
};

export default PaymentScreen;
