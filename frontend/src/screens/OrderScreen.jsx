import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";
import { useParams } from "react-router-dom";
import axios from "axios";

function OrderScreen() {
	const dispatch = useDispatch();
	const { id: orderId } = useParams();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	if (!loading) {
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};
		// Calculate prices
		order.itemsPrice = addDecimals(
			order.orderItems.reduce(
				(acc, item) => acc + item.price * item.qty,
				0
			)
		);
	}

	useEffect(() => {
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
		};

		dispatch(getOrderDetails(orderId));
	}, [dispatch, orderId]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1 style={{ textTransform: "uppercase" }}>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2 style={{ textTransform: "uppercase" }}>
								Shipping
							</h2>
							<p>
								<strong>Name: </strong>
								{order.user.name}
							</p>
							<p>
								<strong>Email: </strong>
								<a href={`mailto:${order.user.email}`}>
									{order.user.email}
								</a>
							</p>
							<p>
								<strong>Addess: </strong>
								{order.shippingAddress.address},{" "}
								{order.shippingAddress.city},{" "}
								{order.shippingAddress.postalCode},{" "}
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant="success">
									Paid on {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">
									Not Delivered
								</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2 style={{ textTransform: "uppercase" }}>
								Payment Method
							</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">
									Paid on {order.paidAt}
								</Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2 style={{ textTransform: "uppercase" }}>
								Order Items
							</h2>

							{order.orderItems.length === 0 ? (
								<Message>Order is empty</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link
														to={`/product/${item.product}`}
														style={{
															textDecoration:
																"none",
														}}
													>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ₹{item.price} =
													₹{item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2 style={{ textTransform: "uppercase" }}>
									order Summary
								</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col style={{ textTransform: "uppercase" }}>
										Items:
									</Col>
									<Col>₹ {order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col style={{ textTransform: "uppercase" }}>
										Shipping:
									</Col>
									<Col>₹ {order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col style={{ textTransform: "uppercase" }}>
										Tax:
									</Col>
									<Col>₹ {order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col style={{ textTransform: "uppercase" }}>
										Total:
									</Col>
									<Col>₹ {order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
}
export default OrderScreen;
