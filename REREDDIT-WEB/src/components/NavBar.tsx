import React from 'react'
import { Box, Link, Flex, Button } from '@chakra-ui/core';
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from '../generated/graphql';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{data, fetching}] = useMeQuery()
    const [{fetching: lougoutFetshing}, logout] = useLogoutMutation()
    let body = null;

    if (fetching) {  //data loading

    } else if (!data?.me) { //not logged in
        body =(
            <>
                 <NextLink href="/login">
                    <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>Register</Link>
                </NextLink>
            </>
        )
    } else { // logged in
        body = (
            <Flex>
                <Box mr={2}>{`I'm ${data.me.username}`}</Box>
                <Button onClick={() => logout()} isLoading={lougoutFetshing} variant= "link">Logout</Button>
            </Flex>
            ) 
    }

        return (
            <Flex bg="tan" p={4} >
                <Box ml={"auto"}>
                   {body}
                </Box>
            </Flex>
        );
}