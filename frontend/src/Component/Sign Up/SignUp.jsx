import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
} from "@mantine/core";
import axios from "axios";
import config from "../../config";
//   import './Login.css';
function SignUp() {
	return (
		<>
			<Container
				size={420}
				my={40}
				className="cont"
				sx={{ position: "absolute", left: 530, top: 70, width: 340 }}
			>
				<Title
					align="center"
					sx={(theme) => ({
						fontFamily: `Greycliff CF, ${theme.fontFamily}`,
						fontWeight: 900,
						position: "absolute",
						left: 130,
						top: -50,
						color: "white",
					})}
				>
					Sign Up
				</Title>
				{/* <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor href="#" size="sm" onClick={(event) => event.preventDefault()}>
            Create account
          </Anchor>
        </Text> */}

				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							const data = {
								email: e.target.email.value,
								password: e.target.password.value,
							};

							console.log(data);
							axios
								.post(
									`${config.backendLocation}/auth/register`,
									data
								)
								.then((res) => {
									console.log(res.data);
									window.location = "/login";
								})
								.catch((err) => {
									console.log(err);
									if (err.response)
										alert(err.response.data.msg);
								});
						}}
					>
						{/* <TextInput label="Name" placeholder="John" required /> */}
						<TextInput
							label="Email"
							placeholder="you@email.com"
							required
							name="email"
						/>
						<PasswordInput
							label="Password"
							placeholder="Your password"
							required
							mt="md"
							name="password"
						/>
						<Group position="apart" mt="md">
							{/* <Checkbox label="Remember me" /> */}
							{/* <Anchor onClick={(event) => event.preventDefault()} href="#" size="sm">
              Forgot password?
            </Anchor> */}
						</Group>
						<input
							type="submit"
							id="submit-signup"
							style={{ display: "none" }}
						/>
						<Button
							fullWidth
							mt="xl"
							onClick={() =>
								document.getElementById("submit-signup").click()
							}
						>
							Sign Up
						</Button>
					</form>
				</Paper>
			</Container>
		</>
	);
}
export default SignUp;
