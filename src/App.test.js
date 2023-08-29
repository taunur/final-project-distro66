import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux"; // Import Provider
import store from "./app/redux/store"; // Import Redux store
import App from "./App";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
