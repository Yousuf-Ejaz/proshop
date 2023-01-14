import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";

function ProductScreen() {
	const [product, setProduct] = useState({});
	const params = useParams();

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${params.id}`);
			setProduct(data);
		};

		fetchProduct();
	}, []);

	return (
		<div>
			<Link className="btn btn-secondary my-3" to="/">
				GO BACK
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3 style={{ textTransform: "uppercase" }}>
								{product.name}
							</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
						</ListGroup.Item>
						<ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
						<ListGroup.Item>
							Description: {product.description}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>₹{product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{product.countInStock > 0
											? "In Stock"
											: "Out of Stock"}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup>
								<Button
									className="btn-block m-1"
									type="button"
									disabled={product.countInStock === 0}
								>
									ADD TO CART
								</Button>
							</ListGroup>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
export default ProductScreen;