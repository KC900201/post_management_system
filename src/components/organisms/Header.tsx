import { useNavigate } from "react-router-dom"

import { Button } from "@/components/atoms"
import { useAuth } from "@/contexts/AuthContext"
import { logout } from "@/lib/auth"

interface HeaderProps {
  showAddPost?: boolean
  showBack?: boolean
}

const Header = ({ showAddPost = false, showBack = false }: HeaderProps) => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="mb-6 flex items-center justify-between px-4 md:px-0">
      <div>
        {showBack && (
          <Button variant="primary" size="sm" onClick={() => navigate(-1)}>
            Back
          </Button>
        )}
        {showAddPost && (
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              navigate("/posts", { state: { openAddModal: true } })
            }
          >
            Add New Post
          </Button>
        )}
      </div>

      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="font-medium text-destructive transition-colors duration-200 hover:text-destructive/80"
        >
          Logout
        </button>
      )}
    </header>
  )
}

export default Header
