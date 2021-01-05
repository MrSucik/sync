import { Box } from "@material-ui/core";

const Container: React.FC = ({ children }) => {
  return (
    <Box
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        backgroundColor: "rgb(62, 137, 124)",
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
