import React from "react";
import "./Navbar.css";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
function Navbar() {
	const [click, setClick] = React.useState(false);

	const handleClick = () => setClick(!click);
	const Close = () => setClick(false);
	return (
		<>
			<div className="navbar">
				<ul>
					<li>
						<Link
							to="/"
							className="nav-links"
							onClick={click ? handleClick : null}
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/shader"
							className="nav-links"
							onClick={click ? handleClick : null}
						>
							Shaders
						</Link>
					</li>
					<li>
						<Link
							to="/model"
							className="nav-links"
							onClick={click ? handleClick : null}
						>
							3D-Model
						</Link>
					</li>
					<li>
						<Link
							to="/PriceCard"
							className="nav-links"
							onClick={click ? handleClick : null}
						>
							About us
						</Link>
					</li>

					<Button radius="xl">
						<Link
							to="/signup"
							className="nav-links"
							onClick={click ? handleClick : null}
						>
							Signup
						</Link>
					</Button>
					<Button radius="xl">
						<Link
							to="/login"
							className="nav-links"
							onClick={click ? handleClick : null}
						>
							Login
						</Link>
					</Button>
				</ul>
			</div>
		</>
	);
}

export default Navbar;
