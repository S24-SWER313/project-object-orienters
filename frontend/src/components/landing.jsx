import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


export default function Landing() {
    const navigate = useNavigate();

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: useBreakpointValue({ base: '20%', md: '30%' }),
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'blue.400',
                                zIndex: -1,
                            }}>
                            TechSpot
                        </Text>
                        <br />{' '}
                        <Text color={'blue.400'} as={'span'}>
                            Where Tech Enthusiasts Meet.
                        </Text>{' '}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        Connect, share, and discover the latest in tech with TechSpot - your community for all things technology.
                    </Text>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                        <Button
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            fontSize="lg"
                            px={8}
                            py={6}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            onClick={() => navigate('/login')}
                        >
                            LOG IN
                        </Button>
                        <Button
                            rounded={'full'}
                            fontSize="lg"
                            px={8}
                            py={6}
                            onClick={() => navigate('/signup')}
                        >
                            SIGN UP
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        '/images/laptop.png'
                    }
                />
            </Flex>
        </Stack>
    );
}
