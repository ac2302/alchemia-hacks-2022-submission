import React from "react";
import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { random } from "maath";

function Stars(props) {
	const ref = useRef();
	const [sphere] = useState(() =>
		random.inSphere(new Float32Array(7000), { radius: 11.5 })
	);
	useFrame((state, delta) => {
		ref.current.rotation.x -= delta / 10;
		ref.current.rotation.y -= delta / 15;
	});
	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points
				ref={ref}
				positions={sphere}
				stride={3}
				frustumCulled={false}
				{...props}
			>
				<PointMaterial
					transparent
					color="#ffa0e0"
					size={0.05}
					sizeAttenuation={true}
					depthWrite={false}
				/>
			</Points>
		</group>
	);
}

export default Stars;
