import { Button } from "@/components/ui/button";
import { fireEvent, render, screen } from "@testing-library/react";

describe('Button Component', () => { 
    it("Should render button with text",()=>{
        render(<Button>Click Me</Button>)
        const button=screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Click Me")
    });

    
     it("Should Call OnClick function when it is clicked ",()=>{
        const onClick=jest.fn();
        render(<Button onClick={onClick}>Click Me</Button>)
        fireEvent.click(screen.getByRole("button"))
        expect(onClick).toHaveBeenCalled()
     })


    it("Should Render the correct given Variant",()=>{
        render(<Button variant={"destructive"}>Click Me</Button>)
        expect(screen.getByText("Click Me")).toHaveClass("bg-red-500")
    });

    it("Should Render the Correct given Attribute ",()=>{
        render(<Button disabled>Click Me</Button>)
        expect(screen.getByText("Click Me")).toHaveAttribute("disabled")
    })

})