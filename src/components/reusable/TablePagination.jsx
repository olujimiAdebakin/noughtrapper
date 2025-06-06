 "use client"

import { Pagination } from "@nextui-org/react";



export default function TablePagination() {
   
    return (
      <>
        <Pagination
          loop
          showControls
          color="success"
          initialPage={1}
          total={5}
          classNames={{
            wrapper: "gap-0 overflow-visible h-7 rounded-md border border-divider",
            item: "w-8 h-5 text-small rounded-md bg-gray",
            cursor:
              "bg-gradient-to-b shadow-lg from-default-500 to-default-600 dark:from-default-300 dark:to-default-100 text-white font-bold",
          }}
        />
      </>
    );
}