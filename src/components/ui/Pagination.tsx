import { Dispatch, SetStateAction } from "react";
import { Button } from "./button";
import { Icon } from "@iconify/react";

interface Iprops {
  currentPage: number;
  totalPages: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ currentPage, totalPages, setPageNumber }: Iprops) => {
  const startPage = currentPage - 3 > 1 ? (currentPage + 3 < totalPages ? currentPage - 3 : totalPages - 6) : 1;
  const pagesArray = Array.from({ length: 7 }, (_, i) => startPage + i);
  return (
    <div className="w-full flex items-center justify-center mt-4">
      <Button variant="link" size="icon" disabled={currentPage === 1} onClick={() => setPageNumber(1)}>
        <Icon icon="lucide:chevrons-left" className="h-4 w-4" />
      </Button>
      <Button variant="link" size="icon" disabled={currentPage === 1} onClick={() => setPageNumber((prev) => prev - 1)}>
        <Icon icon="lucide:chevron-left" className="h-4 w-4" />
      </Button>
      {startPage !== 1 && <span className="text-neutral-400">...</span>}
      {pagesArray.map((e) => (
        <Button
          key={e}
          className={(e === currentPage ? "text-black dark:text-white" : "text-neutral-400") + " px-2 md:px-4"}
          variant="link"
          onClick={() => setPageNumber(e)}
        >
          {e}
        </Button>
      ))}
      {startPage + 7 <= totalPages && <span className="text-neutral-400">...</span>}
      <Button
        variant="link"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => setPageNumber((prev) => prev + 1)}
      >
        <Icon icon="lucide:chevron-right" className="h-4 w-4" />
      </Button>
      <Button
        variant="link"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => setPageNumber(totalPages)}
      >
        <Icon icon="lucide:chevrons-right" className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
