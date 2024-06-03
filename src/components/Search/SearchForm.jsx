import React, { useState, useEffect } from 'react';

import {
    InputGroup,
    InputLeftElement,
    Input,
    Select,
    Box,
    List,
    ListItem,
    useDisclosure,
    Drawer ,DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
import ProfileSearchComponents from '../ProfileSearchComponents';

function SearchForm() {
    const [input, setInput] = useState('');
    const [feedType, setFeedType] = useState('PROFILES');
    const [results, setResults] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const openSearch = () => {
        onOpen();
    }


    useEffect(() => {
        if (input.length > 2) {
            const fetchData = async () => {
                const token = localStorage.getItem('token');  
                const headers = {
                    Authorization: `Bearer ${token}`  
                };

                try {
                    const response = await axios.get(`http://localhost:8080/feed`, {
                        params: {
                            feedType: feedType,
                            value: input,
                            offset: 0,
                            limit: 10
                        },
                        headers: headers  
                    });
                    setResults(response.data._embedded.profileList);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                    setResults([]);  
                }
            };
            fetchData();
        } else {
            setResults([]);  
        }
    }, [input, feedType]);

    return (
        <>
        <Box>
            <InputGroup onClick={openSearch}>
                <InputLeftElement  cursor="pointer">
                    <AiOutlineSearch />
                </InputLeftElement>
                <Input
                cursor="pointer"
                    type="text"
                    placeholder="Search..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    readOnly
                />
            </InputGroup>
        </Box>

<Drawer placement={'top'} onClose={onClose} isOpen={isOpen}>
<DrawerOverlay />
<DrawerContent>
  <DrawerHeader borderBottomWidth='1px'>
  <InputGroup onClick={openSearch}>
                <InputLeftElement pointerEvents="none">
                    <AiOutlineSearch />
                </InputLeftElement>
                <Input
                    type="text"
                    placeholder="Search..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </InputGroup>
            <Select mt={2} value={feedType} onChange={(e) => setFeedType(e.target.value)}>
                <option value="PROFILES">Profiles</option>
                <option value="TOPIC">Topic</option>
            </Select>
  </DrawerHeader>
  <DrawerBody>
  

  <List spacing={3} mt={4}>
    {results.map((item, index) => (
        <ListItem key={index} paddingX="4" paddingY="2" boxShadow="md" borderRadius="md">
            <ProfileSearchComponents
                name={item.name}  
                profession={item.profession || 'No profession'} 
                avatarUrl={item.profilePic?.fileUrl}
                username={item.username}
            />
        </ListItem>
    ))}
</List>

  </DrawerBody>
</DrawerContent>
</Drawer>
</>




    );
}

export default SearchForm;
