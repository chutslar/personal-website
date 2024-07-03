import { Box } from "@mui/material";

export default function ParagraphsFromText(props: { text: string }) {
  return (
    <Box>
      {props.text.split("<br/>").map((t, j) => (
        <p key={j}>{t}</p>
      ))}
    </Box>
  );
}
