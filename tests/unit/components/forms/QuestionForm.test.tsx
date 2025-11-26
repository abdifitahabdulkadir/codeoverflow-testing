// we have to mock the editor beucase it is based api that js-dom does
// not have.

import QuestionForm from "@/components/forms/QuestionForm";
import { toast } from "@/hooks/use-toast";
import { createQuestion } from "@/lib/actions/question.action";
import { mockRouters, resetAllMockes } from "@/tests/mocks";
import { MockEditor } from "@/tests/mocks/editor.mock";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

// and also server action it is using which run on server only.
// this run when question form importing the editor it
// instead of real one, gets this mocked one. and
///because both of them accepts same props then
// question form handles the rest including
// passing to props,
jest.mock("@/components/editor", () => MockEditor);

jest.mock("@/lib/actions/question.action", () => ({
  createQuestion: jest.fn(),
}));

/**
 * jest hoists mock funtion before anyting els so that i why we go the
 * error of initialzation mock function was not created before it.
 * and now we need to cast as jest.Mock
 */
const mockCreateQuestion = createQuestion as jest.Mock;

const user = userEvent.setup();

describe("QuestionForm Component", () => {
  beforeEach(() => {
    resetAllMockes();
  });

  describe("Rendering", () => {
    it("Should render Form it correcly  ", async () => {
      render(<QuestionForm />);

      expect(screen.getByLabelText(/Question Title /i)).toBeInTheDocument();

      expect(
        screen.getByText(/Detailed explanation of your problem/i)
      ).toBeInTheDocument();

      expect(screen.getByLabelText(/Question Title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Tags /i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", {
          name: "Ask a question",
        })
      ).toBeInTheDocument();
    });

    it("Should show erros upon the submission of the form without filling it.", async () => {
      render(<QuestionForm />);

      const askQuestionButton = screen.getByRole("button", {
        name: "Ask a question",
      });

      await user.click(askQuestionButton);

      expect(
        screen.getByText(/Title must be at least 5 characters./i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Minimum of 100 characters./i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Add at least one tag./i)).toBeInTheDocument();
    });
  });

  describe("Submission", () => {
    it("should submit with correct data ", async () => {
      mockCreateQuestion.mockResolvedValue({
        success: true,
        data: {
          _id: 123,
        },
      });
      const mockObject = {
        title: "What is the javascript hoisting function",
        detial:
          "Explain to me about javascript hoisitng function. I am confused. and I have not idea waht to do now.",
        tags: "react",
      };
      render(<QuestionForm />);

      const titleInput = screen.getByLabelText(/Question Title/i);
      const detailInput = screen.getByLabelText(/Detailed explanation/i);
      const tagsInput = screen.getByLabelText(/Tags/i);
      const submitButton = screen.getByRole("button", {
        name: "Ask a question",
      });
      await user.type(titleInput, mockObject.title);
      await user.type(detailInput, mockObject.detial);

      await user.type(tagsInput, mockObject.tags);
      fireEvent.change(tagsInput, { target: { value: mockObject.tags } });
      fireEvent.keyDown(tagsInput, { key: "Enter" });
      await user.click(submitButton);

      // this awaits for all expectation to finish.
      // like asynchraouse code like createQuestion mock function,
      // and it retires eveyr 50ms unti it hits 1000ms -1s timeout
      await waitFor(() => {
        expect(mockCreateQuestion).toHaveBeenCalledWith({
          title: mockObject.title,
          content: mockObject.detial,
          tags: [mockObject.tags],
        });
        expect(toast).toHaveBeenCalledWith(
          expect.objectContaining({
            title: "Success",
            description: "Your question has been posted successfully.",
          })
        );

        expect(mockRouters.push).toHaveBeenCalledWith("/questions/123");
      });
    });
    it("Should not submit incase of Failure", async () => {
      const router = useRouter();
      mockCreateQuestion.mockResolvedValue({
        success: false,
        status: 303,
        error: {
          message: "You dont access to it.",
        },
      });

      const mockObject = {
        title: "What is the javascript hoisting function",
        detial:
          "Explain to me about javascript hoisitng function. I am confused. and I have not idea waht to do now.",
        tags: "react",
      };
      render(<QuestionForm />);

      const titleInput = screen.getByLabelText(/Question Title/i);
      const detailInput = screen.getByLabelText(/Detailed explanation/i);
      const tagsInput = screen.getByLabelText(/Tags/i);
      const submitButton = screen.getByRole("button", {
        name: "Ask a question",
      });
      await user.type(titleInput, mockObject.title);
      await user.type(detailInput, mockObject.detial);

      await user.type(tagsInput, mockObject.tags);
      fireEvent.change(tagsInput, { target: { value: mockObject.tags } });
      fireEvent.keyDown(tagsInput, { key: "Enter" });
      await user.click(submitButton);

      // this awaits for all expectation to finish.
      // like asynchraouse code like createQuestion mock function,
      // and it retires eveyr 50ms unti it hits 1000ms -1s timeout
      await waitFor(() => {
        expect(mockCreateQuestion).toHaveBeenCalledWith({
          title: mockObject.title,
          content: mockObject.detial,
          tags: [mockObject.tags],
        });

        expect(toast).toHaveBeenCalledWith(
          expect.objectContaining({
            title: `Error (303)`,
            description: "You dont access to it.",
            variant: "destructive",
          })
        );

        expect(router.push).not.toHaveBeenCalledWith();
      });
    });
  });
});
