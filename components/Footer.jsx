import { Box } from '@chakra-ui/layout';

const getCurrentYear = () => {
    return new Date().getFullYear();
};

const Footer = () => (

  <Box textAlign='center' p='5' color='purple.800' borderTop='1px' borderColor='purple.100'>
    © {getCurrentYear()} Elena Sunshine, Inc.
  </Box>
);

export default Footer;