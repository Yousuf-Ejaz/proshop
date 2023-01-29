import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
	ListGroupItem,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import queryString from "query-string";

function CartScreen() {
	const params = useParams();
	const { search } = useLocation();
	const navigate = useNavigate();
	const queryParams = queryString.parse(search);
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	console.log(cartItems);
	const removeFromCartHandler = (id) => dispatch(removeFromCart(id));
	const checkOutHandler = (id) => navigate("/login?redirect=/shipping");

	const productId = params.id;
	const qty = queryParams.qty === undefined ? 0 : queryParams.qty;

	useEffect(() => {
		dispatch(addToCart(productId, qty));
	}, [dispatch, productId, qty]);
	return (
		<Row>
			<Col md={8}>
				<h1>SHOPPING CART</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is Empty <Link to="/">Go Back</Link>
					</Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image
											src={item.image}
											alt={item.image}
											fluid
											rounded
										/>
									</Col>
									<Col md={3}>
										<Link
											to={`/product/${item.product}`}
											style={{ textDecoration: "none" }}
										>
											{item.name}
										</Link>
									</Col>
									<Col md={2}>₹ {item.price}</Col>
									<Col md={2}>
										<Form.Control
											as="select"
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(
														item.product,
														Number(e.target.value)
													)
												)
											}
										>
											{[
												...Array(
													item.countInStock
												).keys(),
											].map((x) => (
												<option
													key={x + 1}
													value={x + 1}
													style={{
														color: "black",
													}}
												>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="secondary"
											onClick={() =>
												removeFromCartHandler(
													item.product
												)
											}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>
								SUBTOTAL (
								{cartItems.reduce(
									(acc, item) => acc + Number(item.qty),
									0
								)}
								) ITEMS
							</h2>
							₹{" "}
							{cartItems
								.reduce(
									(acc, item) =>
										acc + Number(item.qty) * item.price,
									0
								)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup>
							<Button
								className="btn-block m-1"
								type="button"
								disabled={cartItems.length === 0}
								onClick={checkOutHandler}
							>
								PROCEED TO CHECKOUT
							</Button>
						</ListGroup>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
}
export default CartScreen;
