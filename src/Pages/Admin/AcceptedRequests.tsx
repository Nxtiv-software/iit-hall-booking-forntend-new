// import { AppSidebar } from "@/components/app-sidebar-admin"
// import Theme from "@/components/Theme"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Separator } from "@/components/ui/separator"
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { useQuery } from "@tanstack/react-query"

// const AcceptedRequests = () => {
//   return (
//     <div>
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//           <SidebarTrigger className="-ml-1" />
//           <Separator
//             orientation="vertical"
//             className="mr-2 data-[orientation=vertical]:h-4"
//           />
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem className="hidden md:block">
//                 <BreadcrumbLink href="#">
//                   Menu
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator className="hidden md:block" />
//               <BreadcrumbItem>
//                 <BreadcrumbPage>Accepted Requests</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//           <div className="ml-auto">
//             <Theme/>
//           </div>
//         </header>
//         <div className="flex flex-1 flex-col gap-4 p-4">
//           <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-4">
//               <h2 className="text-lg font-semibold mb-4">Accepted Requests</h2>
//               <Table>
//                   <TableCaption>List of Accepted Requests</TableCaption>
//                   <TableHeader>
//                   <TableRow>
//                     <TableHead>Student</TableHead>
//                     <TableHead>Venue</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Requested Date</TableHead>
//                     <TableHead>Admin</TableHead>
//                   </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                   {acceptedRequestsData.map((acceptedRequests) => (
//                       <TableRow key={acceptedRequests.id}>
//                       <TableCell>{acceptedRequests.request.student.user.username}</TableCell>
//                       <TableCell>{acceptedRequests.request.venue.name}</TableCell>
//                       <TableCell>{acceptedRequests.request.status.name}</TableCell>
//                       <TableCell>{acceptedRequests.admin.user.username}</TableCell>
//                       <TableCell>{new Date(acceptedRequests.request.requiredDate).toLocaleString()}</TableCell>
//                       </TableRow>
//                   ))}
//                   </TableBody>
//               </Table>
//           </div>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
// </div>
//   )
// }

// export default AcceptedRequests