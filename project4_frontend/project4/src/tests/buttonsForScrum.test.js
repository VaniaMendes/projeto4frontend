import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonsForScrum from "./buttonsForScrum";

describe("ButtonsForScrum", () => {
  it("should call handleViewInformations when the button is clicked", () => {
    // Arrange
    const username = "testUser";
    const setShowModalEditUser = jest.fn(); // Mocking setShowModalEditUser function
    const { getByTitle } = render(
      <ButtonsForScrum username={username} setShowModalEditUser={setShowModalEditUser} />
    );

    // Act
    fireEvent.click(getByTitle("View Profile"));

    // Assert
    expect(setShowModalEditUser).toHaveBeenCalledWith(true);
  });
});
