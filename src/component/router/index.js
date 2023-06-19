import SearchPhotos from "../searchs"
import DetailPhoto from "../detailPhoto"


const RouterPage = [

    {
        path: "/",
        component: SearchPhotos,
        layout: null
    },
    {
        path: "/photos/:id",
        component: DetailPhoto,
        layout: null,

    },

]

export default RouterPage