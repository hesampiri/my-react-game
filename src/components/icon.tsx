export const Icon = ({ value }: { value: string }) => {
  if (value === "x") return <img src="/public/iconx.svg" alt="x" />;
  else if (value === "o") return <img src="/public/Icon0.svg" alt="0" />;
  else return null;
};
