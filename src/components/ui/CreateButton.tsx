import Button from "@mui/material/Button";

function CreateButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  return (
    <Button
      type="submit"
      variant="outlined"
      size="small"
      sx={{ borderRadius: 8 }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default CreateButton;
