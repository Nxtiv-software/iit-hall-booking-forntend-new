import { SuperAdminAppSidebar } from "@/components/app-sidebar-super-admin"
import { SignupFormStudent } from "@/components/signup-form-student"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const CreateStudent = () => {
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
            <SignupFormStudent />
            </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default CreateStudent
