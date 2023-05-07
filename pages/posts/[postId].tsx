import Form from '@/components/Form'
import Header from '@/components/Header'
import CommentFeed from '@/components/posts/CommentFeed'
import PostItem from '@/components/posts/PostItem'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/router'
import { MoonLoader } from 'react-spinners'

const PostView = () => {
  const router = useRouter()
  const { postId } = router.query

  const { data: fetchedPost, isLoading } = usePost(postId as string)

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <MoonLoader
          color="lightblue"
          size={50}
          speedMultiplier={0.75}
        />
      </div>
    )
  }

  return (
    <div>
      <Header
        label="Tweet"
        showBackArrow
      />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </div>
  )
}

export default PostView
