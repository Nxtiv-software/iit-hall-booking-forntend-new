import { SuperAdminAppSidebar } from "@/components/app-sidebar-super-admin"
import { SignupFormAdmin } from "@/components/signup-form-admin"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const CreateAdmin = () => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <SuperAdminAppSidebar variant="inset" />
      <SidebarInset>
        
        {/* <SiteHeader /> */}
       <div className="flex items-center justify-center min-h-[calc(100vh-4.5rem)]">
            <SignupFormAdmin />
            </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default CreateAdmin
