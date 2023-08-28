import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IphoneMockup from "./IphoneMockup";
import MacbookMockup from "./MacbookMockup";

const DraggableContainer = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <MacbookMockup />
      <IphoneMockup />
    </DndProvider>
  );
};

export default DraggableContainer;
