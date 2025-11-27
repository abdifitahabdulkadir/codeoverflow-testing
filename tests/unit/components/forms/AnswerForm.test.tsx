import AnswerForm from "@/components/forms/AnswerForm";
import { toast } from "@/hooks/use-toast";
import { createAnswer } from "@/lib/actions/answer.action";
import { api } from "@/lib/api";
import {
  MockEditor,
  mockSession,
  mockUseSession,
  resetAllMockes,
} from "@/tests/mocks";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

jest.mock("@/components/editor", () => MockEditor);

// server actions required by answer form.
jest.mock("@/lib/actions/answer.action", () => ({
  createAnswer: jest.fn(),
}));

// getanswer required by
jest.mock("@/lib/api", () => ({
  api: {
    ai: {
      getAnswer: jest.fn(),
    },
  },
}));

const mockCreateAnswer = createAnswer as jest.MockedFunction<
  typeof createAnswer
>;

const mockGetAIAnswer = api.ai.getAnswer as jest.MockedFunction<
  typeof api.ai.getAnswer
>;

describe("AnswerForm Component", () => {
  beforeEach(() => {
    resetAllMockes();
  });

  describe("AI Answer Generation", () => {
    it("Should generate AI answer with authenticated User -mine", async () => {
      //this will always retrn value whenever mock function is called.
      mockUseSession.mockReturnValue({
        data: mockSession,
        status: "authenticated",
        update: jest.fn(),
      });

      mockGetAIAnswer.mockResolvedValue({
        success: true,
        data: "This is ai generated Content.",
      });

      render(
        <AnswerForm
          questionId={"1234"}
          questionTitle={"Question Title"}
          questionContent={"Question content"}
        />
      );
      const postAnswerButton = screen.getByRole("button", {
        name: /Generate AI answer/i,
      });

      await user.click(postAnswerButton);

      waitFor(() => {
        expect(mockGetAIAnswer).toHaveBeenCalledWith(
          "Question Title",
          "Question content",
          ""
        );
        expect(toast).toHaveBeenCalledWith(
          expect.objectContaining({
            title: "AI Answer Generated",
            description: "The AI has successfully generated an answer.",
          })
        );
      });
    });
  });
});
