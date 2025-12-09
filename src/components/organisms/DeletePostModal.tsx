import { Button } from "@/components/atoms"

interface DeletePostModalProps {
  isOpen: boolean
  postTitle: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

const DeletePostModal = ({
  isOpen,
  postTitle,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeletePostModalProps) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="animate-fade-in mx-auto w-full max-w-md rounded-3xl bg-card p-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-semibold text-primary">{postTitle}</h2>
        <p className="mb-8 text-foreground">
          Are you sure you want to delete this post?
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeletePostModal
