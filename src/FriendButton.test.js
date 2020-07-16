import React from "react";
import FriendButton from "./FriendButton";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import axios from "./axios";
// import { jest, TestScheduler } from "jest";

jest.mock("./axios");

test("No request, no friendship renders 'Send friend request", async () => {
    axios.get.mockResolvedValue({
        data: [],
    });

    const { container } = render(<FriendButton />);
    // console.log("### my container ###\n", container);

    expect(container.querySelector("button").innerHTML).toContain("Loading...");
    // expect(container.children.length).toBe(0);
    const button = await waitForElement(() =>
        container.querySelector("button")
    );
    expect(button.innerHTML).toContain("Send Friend Request");

    fireEvent.click(button);
    expect(button.innerHTML).toContain("Cancel Friend Request");
});

// * if (rows.length === 0) {
//         render makeFriendshipRequest
//     }
//     * if (rows.accepted === true) {
//         render cancelFriendship
//     }
//     * if (rows.accepted === false) {
//         if(rows.recipient === this.state.userId) {
//         render acceptFriendship + cancelFriendship;
//         }
//         render cancelFriendship
//     }
