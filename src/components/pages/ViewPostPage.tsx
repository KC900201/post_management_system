import React from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Button, Tag } from "@/components/atoms"
import { DashboardTemplate } from "@/components/templates"
import { postsApi } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

const ViewPostPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => postsApi.getById(Number(id)),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading post...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-destructive">Post not found</p>
          <Button
            variant="primary"
            onClick={() => navigate("/posts")}
            className="max-w-xs"
          >
            Back to Posts
          </Button>
        </div>
      </div>
    )
  }

  return (
    <DashboardTemplate showBack maxWidth="4xl">
      <h1 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
        View Post
      </h1>

      <article className="rounded-3xl bg-card p-6 shadow-sm md:p-10">
        <h2 className="mb-6 text-xl font-bold text-foreground md:text-2xl">
          {post.title}
        </h2>

        <div className="whitesapce-pre-line mb-6 leading-relaxed text-muted-foreground">
          {post.content}
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </article>
    </DashboardTemplate>
  )
}

export default ViewPostPage
