import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Adduser from './componets/adduser/Adduser';
import GetUser from './componets/getuser/GetUser';
import Update from './componets/updatedata/Update'
const App = () => {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <GetUser />
    },
    {
      path: '/add',
      element: <Adduser />
    },
    {
      path: '/edit/:id',
      element: <Update/>
    },
    {
      path: '/delete',
      element: 'home'
    }
  ])
  return (
    <div>
      <RouterProvider router={route}>

      </RouterProvider>
    </div>
  )
}

export default App