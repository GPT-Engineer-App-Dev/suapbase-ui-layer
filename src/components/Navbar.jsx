import { Box, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link as={RouterLink} to="/" color="white" px={2}>
            Home
          </Link>
          <Link as={RouterLink} to="/crud" color="white" px={2}>
            CRUD
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;