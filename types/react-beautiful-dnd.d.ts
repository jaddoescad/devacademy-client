import { DraggableProps } from "react-beautiful-dnd";
 

/**
 * Add the missing validationSchema property to the types
 */
 declare module 'react-beautiful-dnd' {
    interface DraggableProps {
        shouldRespectForceTouch?: boolean;
    }
  
    // interface BaseFieldProps {
    //   validationSchema?: ValidationSchema;
    // }
  }