type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className=" bg-indigo-300 h-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default layout;
