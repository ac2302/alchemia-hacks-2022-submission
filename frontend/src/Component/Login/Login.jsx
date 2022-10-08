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
import "./Login.css";
import axios from "axios";
import config from "../../config";

function Login() {
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
						left: 70,
						top: -70,
						color: "white",
					})}
				>
					Welcome back!
				</Title>
				<Text color="dimmed" size="sm" align="center" mt={5}>
					Do not have an account yet?{" "}
					<Anchor
						href="/signup"
						size="sm"
						// onClick={(event) => event.preventDefault()}
					>
						Create account
					</Anchor>
				</Text>

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
									`${config.backendLocation}/auth/login`,
									data
								)
								.then((res) => {
									console.log(res.data);
									const token = res.data.token;
									localStorage.token = token;
									window.location = "/";
								})
								.catch((err) => {
									console.log(err);
									if (err.response)
										alert(err.response.data.msg);
								});
						}}
					>
						<TextInput
							label="Email"
							name="email"
							placeholder="you@email.com"
							required
						/>
						<PasswordInput
							label="Password"
							placeholder="Your password"
							name="password"
							required
							mt="md"
						/>
						{/* <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group> */}
						<input
							type="submit"
							id="submit-login"
							style={{ display: "none" }}
						/>
						<Button
							fullWidth
							mt="xl"
							onClick={() => {
								document.getElementById("submit-login").click();
							}}
						>
							Log in
						</Button>
					</form>
				</Paper>
			</Container>
		</>
	);
}
export default Login;
