import { Card, CardContent, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Button from "./Button";
import { PrimaryColor, BackgroundColor } from "../Theme/ColorBoilerplate";
import topImage from "../Assets/Images/topimage.svg";
import topImage1 from "../Assets/Images/topimage1.svg";
import topImage2 from "../Assets/Images/topimage2.svg";
import Typography from "../Theme/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export default function Component() {
  const navigate = useNavigate();
  const stats = [
    {
      number: "2+",
      title: "Years of Experience",
      description: "Reliable & proven excellence",
    },
    {
      number: "50+",
      title: "Students Satisfied",
      description: "Enjoy safe & clean environment",
    },
    {
      number: "50+",
      title: "Hostels Available",
      description: "Find your perfect stay today",
    },
  ];

  const hostels = [
    {
      name: "Urban Retreat Hostel",
      location: "College Road, Township Lahore",
      image: topImage,
      rating: 1,
    },
    {
      name: "BackPacker's Haven",
      location: "Valencia, Lahore",
      image: topImage1,
      rating: 3,
    },
    {
      name: "Oasis Lodge",
      location: "Old Anarkali, Lahore",
      image: topImage2,
      rating: 5,
    },
  ];

  return (
    <div className="md:pt-6 pt-8">
      {/* Stats Section */}
      <Container maxWidth="lg">
        <div className="bg-white/10 rounded-full sm:rounded-3xl md:p-4 p-8 mb-12">
          <div className="grid sm:grid-cols-1 grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <Typography
                  variant={"h3"}
                  className="text-BackgroundColor font-bold mb-2"
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant={"h4"}
                  className="text-BackgroundColor font-semibold md:text-base mb-1"
                >
                  {stat.title}
                </Typography>
                <Typography variant={"body1"} className="text-LightBackground">
                  {stat.description}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Listings Section */}
        <div className="mb-12">
          <div className="flex justify-center items-center flex-col">
            <Typography
              variant={"h1"}
              className="mb-4 text-center text-BackgroundColor font-bold"
            >
              Explore Top Listing
            </Typography>
            <Typography
              variant={"body1"}
              className="text-AccentColor3 text-center max-w-72"
            >
              Hostels for Unmatched Comfort and Memorable Experiences
            </Typography>
          </div>
          <div className="flex justify-end items-end mb-4">
            <Button
              text="View All"
              type="submit"
              height="37px"
              width="100%"
              customColor={BackgroundColor}
              bgColor={PrimaryColor}
              className="rounded-md px-5 h-auto border-none"
              onClick={() => navigate("/hostels")}
            />
          </div>
          <div className="grid xxm:grid-cols-1 grid-cols-3 gap-6">
            {hostels.map((hostel, index) => (
              <Card key={index} className="">
                <img
                  src={hostel.image}
                  alt={hostel.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <Typography
                    variant={"h4"}
                    className="md:text-base font-semibold mb-1"
                  >
                    {hostel.name}
                  </Typography>
                  <Typography
                    variant={"h6"}
                    className="text-AccentColor3 md:text-xs mb-2"
                  >
                    {hostel.location}
                  </Typography>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < hostel.rating
                            ? "text-RatingColor"
                            : "text-AccentColor3"
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
                <div className="px-4 pb-4 flex justify-end">
                  <Button
                    text="More Details"
                    type="submit"
                    height="37px"
                    width="140px"
                    startIcon={
                      <ArrowOutwardIcon className="ml-2" fontSize="small" />
                    }
                    customColor={BackgroundColor}
                    bgColor={PrimaryColor}
                    className="rounded-full px-2 h-auto md:text-sm border-none flex justify-center items-center"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
