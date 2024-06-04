import { useState, useEffect } from "react";
import { Box, Button, Container, Text, VStack, Image } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const getSeconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const getMinutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Image src="/images/stopwatch-design.png" alt="Stopwatch Design" boxSize="150px" />
        <Box bg="brand.900" color="brand.600" p={4} borderRadius="md" fontSize="3xl" fontFamily="monospace">
          {formatTime(time)}
        </Box>
        <Button colorScheme={running ? "brand.500" : "brand.800"} onClick={() => setRunning(!running)}>
          {running ? "Stop" : "Start"}
        </Button>
        <Button colorScheme="brand.600" onClick={() => { setTime(0); setRunning(false); }}>
          Reset
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;