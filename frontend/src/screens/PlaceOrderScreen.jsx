import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";

function PlaceOrderScreen() {
	const cart = useSelector((state) => state.cart);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};
	// Calculate prices
	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);

	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, success, error } = orderCreate;

	useEffect(() => {
		if (success) {
			navigate(`/order/${order._id}`);
		}
	}, [navigate, success]);

	cart.totalPrice = addDecimals(
		Number(cart.itemsPrice) +
			Number(cart.shippingPrice) +
			Number(cart.taxPrice)
	);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2 style={{ textTransform: "uppercase" }}>
								Shipping
							</h2>
							<p>
								<strong>Addess: </strong>
								{cart.shippingAddress.address},{" "}
								{cart.shippingAddress.city},{" "}
								{cart.shippingAddress.postalCode},{" "}
								{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2 style={{ textTransform: "uppercase" }}>
								Payment Method
							</h2>
							<strong>Method: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2 style={{ textTransform: "uppercase" }}>
								Order Items
							</h2>

							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item, index) => (
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
													{item.qty} x ???{item.price} =
													???{item.qty * item.price}
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
									<Col>??? {cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col style={{ textTransform: "uppercase" }}>
										Shipping:
									</Col>
									<Col>??? {cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col style={{ textTransform: "uppercase" }}>
										Tax:
									</Col>
									<Col>??? {cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col style={{ textTransform: "uppercase" }}>
										Total:
									</Col>
									<Col>??? {cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && (
									<Message variant="danger">{error}</Message>
								)}
							</ListGroup.Item>
							<ListGroup>
								<Button
									type="button"
									className="btn-block m-1"
									disabled={cart.cartItems === 0}
									onClick={placeOrderHandler}
								>
									PLACE ORDER
								</Button>
							</ListGroup>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
}
export default PlaceOrderScreen;
