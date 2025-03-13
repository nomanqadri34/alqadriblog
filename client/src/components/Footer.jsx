import { Footer } from 'flowbite-react';
import { BsInstagram, BsGithub, BsLinkedin, BsTwitterX } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className="border-t-8 border-teal-500 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-7xl mx-auto py-4 px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          
          {/* Copyright */}
          <Footer.Copyright 
            href="#" 
            by=" القادری بلاگ" 
            year={new Date().getFullYear()} 
            className="text-gray-600 dark:text-gray-300"
          />
          
          {/* Social Media Icons */}
          <div className="flex gap-5 mt-3 sm:mt-0">
            <Footer.Icon href="https://www.linkedin.com/in/mohd-noman-qadri-6937721b6/" icon={BsLinkedin} />
            <Footer.Icon href="https://www.instagram.com/noman_qadri_" icon={BsInstagram} />
            <Footer.Icon href="https://github.com/nomanqadri34" icon={BsGithub} />
            <Footer.Icon href="https://x.com/nomanqadri34" icon={BsTwitterX} />
          </div>
        
        </div>
      </div>
    </Footer>
  );
}

