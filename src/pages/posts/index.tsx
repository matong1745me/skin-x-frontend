import { useCallback, useState, useMemo } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Input, Search} from "@nextui-org/react";
import usePosts from "@/api/post";

export default function Posts() {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState('')
  const [sortDescriptor, setSortDescriptor] = useState({
    "column": "postedBy",
    "direction": "ascending"
})

  const sortBy = sortDescriptor.column
  const order = sortDescriptor.direction === 'ascending' ? 'ASC' : 'DESC'

  const {data, isLoading } = usePosts(search, page, rowsPerPage, sortBy, order, tags)
  
  const pages = useMemo(() => {
    return data?.total ? Math.ceil(data?.total / rowsPerPage) : 0;
  }, [data?.total, rowsPerPage])

  const loadingState = isLoading ? "loading" : "idle";

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, [])

  const onClear = useCallback(()=>{
    setSearch('')
    setPage(1)
  }, [])

  return (
    <div className="min-h-screen p-10">
      <Input
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Search..."
        value={search}
        onClear={() => onClear()}
        onValueChange={setSearch}
      />
      <div className="flex justify-between items-center my-2">
        <span className="text-default-400 text-small">Total {data?.total} posts</span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
      <Table
        aria-label="Example table with client async pagination"
        sortDescriptor={sortDescriptor}
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <TableColumn key="id" allowsSorting>ID</TableColumn>
          <TableColumn key="title" allowsSorting>Title</TableColumn>
          <TableColumn key="postedBy" allowsSorting>Posted By</TableColumn>
          <TableColumn key="postedAt" allowsSorting>Posted At</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.posts ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
          emptyContent={"No post to display."}
        >
          {(item) => (
            <TableRow key={item?.title}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
