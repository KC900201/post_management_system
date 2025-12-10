import { useFormik } from "formik"
import React, { useLayoutEffect, useState } from "react"
import * as Yup from "yup"

import { Button } from "@/components/atoms"
import { FormField, TagInput, TextAreaField } from "@/components/molecules"

interface PostFormModalProps {
  isOpen: boolean
  mode: "add" | "edit"
  initialData?: {
    title: string
    content: string
    tags: string[]
  }
  onSubmit: (values: { title: string; content: string; tags: string[] }) => void
  onCancel: () => void
  isLoading?: boolean
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Title must be less than 100 characters"),
  content: Yup.string()
    .required("Content is required")
    .max(5000, "Content must be less than 5000 characters"),
  tagsInput: Yup.string(),
})

const PostFormModal = ({
  isOpen,
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: PostFormModalProps) => {
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])

  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      tagsInput: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        title: values.title,
        content: values.content,
        tags,
      })
    },
    enableReinitialize: true,
  })

  useLayoutEffect(() => {
    // Schedule the state update to avoid cascading renders
    setTags(initialData?.tags || [])
  }, [initialData, isOpen])

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const value = formik.values.tagsInput.trim()
      if (value && !tags.includes(value)) {
        setTags([...tags, value])
        formik.setFieldValue("tagsInput", "")
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="animate-fade-in mx-auto w-full max-w-lg rounded-3xl bg-card p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">
          {mode === "add" ? "Add A Post" : "Edit Post"}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Title */}
          <FormField
            id="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.title}
            touched={formik.touched.title}
          />

          {/* Content */}
          <TextAreaField
            id="content"
            label="Content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.content}
            touched={formik.touched.content}
            rows={4}
          />

          {/* Tag Input */}
          <TagInput
            id="tagsInput"
            label="Tags"
            tags={tags}
            inputValue={formik.values.tagsInput}
            onInputChange={formik.handleChange}
            onKeyDown={handleTagKeyDown}
            onRemoveTag={removeTag}
          />

          {/* Submit and Cancel buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isLoading}
              className="min-w-[100px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? "Saving..." : mode === "add" ? "Add" : "Edit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostFormModal
