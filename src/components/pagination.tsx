import {
    Pagination as ChakraPagination,
    usePagination,
    PaginationPage,
    PaginationNext,
    PaginationPrevious,
    PaginationPageGroup,
    PaginationContainer,
    PaginationSeparator
  } from "@ajna/pagination";
  import { Icon, Select } from "@chakra-ui/react";
  import { ChangeEvent, useEffect, useMemo } from "react";
  import { ChevronLeft, ChevronRight } from "react-feather";
  
  const PAGE_SIZE_OPTIONS = [
    { value: "5", text: "5" },
    { value: "25", text: "25" },
    { value: "50", text: "50" },
    { value: "ALL", text: "All" }
  ];
  
  export type PaginationProps = {
    total: number;
    pageSize: number;
    value?: number;
    isHidden?: boolean;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
  };
  
  const Pagination = ({
    total,
    pageSize,
    isHidden = false,
    hasNextPage = false,
    hasPreviousPage = false,
    onPageChange,
    onPageSizeChange,
    value = 1
  }: PaginationProps): JSX.Element => {
    console.warn(
      `Re-rendering Pagination, value: ${value}, total: ${total}, pageSize: ${pageSize}`
    );
    const totalPages = useMemo(() => {
      return Math.round(total / pageSize) || total;
    }, [total, pageSize]);
  
    const { currentPage, setCurrentPage, pages } = usePagination({
      pagesCount: totalPages,
      initialState: { currentPage: value, pageSize: pageSize },
      limits: {
        outer: 1,
        inner: 2
      }
    });
  
    const handlePageSizeChange = (
      event: ChangeEvent<HTMLSelectElement>
    ): void => {
      const pageSize =
        event.target.value === "ALL" ? total : Number(event.target.value);
      console.log("handlePageSizeChange pageSize:", pageSize);
  
      onPageSizeChange && onPageSizeChange(pageSize);
    };
  
    useEffect(() => {
      console.log("Pagination, currentPage: ", currentPage);
    }, [currentPage]);
  
    const handlePageChange = (nextPage: number): void => {
      // -> request new data using the page number
      console.log("Pagination request nextPage: ", nextPage);
      setCurrentPage(nextPage);
      onPageChange && onPageChange(nextPage);
    };
  
    if (isHidden) return <></>;
  
    return (
      <ChakraPagination
        pagesCount={total}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          position="fixed"
          bottom={5}
          left="50%"
          marginLeft="-250px"
        >
          <PaginationPrevious
            data-testid="previous-button"
            disabled={!hasPreviousPage}
            color="black"
            bg="made.black"
            _hover={{ bg: "made.80" }}
            leftIcon={<Icon as={ChevronLeft} />}
            size="lg"
            onClick={() => console.warn("I'm clicking the previous")}
            mr={1}
          />
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                isDisabled={!hasNextPage && !hasPreviousPage}
                onClick={() => console.warn("I'm clicking the separator")}
                color="black"
                bg="made.black"
                _hover={{ bg: "made.80" }}
                size="lg"
                w={7}
                jumpSize={1}
              />
            }
          >
            {pages.map((page: number) => (
              <PaginationPage
                key={`pagination_page_${page}`}
                page={page}
                onClick={() => console.warn("Im clicking the page")}
                size="lg"
                fontSize="sm"
                w="7"
                _hover={{ bg: "made.80" }}
                _current={{
                  bg: "made.black",
                  fontSize: "sm",
                  color: "black",
                  w: 7
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            data-testid="next-button"
            isDisabled={!hasNextPage}
            onClick={() => console.warn("I'm clicking the next")}
            color="black"
            bg="made.black"
            _hover={{ bg: "made.80" }}
            rightIcon={<Icon as={ChevronRight} />}
            size="lg"
            ml={1}
          />
          {/* <Select
            data-testid="page-size-dropdown"
            onChange={handlePageSizeChange}
            size="lg"
            ml={1}
            value={pageSize === total ? "ALL" : pageSize}
            options={PAGE_SIZE_OPTIONS}
            bg="made.5"
            _hover={{ bg: "made.80" }}
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </Select> */}
        </PaginationContainer>
      </ChakraPagination>
    );
  };
  export default Pagination;
  