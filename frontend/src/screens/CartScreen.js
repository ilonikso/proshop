import React, { useEffect } from "react";
import { Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/common/Message";
import { addToCart } from "../redux/actions/cart";

const CartScreen = ({match, location, history}) => {
    
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
        
    }, [dispatch, productId, qty])


    return <div>Cart</div>;
};

export default CartScreen;
