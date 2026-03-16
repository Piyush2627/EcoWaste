import Router from "./router/Routers";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<>
			<Toaster position="top-right" reverseOrder={false} />
			<Router />
		</>
	);
}

export default App;
