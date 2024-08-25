import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton,
  styled
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const StyledFooter = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to right, #9333ea, #4f46e5)',
  color: theme.palette.common.white,
  boxShadow: theme.shadows[4],
  padding: theme.spacing(8, 0),
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: '-0.025em',
  fontSize: '1.875rem',
  '& .tech': {
    color: '#ffffff',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  '& .care': {
    color: '#000000',
    textShadow: '0 1px 2px rgba(255, 255, 255, 0.1)',
  },
}));

const QuickLink = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[300],
  '&:hover': {
    color: theme.palette.common.white,
  },
  transition: 'color 300ms ease-in-out',
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[300],
  '&:hover': {
    color: theme.palette.common.white,
  },
  transition: 'color 300ms ease-in-out',
}));

const Footer = () => {
  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <LogoText variant="h4">
              <span className="tech">Tech</span>
              <span className="care">Care</span>
            </LogoText>
            <Typography variant="body2" color="grey.300">
              Providing top-notch tech support and care for all your devices.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="600" mb={2}>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', padding: 0, m: 0 }}>
              {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
                <Box component="li" key={item} mb={1}>
                  <QuickLink href="#" underline="none">{item}</QuickLink>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="600" mb={2}>
              Contact Us
            </Typography>
            <Typography variant="body2" color="grey.300">123 Tech Street, Digital City</Typography>
            <Typography variant="body2" color="grey.300">Phone: (123) 456-7890</Typography>
            <Typography variant="body2" color="grey.300">Email: info@techcare.com</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="600" mb={2}>
              Follow Us
            </Typography>
            <Box>
              <SocialIcon aria-label="facebook">
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon aria-label="twitter">
                <TwitterIcon />
              </SocialIcon>
              <SocialIcon aria-label="instagram">
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon aria-label="linkedin">
                <LinkedInIcon />
              </SocialIcon>
            </Box>
          </Grid>
        </Grid>
        <Box mt={8} pt={3} textAlign="center" borderTop={1} borderColor="grey.700">
          <Typography variant="body2" color="grey.300">
            &copy; 2024 TechCare. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;




