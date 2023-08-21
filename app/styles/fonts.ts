import { Montserrat, Lato } from 'next/font/google';

const montserrat = Montserrat({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const lato = Lato({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-lato',
});

export { montserrat, lato };
