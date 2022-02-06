import {create} from 'tailwind-rn';
import styles from './styles.json'; // tailwind-rnで生成されたスタイル

const {tailwind, getColor} = create({...styles});
export {tailwind, getColor};
