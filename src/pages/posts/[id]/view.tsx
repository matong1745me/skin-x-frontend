import { useGetPostById } from "@/api/post"
import PageSkeleton from "@/components/PageSkeleton"
import BackIcon from "@/components/icons/BackIcon"
import { Button, Chip, Card, Avatar, CardFooter, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { useParams, useRouter } from "next/navigation"

export default function PostView() {

  const params = useParams<{ id: string | '' }>()
  const router = useRouter()

  const {data , isLoading } = useGetPostById(params?.id)

  if (isLoading) {
    return <PageSkeleton />
  }

  const goBack = () => {
    router.back()
  }

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <Button variant="light" color="primary" className="mr-auto" onClick={goBack}>
        <BackIcon/> Back
      </Button>
      <Card className="max-w-[800px] min-w-[50%]">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src="/assets/skin-x.jpeg" color="primary" />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">{data?.postedBy}</h4>
              <h5 className="text-small tracking-tight text-default-400">{data?.postedAt}</h5>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0">
          <p className="text-lg"><strong>{data?.title}</strong></p>
          <Divider className="my-1"/>
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.content}} />
          </div>
        </CardBody>
        <CardFooter className="gap-3">
          {
            data?.tags.map((tag, index) => {
              return <Chip key={index} color="primary">{tag}</Chip>
            })
          }
        </CardFooter>
      </Card>
    </div>
  )
}
