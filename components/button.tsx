import styled from 'styled-components';
import { motion } from 'framer-motion';

const Button = styled(motion.button)<{ inverse: boolean, variant: string }>`
  text-align: center;
  background-color: ${(props) => {
    if (props.inverse) return '#ded9d1';
    if (props.variant === 'primary') return '#7e705f';
    else return '#252222';
  }};
  color: ${(props) => {
    if (props.inverse) {
      return props.variant === 'primary' ? '#7e705f' : '#252222';
    } else {
      return '#ded9d1';
    }
  }};
  border-radius: 2rem;
  height: 3rem;
  width: 7rem;
  font-family: Inconsolata;
  border: none;
`;

export default Button;