import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import "./style.css";

type Props = {
  handleNext: () => void;
  handlePrev: () => void;
};

export const SliderBtn = ({ handleNext, handlePrev }: Props) => {
  return (
    <>
      <div className="slider__btn --next">
        <Button variant="default" size={"icon"} onClick={handleNext}>
          <ChevronRight />
        </Button>
      </div>

      <div className="slider__btn --prev">
        <Button variant="default" size={"icon"} onClick={handlePrev}>
          <ChevronLeft />
        </Button>
      </div>
    </>
  );
};
