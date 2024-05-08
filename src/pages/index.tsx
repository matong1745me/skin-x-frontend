import { Button } from "@nextui-org/react"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()

  const goToMainPage = () => {
    router.push('/posts')
  }
  return (
    <div className="flex flex-col justify-center items-center p-10 bg-x-primary min-h-screen gap-4">
      <p className="text-white text-6xl">
        SKIN X
      </p>
      <Button variant="flat" color="secondary" size="lg" onClick={goToMainPage}>
        GO
      </Button>
    </div>
  )
}
