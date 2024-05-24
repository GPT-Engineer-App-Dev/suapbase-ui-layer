import { Box, Flex, Link } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link as={RouterLink} to="/" px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "teal.700" }} color="white">
            Home
          </Link>
          <Link as={RouterLink} to="/crud" px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "teal.700" }} color="white">
            CRUD
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;