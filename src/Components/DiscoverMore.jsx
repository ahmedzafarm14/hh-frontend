import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Container,
} from "@mui/material";
import image1 from "../Assets/Images/Rectangle 6709.svg";
import image2 from "../Assets/Images/Rectangle1.svg";
import image3 from "../Assets/Images/Rectangle2.svg";
import image4 from "../Assets/Images/Rectangle3.svg";
import Button from "../Components/Button";
import { PrimaryColor, BackgroundColor } from "../Theme/ColorBoilerplate";
import Typography from "../Theme/Typography";

export default function DiscoverMore() {
  const hotels = [
    {
      id: 1,
      name: "The Colony Hotel",
      image: image1,
      description:
        "Experience comfort and luxury with personalized service, prime locations, and breathtaking views – where unforgettable memories are made.",
    },
    {
      id: 2,
      name: "The Urban Nest",
      image: image2,
      description:
        "Experience comfort and luxury with personalized service, prime locations, and breathtaking views – where unforgettable memories are made.",
    },
    {
      id: 3,
      name: "The Urban Nest",
      image: image3,
      description:
        "Experience comfort and luxury with personalized service, prime locations, and breathtaking views – where unforgettable memories are made.",
    },
    {
      id: 4,
      name: "The Urban Nest",
      image: image4,
      description:
        "Experience comfort and luxury with personalized service, prime locations, and breathtaking views – where unforgettable memories are made.",
    },
    {
      id: 5,
      name: "The Urban Nest",
      image: image1,
      description:
        "Experience comfort and luxury with personalized service, prime locations, and breathtaking views – where unforgettable memories are made.",
    },
    {
      id: 6,
      name: "The Urban Nest",
      image: image2,
      description:
        "Experience comfort and luxury with personalized service, prime locations, and breathtaking views – where unforgettable memories are made.",
    },
    // Additional hotel data
  ];

  return (
    <div className="md:py-4 py-6">
      <Container maxWidth="lg">
        <div className="mx-auto">
          <div className="flex justify-center items-center flex-col mb-8">
            <Typography
              variant={"h1"}
              className="text-BackgroundColor font-bold mb-4"
            >
              Discover More
            </Typography>
            <Typography
              variant={"body1"}
              className="text-AccentColor3 text-center max-w-[260px]"
            >
              Explore exclusive promotions and limited-time offers tailored just
              for you.
            </Typography>
          </div>

          <div className="grid lg:grid-cols-2 xxm:grid-cols-1 grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <Card
                key={hotel.id}
                className="group relative overflow-hidden rounded-2xl bg-transparent"
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={hotel.image}
                    alt={hotel.name}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                  <CardContent className="p-6 absolute bottom-0 left-0 right-0 text-white">
                    <Typography
                      variant={"h6"}
                      component="div"
                      className="font-semibold mb-2"
                    >
                      {hotel.name}
                    </Typography>

                    <div className="flex justify-between items-end">
                      <Typography
                        variant={"body3"}
                        color="textSecondary"
                        className="text-LightBackground"
                      >
                        {hotel.description}
                      </Typography>
                      <Button
                        type="submit"
                        height="34px"
                        width="34px"
                        startIcon={<ArrowOutwardIcon fontSize="small" />}
                        customColor={BackgroundColor}
                        bgColor={PrimaryColor}
                        className="rounded-full h-auto md:text-sm border-none flex justify-center items-center"
                      />
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
