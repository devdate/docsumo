import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { api } from "~/utils/api";
import { Skeleton } from "./ui/skeleton";
import Pagination from "./ui/Pagination";

const Categories = () => {
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(1);
  const categories = api.post.getCategories.useQuery(undefined);
  return (
    <div className="flex flex-col gap-4">
      <span className="text-[20px] font-medium">My saved interests!</span>
      {!categories.data &&
        Array.from({ length: 10 }, (_, i) => (
          <div className="flex gap-2" key={i}>
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
        ))}
      {categories.data && (
        <>
          {categories.data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize).map((eachCategory) => (
            <div key={eachCategory.id} className="flex items-center space-x-2">
              <Checkbox id={"category" + eachCategory.id} defaultChecked={eachCategory.selected} />
              <label
                htmlFor={"category" + eachCategory.id}
                className="text-[16px] font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {eachCategory.name}
              </label>
            </div>
          ))}
          <Pagination currentPage={pageNumber} totalPages={pageSize} setPageNumber={setPageNumber} />
        </>
      )}
    </div>
  );
};

export default Categories;
