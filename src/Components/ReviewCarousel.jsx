// import { useState } from "react";
import { Card, IconButton, Rating } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Typography from "../Theme/Typography";

export default function TestimonialCarousel() {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
  //   );
  // };

  return (
    <div className="pt-12">
      <div className="mx-auto max-w-5xl">
        <Typography
          variant={"h2"}
          className="mb-6 text-center font-bold text-BackgroundColor"
        >
          HAPPY & SATISFIED
        </Typography>

        <div className="relative flex justify-center items-center overflow-hidden">
          <IconButton
            // onClick={prevSlide}
            className="absolute left-0 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="text-PrimaryColor bg-BackgroundColor rounded-full" />
          </IconButton>

          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={
                {
                  // transform: `translateX(-${currentIndex * 100}%)`,
                }
              }
            >
              {/* {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-full flex justify-center"
                >
                  <Card className="w-4/5 xxs:w-full bg-BackgroundColor shadow-lg mx-4">
                    <div className="p-4">
                      <div className="flex justify-start items-center flex-row gap-4 sm:flex-col">
                        <img
                          className="h-32 w-32 rounded-md"
                          src={testimonial.image}
                          alt={testimonial.name}
                        />
                        <div className="flex-1">
                          <div className="mb-2 flex flex-row sm:flex-col items-center justify-between">
                            <Typography
                              variant={"p5"}
                              className="font-semibold"
                            >
                              {testimonial.name}
                            </Typography>
                            <Rating
                              value={testimonial.rating}
                              readOnly
                              size="small"
                              className="text-RatingColor"
                            />
                          </div>
                          <Typography
                            variant={"body1"}
                            className="text-TextColor"
                          >
                            {testimonial.text}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))} */}
            </div>
          </div>

          <IconButton
            // onClick={nextSlide}
            className="absolute right-0 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="text-PrimaryColor bg-white rounded-full" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
