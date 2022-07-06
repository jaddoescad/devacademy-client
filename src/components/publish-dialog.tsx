import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useToast } from '@chakra-ui/react'

import React from "react";
import { publishCourse } from "src/services/firestore";

export function AlertPublishDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast()

  return (
    <>
      <Button mt="5" colorScheme="green" onClick={onOpen}>
        Publish Course
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Publish Course
            </AlertDialogHeader>

            <AlertDialogBody>
              {" Are you sure you would like to publish the course?"}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="green"
                onClick={() => {
                  publishCourse(router.query.courseid).then(() => {
                    onClose()
                    toast({
                      title: "Success! Your course has been published",
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    })
                  }).catch((error) => {
                    onClose()
                    toast({
                      title: error,
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                    })
                  });
                }}
                ml={3}
              >
                Publish
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
