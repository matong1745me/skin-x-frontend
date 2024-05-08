import { useCallback, useState, useMemo } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Input, Tooltip, Button} from "@nextui-org/react";
import { useGetPosts } from "@/api/post";
import { EyeIcon } from '@/components/icons/EyeIcon';
import { useRouter } from 'next/router';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { Post } from '@/types/post';

export default function Posts() {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState('')
  const [sortDescriptor, setSortDescriptor] = useState({
    "column": "postedAt",
    "direction": "descending"
  })

  const router = useRouter()


  const sortBy = sortDescriptor.column
  const order = sortDescriptor.direction === 'ascending' ? 'ASC' : 'DESC'

  const {data, isLoading } = useGetPosts(search, page, rowsPerPage, sortBy, order, tags)
  
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

  const renderCell = useCallback((post: Post, columnKey: string) => {
    const cellValue = post[columnKey as keyof Post];
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon onClick={() => router.push(`/posts/${post.id}/view`)}/>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [router]);

  const goToNewPostPage = useCallback(() => {
    router.push('/posts/new')
  }, [router])

  return (
    <div className="min-h-screen p-10">
      <div className="flex justify-between items-center my-2">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search..."
          value={search}
          onClear={() => onClear()}
          onValueChange={setSearch}
          startContent={<SearchIcon/>}
        />
        <Button color='primary' onClick={goToNewPostPage}>
          New
        </Button>
      </div>
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
          <TableColumn key="actions" allowsSorting>{''}</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.posts ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
          emptyContent={"No post to display."}
        >
          {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
        </TableBody>
      </Table>
    </div>
  );
}
