import {
  Container,
  Stack,
  Heading,
  Text,
  Button
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Container maxW={'7xl'} centerContent align={'center'}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
        justify={'center'}
        textAlign={'center'}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }} align={'center'}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            
            
            <Text as={'span'} color={'blue.400'}>
              Page Not Found!
            </Text>
            <br />
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              404 
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            The page you are looking for does not exist. Please check the URL or go back to the homepage.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}>
            <Button
            onClick={() => navigate("/home")}
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'red'}
              bg={'blue.400'}
              _hover={{ bg: 'blue.600' }}>
              Home Page
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
