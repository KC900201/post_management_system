import { useNavigate } from "react-router-dom"

import { Button, Tag } from "@/components/atoms"

interface PostCardProps {
  id: number
  title: string
  content: string
  tags: string[]
  date: string
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const PostCard = ({
  id,
  title,
  content,
  tags,
  date,
  onEdit,
  onDelete,
}: PostCardProps) => {
  const navigate = useNavigate()

  return (
    <article className="animate-slide-up flex h-full flex-col rounded-2xl bg-card p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <p className="mb-2 text-sm text-primary">{date}</p>
      <h3 className="mb-3 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-4 line-clamp-4 grow text-sm text-muted-foreground">
        {content}
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
      <div className="flex gap-2">
        <Button variant="success" size="sm" onClick={() => onEdit(id)}>
          Edit
        </Button>
        <Button
          variant="view"
          size="sm"
          onClick={() => navigate(`/post/${id}`)}
        >
          View
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </div>
    </article>
  )
}

export default PostCard
