import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import colors from "../constants/colors";
import Status from "./Status";
import { Node as NodeType } from "../types/Node";
import { useDispatch, useSelector } from "react-redux";
import { getBlocksForNode } from "../reducers/blocks";

type Props = {
  node: NodeType;
  expanded: boolean;
  toggleNodeExpanded: (node: NodeType) => void;
};

const AccordionRoot = styled(Accordion)({
  margin: "16px 0",
  boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",

  "&:before": {
    backgroundColor: "unset",
  },
});

const AccordionSummaryContainer = styled(AccordionSummary)({
  padding: "0 24px",
  "& .MuiAccordionSummary-content": {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: colors.faded,
  },
});

const BoxSummaryContent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingRight: 20,
});

const Blocks = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor:"#e0e0e0",
  marginTop:3,
  padding:5,
  borderRadius:2
});

const BlocksID = styled(Typography)({
  fontSize: 10,
  display: "block",
  color: colors.blue,
  lineHeight: 1.5,
});

const BlocksText = styled(Typography)({
  fontSize: 17,
  display: "block",
  color: colors.text,
  lineHeight: 1.5,
});

const TypographyHeading = styled(Typography)({
  fontSize: 17,
  display: "block",
  color: colors.text,
  lineHeight: 1.5,
});

const TypographySecondaryHeading = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: colors.faded,
  lineHeight: 2,
}));

const Node: React.FC<Props> = ({ node, expanded, toggleNodeExpanded }) => {
  const dispatch=useDispatch()
  const state=useSelector((state:any)=>state.blocks);
  console.log('State',state)
  return (
    <AccordionRoot
      elevation={3}
      expanded={expanded}
      onChange={() => {
        dispatch(getBlocksForNode(node))
        toggleNodeExpanded(node)
      }}
    >
      <AccordionSummaryContainer expandIcon={<ExpandMoreIcon />}>
        <BoxSummaryContent>
          <Box>
            <TypographyHeading variant="h5">
              {node.name || "Unknown"}
            </TypographyHeading>
            <TypographySecondaryHeading variant="subtitle1">
              {node.url}
            </TypographySecondaryHeading>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </BoxSummaryContent>
      </AccordionSummaryContainer>
      <AccordionDetails>
        {state.isLoading?
                <Typography>Loading ...</Typography>
                :
        state.allBlocks ? state.allBlocks?.data?.map((data:any,id:any)=>(
          <Blocks>
            <BlocksID>
              00{id}
            </BlocksID>
            <BlocksText>
              {data?.attributes?.data}
            </BlocksText>
          </Blocks>
        ))
        :
        <Typography>There is no Blocks</Typography>

      }
      </AccordionDetails>
    </AccordionRoot>
  );
};

export default Node;
