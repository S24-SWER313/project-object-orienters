import { Flex, Heading, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/react'
import React, { useContext } from 'react'
import useProfileLoading from '../useProfileLoading'
import { SelectedChatContext } from './SelectedChatContext';

function ChatterView() {

    const {selectedChat} =  useContext(SelectedChatContext);

    const {profileData} = useProfileLoading({ profile:  selectedChat.username});

    console.log("selectedChat", selectedChat);
    console.log("profileData", profileData);


    return (
        <Flex h="100%" w="20vw" borderStart="1px solid" borderColor="gray.200" direction="column">
            <Flex h="81px" w="100%" align="center" display='flex' flexDirection='column'  justifyContent="space-between"  p={3}>
               <Heading size="lg">Details</Heading>
            </Flex>

            <Flex align="center" display='flex' flexDirection='column'>
                    <Avatar
                        name={profileData ? profileData.name : 'No Name'}
                        src={profileData?.profilePic?.fileUrl}
                        alt={'Profile picture'}
                        marginEnd={3}
                        css={{
                            border: '2px solid black',
                        }}

                        size='2xl'
                        
                    />
                    <Text fontSize='2em'>{profileData ? profileData.name : 'User'}</Text>

                </Flex>
        </Flex>
    )
}

export default ChatterView
