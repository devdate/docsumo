import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { EllipsisVertical } from "lucide-react";

const Section = () => {
  const [formData, setFormData] = useState<{ [key: number]: boolean }>();

  const sections = api.section.getSections.useQuery(undefined);
  useEffect(() => {
    if (sections.data?.data.sections) {
      const obj: { [key: number]: boolean } = {};
      sections.data?.data.sections[0]?.children?.map((e) => {
        obj[e.id] = true;
      });

      setFormData(obj);
    }
  }, [sections.isFetched]);
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col">
      <div className="flex-grow flex flex-col min-h-0">
        <span className="text-[20px] font-medium p-4">Fields</span>
        <div className="flex-grow overflow-y-auto">
          <div className="flex  flex-col gap-2">
            {sections.isLoading &&
              Array.from({ length: 7 }, (_, i) => (
                <div className="flex gap-2 bg-slate-100 p-2 h-20 pt-4 mx-4" key={i}>
                  <Skeleton className="w-8 h-8 bg-slate-300" />
                  <Skeleton className="w-48 h-4 bg-slate-300" />
                </div>
              ))}
            {sections.isError && <div> Something Went Wrong! Please try again later</div>}
            {sections.data?.data?.sections &&
              sections.data?.data?.sections[0]?.children?.map((e, i) => (
                <div className=" bg-slate-100 dark:bg-neutral-800 p-2 pt-2 mx-4 rounded-md" key={i}>
                  <div className="flex items-center gap-2">
                    <span className="flex-grow">{e.label}</span>
                    <Checkbox
                      checked={formData && formData[e.id]}
                      onCheckedChange={(checked) => {
                        setFormData((prev) => ({ ...prev, [e.id]: false }));
                      }}
                    />
                    <Button variant="ghost" className="p-0">
                      <EllipsisVertical />
                    </Button>
                  </div>
                  <span>{e.content?.value}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="flex justify-between py-2 px-4">
          <Button
            onClick={() =>
              setFormData((prev) => {
                const newForm = { ...prev };
                Object.keys(newForm).forEach((v) => (newForm[+v] = true));
                return newForm;
              })
            }
          >
            Select All
          </Button>
          <Button>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default Section;
