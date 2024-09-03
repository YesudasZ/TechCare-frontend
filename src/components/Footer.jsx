// import { 
//   Box, 
//   Container, 
//   Grid, 
//   Typography, 
//   Link, 
//   IconButton,
//   styled
// } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';

// const StyledFooter = styled(Box)(({ theme }) => ({
//   background: 'linear-gradient(to right, #9333ea, #4f46e5)',
//   color: theme.palette.common.white,
//   boxShadow: theme.shadows[4],
//   padding: theme.spacing(8, 0),
// }));

// const LogoText = styled(Typography)(({ theme }) => ({
//   fontWeight: 800,
//   letterSpacing: '-0.025em',
//   fontSize: '1.875rem',
//   '& .tech': {
//     color: '#ffffff',
//     textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
//   },
//   '& .care': {
//     color: '#000000',
//     textShadow: '0 1px 2px rgba(255, 255, 255, 0.1)',
//   },
// }));

// const QuickLink = styled(Link)(({ theme }) => ({
//   color: theme.palette.grey[300],
//   '&:hover': {
//     color: theme.palette.common.white,
//   },
//   transition: 'color 300ms ease-in-out',
// }));

// const SocialIcon = styled(IconButton)(({ theme }) => ({
//   color: theme.palette.grey[300],
//   '&:hover': {
//     color: theme.palette.common.white,
//   },
//   transition: 'color 300ms ease-in-out',
// }));

// const Footer = () => {
//   return (
//     <StyledFooter component="footer">
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={3}>
//             <LogoText variant="h4">
//               <span className="tech">Tech</span>
//               <span className="care">Care</span>
//             </LogoText>
//             <Typography variant="body2" color="grey.300">
//               Providing top-notch tech support and care for all your devices.
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <Typography variant="h6" fontWeight="600" mb={2}>
//               Quick Links
//             </Typography>
//             <Box component="ul" sx={{ listStyle: 'none', padding: 0, m: 0 }}>
//               {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
//                 <Box component="li" key={item} mb={1}>
//                   <QuickLink href="#" underline="none">{item}</QuickLink>
//                 </Box>
//               ))}
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <Typography variant="h6" fontWeight="600" mb={2}>
//               Contact Us
//             </Typography>
//             <Typography variant="body2" color="grey.300">123 Tech Street, Digital City</Typography>
//             <Typography variant="body2" color="grey.300">Phone: (123) 456-7890</Typography>
//             <Typography variant="body2" color="grey.300">Email: info@techcare.com</Typography>
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <Typography variant="h6" fontWeight="600" mb={2}>
//               Follow Us
//             </Typography>
//             <Box>
//               <SocialIcon aria-label="facebook">
//                 <FacebookIcon />
//               </SocialIcon>
//               <SocialIcon aria-label="twitter">
//                 <TwitterIcon />
//               </SocialIcon>
//               <SocialIcon aria-label="instagram">
//                 <InstagramIcon />
//               </SocialIcon>
//               <SocialIcon aria-label="linkedin">
//                 <LinkedInIcon />
//               </SocialIcon>
//             </Box>
//           </Grid>
//         </Grid>
//         <Box mt={8} pt={3} textAlign="center" borderTop={1} borderColor="grey.700">
//           <Typography variant="body2" color="grey.300">
//             &copy; 2024 TechCare. All rights reserved.
//           </Typography>
//         </Box>
//       </Container>
//     </StyledFooter>
//   );
// };

// export default Footer;




// import React from 'react';
// import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div className="space-y-4">
//             <Logo />
//             <p className="text-gray-300 text-sm">
//               Providing top-notch tech support and care for all your devices.
//             </p>
//             <div className="flex space-x-4">
//               <SocialIcon Icon={Facebook} href="#" />
//               <SocialIcon Icon={Twitter} href="#" />
//               <SocialIcon Icon={Instagram} href="#" />
//               <SocialIcon Icon={Linkedin} href="#" />
//             </div>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
//                 <li key={item}>
//                   <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
//                     <ArrowRight className="h-4 w-4 mr-2" />
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//             <address className="text-gray-300 not-italic">
//               <p>123 Tech Street, Digital City</p>
//               <p>Phone: (123) 456-7890</p>
//               <p>Email: info@techcare.com</p>
//             </address>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
//             <p className="text-gray-300 mb-4">Stay updated with our latest news and offers.</p>
//             {/* <form className="flex space-x-2">
//               <Input type="email" placeholder="Your email" className="bg-gray-800 text-white border-gray-700" />
//               <Button type="submit">Subscribe</Button>
//             </form> */}
//           </div>
//         </div>
//         <div className="mt-8 pt-8 border-t border-gray-800 text-center">
//           <p className="text-gray-400 text-sm">
//             &copy; 2024 TechCare. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// const SocialIcon = ({ Icon, href }) => (
//   <a href={href} className="text-gray-400 hover:text-white transition-colors duration-200">
//     <Icon className="h-5 w-5" />
//   </a>
// );

// const Logo = () => (
//   <div className="flex-shrink-0 flex items-center">
//     <svg className="h-8 w-auto" viewBox="0 0 184 32" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M16 8L28 24H4L16 8Z" fill="#60A5FA"/>
//       <path d="M16 24L4 8H28L16 24Z" fill="#2563EB"/>
//       <text x="36" y="24" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="white">Tech</text>
//       <text x="100" y="24" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#60A5FA">Care</text>
//     </svg>
//   </div>
// )

// export default Footer;


import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-400 text-sm">
              Providing top-notch tech support and care for all your devices.
            </p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Facebook} href="#" />
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Instagram} href="#" />
              <SocialIcon Icon={Linkedin} href="#" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic">
              <p>123 Tech Street, Digital City</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@techcare.com</p>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest news and offers.</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2024 TechCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ Icon, href }) => (
  <a href={href} className="text-gray-500 hover:text-white transition-colors duration-200">
    <Icon className="h-5 w-5" />
  </a>
);

const Logo = () => (
  <div className="flex-shrink-0 flex items-center">
    <svg className="h-8 w-auto" viewBox="0 0 184 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8L28 24H4L16 8Z" fill="#4B5563"/>
      <path d="M16 24L4 8H28L16 24Z" fill="#9CA3AF"/>
      <text x="36" y="24" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="white">Tech</text>
      <text x="100" y="24" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#9CA3AF">Care</text>
    </svg>
  </div>
)

export default Footer;
