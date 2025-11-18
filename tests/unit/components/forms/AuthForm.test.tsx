import AuthForm from "@/components/forms/AuthForm";
import { SignInSchema, SignUpSchema } from "@/lib/validations";
import { resetAllMockes } from "@/tests/mocks";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
const user = userEvent.setup();

describe("Auth Form", () => {
  // clean up the test before each test.
  beforeEach(() => {
    resetAllMockes();
  });

  const onSubmit = jest.fn();
  describe("Sign In Form", () => {
    describe("Rendering The Form", () => {
      it("Should Render the Auth Form Correcly", () => {
        render(
          <AuthForm
            schema={SignInSchema}
            defaultValues={{
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
            formType={"SIGN_IN"}
          />
        );

        expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(
          screen.getByRole("button", {
            name: "Sign In",
          })
        ).toBeInTheDocument();
        expect(screen.getByText("Don’t have an account?")).toBeInTheDocument();
      });
    });

    describe("Form Validation", () => {
      it("Should show an error for invalid Email", async () => {
        render(
          <AuthForm
            schema={SignInSchema}
            defaultValues={{
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
            formType={"SIGN_IN"}
          />
        );

        const emailInput = screen.getByLabelText("Email Address");
        const passwordInput = screen.getByLabelText("Password");
        const signInButton = screen.getByRole("button", {
          name: "Sign In",
        });

        await user.type(emailInput, "invalid@invalid");
        await user.type(passwordInput, "1231234");
        await user.click(signInButton);

        expect(
          screen.queryByText("Please provide a valid email address.")
        ).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
      });
      it("Should show an error for invalid Password", async () => {
        render(
          <AuthForm
            schema={SignInSchema}
            defaultValues={{
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
            formType={"SIGN_IN"}
          />
        );

        const emailInput = screen.getByLabelText("Email Address");
        const passwordInput = screen.getByLabelText("Password");
        const signInButton = screen.getByRole("button", {
          name: "Sign In",
        });

        await user.type(emailInput, "username@gmail.com");
        await user.type(passwordInput, "1231");
        await user.click(signInButton);

        expect(
          screen.queryByText("Password must be at least 6 characters long.")
        ).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
      });

      it("Should clears all erors for valid email and password", async () => {
        render(
          <AuthForm
            schema={SignInSchema}
            defaultValues={{
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
            formType={"SIGN_IN"}
          />
        );

        const emailInput = screen.getByLabelText("Email Address");
        const passwordInput = screen.getByLabelText("Password");
        const signInButton = screen.getByRole("button", {
          name: "Sign In",
        });

        await user.type(emailInput, "username@gmail.com");
        await user.type(passwordInput, "1231234");
        await user.click(signInButton);

        expect(
          screen.queryByText("Password must be at least 6 characters long.")
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText("Please provide a valid email address.")
        ).not.toBeInTheDocument();

        expect(onSubmit).toHaveBeenCalled();
      });
    });
    describe("Submision", () => {
      it("Should Submit with valida data and loading State", async () => {
        const onSubmitFunction = jest
          .fn()
          .mockImplementation(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ success: true }), 1000)
              )
          );
        render(
          <AuthForm
            formType="SIGN_IN"
            schema={SignInSchema}
            defaultValues={{
              email: "",
              password: "",
            }}
            onSubmit={onSubmitFunction}
          />
        );

        const emailInput = screen.getByLabelText("Email Address");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", {
          name: "Sign In",
        });

        await user.type(emailInput, "seaph@gmail.com");
        await user.type(passwordInput, "123456");
        await user.click(submitButton);
        expect(screen.getByText("Signing In...")).toBeInTheDocument();
        expect(onSubmitFunction).toHaveBeenCalledWith({
          email: "seaph@gmail.com",
          password: "123456",
        });
      });
    });

    describe("Success", () => {});
  });

  describe("Sign Up Form", () => {
    describe("Rendering", () => {
      it("Should Render All Elements Correclty", () => {
        render(
          <AuthForm
            schema={SignUpSchema}
            defaultValues={{
              username: "",
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
            formType={"SIGN_UP"}
          />
        );
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(
          screen.getByRole("button", {
            name: "Sign Up",
          })
        ).toBeInTheDocument();
      });
    });

    describe("Form Validation", () => {
      it("Should Show erros on all fields for submition attempt of valid data", async () => {
        render(
          <AuthForm
            schema={SignUpSchema}
            defaultValues={{
              username: "",
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
            formType={"SIGN_UP"}
          />
        );

        const userNameInput = screen.getByLabelText("Username");
        const nameInput = screen.getByLabelText("Name");
        const emailInput = screen.getByLabelText("Email Address");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", {
          name: "Sign Up",
        });

        await user.type(userNameInput, "@username");
        await user.type(nameInput, "Abdifitah");
        await user.type(emailInput, "invalid@valid");
        await user.type(passwordInput, "1234");
        await user.click(submitButton);

        expect(
          screen.queryByText(
            "Username can only contain letters, numbers, and underscores."
          )
        ).toBeInTheDocument();
        expect(
          screen.queryByText("Please provide a valid email address.")
        ).toBeInTheDocument();
        expect(
          screen.queryByText("Password must be at least 6 characters long.")
        ).toBeInTheDocument();

        expect(onSubmit).not.toHaveBeenCalled();

        // clear the fiels and test the required fields. and triggers the
        // the required fiels.
        await user.clear(userNameInput);
        await user.clear(emailInput);
        await user.clear(passwordInput);
        await user.clear(nameInput);

        expect(
          screen.queryByText("Username must be at least 3 characters long.")
        ).toBeInTheDocument();
        expect(screen.queryByText("Name is required.")).toBeInTheDocument();
        expect(screen.queryByText("Email is required.")).toBeInTheDocument();
        expect(
          screen.queryByText("Password must be at least 6 characters long.")
        ).toBeInTheDocument();
      });
      it("Should show error on weak password", async () => {
        render(
          <AuthForm
            schema={SignUpSchema}
            defaultValues={{
              username: "",
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
            formType={"SIGN_UP"}
          />
        );

        // get all fields
        const usernameInput = screen.getByLabelText("Username");
        const nameInput = screen.getByLabelText("Name");
        const emailInput = screen.getByLabelText("Email Address");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", { name: "Sign Up" });

        // type/give correct data to tall fields except password
        await user.type(usernameInput, "Abdifitah");
        await user.type(nameInput, "Abdifitah");
        await user.type(emailInput, "seaph@gmail.com");
        await user.type(passwordInput, "1234567");
        await user.click(submitButton);

        expect(
          screen.queryByText(
            "Password must contain at least one uppercase letter."
          )
        ).toBeInTheDocument();

        // clear the password fields  type password
        // with one upperacse to test
        // the requirement of lowercase
        await user.clear(passwordInput);
        await user.type(passwordInput, "1234567S");
        expect(
          screen.queryByText(
            "Password must contain at least one lowercase letter."
          )
        );

        // finally clear for
        await user.clear(passwordInput);
        await user.type(passwordInput, "123456Ss");
        expect(
          screen.queryByText(
            "Password must contain at least one special character."
          )
        );

        expect(onSubmit).not.toHaveBeenCalled();
      });
    });
  });
});
