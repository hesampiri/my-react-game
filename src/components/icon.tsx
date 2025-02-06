import iconX from '../../public/iconx.svg'
import iconO from '../../public/Icon0.svg'
export const Icon = ({ value }: { value: string }) => {
  if (value === "x") return <img src={iconX} alt="x" />;
  else if (value === "o") return <img src={iconO} alt="0" />;
  else return null;
};
