import React, {useState, useEffect, useRef} from 'react'
import { Box, useTheme, Typography, styled } from '@mui/material';
// import { Image } from 'mui-image'

const UserImage = styled('img')({
  borderRadius: "50%",
  height: 125,
  width: 125,
  objectFit: "cover",
})

function TestimonialsCarousel() {

    const theme = useTheme()

    const testimonialsData = [
          {
            id: 1,
    name: "John Lively",
    position: "Artist",
    photo:
      "/images/testimonial/john.jpg",
    text:
      "Using FaithFlow has truly transformed my spiritual journey. It helps me stay consistent in my daily prayer and Bible reading. This app has become my faithful companion on my path of faith."
  },
  {
    id: 2,
    name: "Sarah Smith",
    position: "Marketing Manager",
    photo: "/images/testimonial/sarah.jpg",
    text:
      "FaithFlow has been a game-changer for me. It keeps me accountable in attending church services regularly. Now, I never miss a Sunday worship, and it has brought immense joy and growth to my spiritual life."
  },
  {
    id: 3,
    name: "David Thompson",
    position: "CEO",
    photo: "/images/testimonial/david.jpg",
    text:
      "As a busy professional, I struggled to find time for Bible study. FaithFlow has made it effortless for me. The habit tracking feature motivates me to Boxe deeper into God's Word every day. I am grateful for this powerful tool."
  },
  {
    id: 4,
    name: "Amy Lane",
    position: "Esthetician",
    photo: "/images/testimonial/amy.jpg",
    text:
      "FaithFlow has helped me cultivate a spirit of gratitude in my daily life. The habit of journaling my blessings has made me more appreciative of God's goodness. I can't imagine my day without using FaithFlow."
  },
  {
    id: 5,
    name: "Joseph Harren",
    position: "Fitness Trainer",
    photo: "/images/testimonial/joseph.jpg",
    text:
      "Volunteering is an integral part of my Christian journey, and FaithFlow has made it easier to find and engage in meaningful service opportunities. This app has empowered me to make a difference in my community."
  },
  {
    id: 6,
    name: "Milan Rue",
    position: "Model",
    photo:
      "/images/testimonial/milan.jpg",
    text:
      "With FaithFlow, I've established a consistent habit of fasting and reflection. It has deepened my connection with God and brought clarity to my spiritual life. I highly recommend FaithFlow to anyone seeking spiritual growth."
  },
  {
    id: 7,
    name: "Jay Willis",
    position: "Director",
    photo: "/images/testimonial/jay.jpg",
    text:
      "FaithFlow has become my personal spiritual coach. The habit tracking keeps me focused on my faith goals. This app has truly enhanced my Christian walk, and I can't imagine my life without it."
  }
];

const [index, setIndex] = useState(0);
const delay = 5000;

  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

 useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);


    return (
        <>
       <Box
       sx={{
        backgroundColor: theme.palette.darkGraySecondary.main,
  borderRadius: "15px",
  padding: "20px 25px",
  maxWidth: "768px",
  position: "relative",
       }}>

        {testimonialsData.map((testimonial, idx) => (
            <Box
            key={testimonial.id} 
            sx={{
                display: idx === index ? 'block' : 'none'
            }}
            >
 <Typography component='p' variant="h6"
 
 sx={{
  color: theme.palette.beigePrimary.main,
 }}
 >
{testimonial.text}
  </Typography>

  <Box 
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0.5rem 0",
  }}
 >

    <UserImage src={testimonial.photo} alt="user" />
    <Box 
    sx={{
      marginLeft: "10px",
    }}
  >
      <Typography component='p' variant="h6"
      sx={{
        margin: 0,
        color: theme.palette.whitePrimary.main,
      }}
      >{testimonial.name}</Typography>
      <Typography variant="body2"
      sx={{
        margin: "5px 0",
        color: theme.palette.beigePrimary.main,
      }}
      >{testimonial.position}</Typography>

    </Box>     
  </Box>
  </Box>
  ))}

  <Box 
  sx={{
    textAlign: "center",
  }}
>
        {testimonialsData.map((_, idx) => (
          <Box
          sx={{
            display: "inline-block",
  height: "10px",
  width: "10px",
  borderRadius: "50%",

  cursor: "pointer",
  margin: "15px 7px 0px",

  backgroundColor: index === idx ? "#0E133C" : "#c4c4c4",
          }}
            key={idx}
            onClick={() => {
              setIndex(idx);
            }}
          ></Box>
        ))}
      </Box>
</Box>
</>
    )
}

export default TestimonialsCarousel