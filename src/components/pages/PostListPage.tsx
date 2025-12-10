import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { Pagination, PostCard, StatCard } from "@/components/molecules"
import {
  DeletePostModal,
  PostFormModal,
  SuccessModal,
} from "@/components/organisms"
import { DashboardTemplate } from "@/components/templates"
import { useAuth } from "@/contexts/AuthContext"
import { postsApi, statsApi } from "@/lib/api"

const PostListPage = () => {
  const location = useLocation()
  const queryClient = useQueryClient()
  const { isAdmin } = useAuth()

  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [selectedPost, setSelectedPost] = useState<{
    id: number
    title: string
    content: string
    tags: string[]
  } | null>(null)

  useEffect(() => {
    if (location.state?.openAddModal) {
      setShowAddModal(true)
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ["posts", currentPage, isAdmin],
    queryFn: () =>
      isAdmin
        ? postsApi.getAll(currentPage, 9)
        : postsApi.getMyPosts(currentPage, 9),
  })

  const { data: statsData } = useQuery({
    queryKey: ["stats"],
    queryFn: statsApi.getStats,
    enabled: isAdmin,
  })

  const createMutation = useMutation({
    mutationFn: (data: { title: string; content: string; tags: string[] }) =>
      postsApi.create(data.title, data.content, data.tags),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      queryClient.invalidateQueries({ queryKey: ["stats"] })
      setShowAddModal(false)
      setSuccessMessage(data.message)
      setShowSuccessModal(true)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: {
      id: number
      title: string
      content: string
      tags: string[]
    }) => postsApi.update(data.id, data.title, data.content, data.tags),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      setShowEditModal(false)
      setSelectedPost(null)
      setSuccessMessage(data.message)
      setShowSuccessModal(true)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => postsApi.delete(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      queryClient.invalidateQueries({ queryKey: ["stats"] })
      setShowDeleteModal(false)
      setSelectedPost(null)
      setSuccessMessage(data.message)
      setShowSuccessModal(true)
    },
  })

  const handleEdit = (id: number) => {
    const post = postsData?.posts.find((p) => p.id === id)
    if (post) {
      setSelectedPost({
        id: post.id,
        title: post.title,
        content: post.body,
        tags: post.tags,
      })
      setShowEditModal(true)
    }
  }

  const handleDelete = (id: number) => {
    const post = postsData?.posts.find((p) => p.id === id)
    if (post) {
      setSelectedPost({
        id: post.id,
        title: post.title,
        content: post.body,
        tags: post.tags,
      })
      setShowDeleteModal(true)
    }
  }

  return (
    <DashboardTemplate showAddPost>
      <h1 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl dark:text-background">
        Post List
      </h1>

      {isAdmin && statsData && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Account"
            value={statsData.totalAccounts}
            variant="red"
          />
          <StatCard
            title="Total Post"
            value={statsData.totalPosts}
            variant="green"
          />
          <StatCard title="My Post" value={statsData.myPosts} variant="amber" />
        </div>
      )}

      {postsLoading ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {postsData?.posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.body}
                tags={post.tags}
                date={post.date}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={postsData?.totalPages || 1}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <PostFormModal
        isOpen={showAddModal}
        mode="add"
        onSubmit={(values) => createMutation.mutate(values)}
        onCancel={() => setShowAddModal(false)}
        isLoading={createMutation.isPending}
      />

      <PostFormModal
        isOpen={showEditModal}
        mode="edit"
        initialData={selectedPost || undefined}
        onSubmit={(values) =>
          selectedPost &&
          updateMutation.mutate({ id: selectedPost.id, ...values })
        }
        onCancel={() => {
          setShowEditModal(false)
          setSelectedPost(null)
        }}
        isLoading={updateMutation.isPending}
      />

      <DeletePostModal
        isOpen={showDeleteModal}
        postTitle={selectedPost?.title || ""}
        onConfirm={() => selectedPost && deleteMutation.mutate(selectedPost.id)}
        onCancel={() => {
          setShowDeleteModal(false)
          setSelectedPost(null)
        }}
        isLoading={deleteMutation.isPending}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        message={successMessage}
        onClose={() => setShowSuccessModal(false)}
      />
    </DashboardTemplate>
  )
}

export default PostListPage
