// __tests__/page/About/index.test.js
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import About from "../../../pages/About";

test("About - Content", async () => {
    const { getByText } = render(
        <About/>
    );

    expect(getByText("StoneOak 2020").toBeInTheDocument);
});
