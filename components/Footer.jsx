import { Box } from '@chakra-ui/layout';

const getCurrentYear = () => {
    return new Date().getFullYear();
};

const Footer = () => (

  <Box textAlign='center' p='5' color='gray.600' borderTop='1px' borderColor='gray.100'>
    © {getCurrentYear()} Elena, Inc.
  </Box>
);

export default Footer;